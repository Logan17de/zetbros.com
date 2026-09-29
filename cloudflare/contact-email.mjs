const encoder = new TextEncoder();

function base64(bytes) {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(binary);
}

function encodedSubject(subject) {
  const words = [];
  let part = "";
  for (const character of subject) {
    if (encoder.encode(part + character).length > 42) {
      words.push(`=?UTF-8?B?${base64(encoder.encode(part))}?=`);
      part = "";
    }
    part += character;
  }
  if (part) words.push(`=?UTF-8?B?${base64(encoder.encode(part))}?=`);
  return words.join("\r\n ");
}

export function contactMessage({ email, subject, message, name, company }) {
  const body = [
    "A message was sent through zetbros.com.",
    "",
    `Visitor email: ${email}`,
    ...(name ? [`Name: ${name}`] : []),
    ...(company ? [`Company: ${company}`] : []),
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\r\n");
  const encodedBody = base64(encoder.encode(body)).match(/.{1,76}/g)?.join("\r\n") || "";
  return [
    "From: Zetbros Website <support@zetbros.com>",
    "To: support@zetbros.com",
    `Reply-To: ${email}`,
    `Subject: ${encodedSubject(`[Zetbros contact] ${subject}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@zetbros.com>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    encodedBody,
    "",
  ].join("\r\n");
}

async function timed(promise, stage) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`SMTP timeout at ${stage}`)), 10000); }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export async function sendContactEmail(data, env) {
  if (!env.SMTP_USERNAME || !env.SMTP_PASSWORD) throw new Error("SMTP credentials are unavailable");
  const { connect } = await import("cloudflare:sockets");
  const socket = connect({ hostname: "mail.spacemail.com", port: 465 }, { secureTransport: "on" });
  let reader;
  let writer;
  try {
    await timed(socket.opened, "connect");
    reader = socket.readable.getReader();
    writer = socket.writable.getWriter();
    const decoder = new TextDecoder();
    let buffered = "";
    async function reply(stage, accepted) {
      for (;;) {
        const newline = buffered.indexOf("\n");
        if (newline === -1) {
          const chunk = await timed(reader.read(), stage);
          if (chunk.done) throw new Error(`SMTP closed at ${stage}`);
          buffered += decoder.decode(chunk.value, { stream: true });
          if (buffered.length > 16384) throw new Error(`SMTP response too large at ${stage}`);
          continue;
        }
        const line = buffered.slice(0, newline).replace(/\r$/, "");
        buffered = buffered.slice(newline + 1);
        const match = /^(\d{3})([ -])/.exec(line);
        if (!match || match[2] === "-") continue;
        const code = Number(match[1]);
        if (!accepted.includes(code)) throw new Error(`SMTP rejected ${stage} (${code})`);
        return;
      }
    }
    async function command(value, stage, accepted) {
      await timed(writer.write(encoder.encode(`${value}\r\n`)), stage);
      await reply(stage, accepted);
    }
    await reply("greeting", [220]);
    await command("EHLO zetbros.com", "EHLO", [250]);
    await command(`AUTH PLAIN ${base64(encoder.encode(`\0${env.SMTP_USERNAME}\0${env.SMTP_PASSWORD}`))}`, "authentication", [235]);
    await command("MAIL FROM:<support@zetbros.com>", "sender", [250]);
    await command("RCPT TO:<support@zetbros.com>", "recipient", [250, 251]);
    await command("DATA", "DATA", [354]);
    await command(`${contactMessage(data)}\r\n.`, "delivery", [250]);
    // A 250 response to DATA means delivery was accepted. A failed QUIT must not
    // tell the visitor to retry and send the same message twice.
    try { await command("QUIT", "QUIT", [221]); } catch { /* Delivery already accepted. */ }
  } finally {
    reader?.releaseLock();
    writer?.releaseLock();
    await socket.close().catch(() => {});
  }
}
