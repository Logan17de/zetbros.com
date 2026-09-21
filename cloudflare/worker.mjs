const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers } });

async function readBoundedJson(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_body");
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 32768) { await reader.cancel(); throw new Error("body_too_large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.zetbros.com") {
      url.hostname = "zetbros.com";
      return Response.redirect(url.toString(), 308);
    }
    if (url.pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
    if (request.headers.get("Origin") !== url.origin) return json({ error: "Invalid origin" }, 403);
    if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) return json({ error: "Expected JSON" }, 415);
    let data;
    try { data = await readBoundedJson(request); }
    catch (error) { return json({ error: "Invalid request body" }, error.message === "body_too_large" ? 413 : 400); }
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "Invalid message" }, 400);
    if (typeof data.website === "string" && data.website.trim()) return json({ ok: true });
    const text = (key) => typeof data[key] === "string" ? data[key].trim() : "";
    const name = text("name"), email = text("email"), message = text("message"), company = text("company"), service = text("service");
    if (!name || name.length > 120 || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 5000 || company.length > 160 || service.length > 240) return json({ error: "Please check your name, email and message" }, 400);
    try {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
      if (!success) return json({ error: "Please wait before sending another message" }, 429, { "Retry-After": "60" });
      await env.DB.prepare("INSERT INTO zetbros_contact_messages (id,name,email,company,service,message,source,status,created_at) VALUES (?,?,?,?,?,?,?,'new',?)")
        .bind(crypto.randomUUID(), name, email, company || null, service || null, message, "zetbros.com", new Date().toISOString()).run();
      return json({ ok: true }, 201);
    } catch {
      console.error(JSON.stringify({ event: "contact_submission_failed" }));
      return json({ error: "Message could not be saved. Please try again." }, 503);
    }
  }
};
