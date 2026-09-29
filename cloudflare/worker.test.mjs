import test from "node:test";
import assert from "node:assert/strict";
import { createWorker } from "./worker.mjs";
import { contactMessage } from "./contact-email.mjs";

const payload = { email: "visitor@example.invalid", subject: "Business enquiry", message: "I would like to discuss a practical project." };

function request(data = payload, origin = "https://zetbros.com") {
  return new Request("https://zetbros.com/api/contact", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

function environment({ allowed = true, archiveFails = false, mailFails = false } = {}) {
  const state = { writes: [], emails: [] };
  const worker = createWorker(async message => {
    state.emails.push(message);
    if (mailFails) throw new Error("SMTP unavailable");
  });
  const env = {
    CONTACT_RATE_LIMIT: { limit: async () => ({ success: allowed }) },
    DB: { prepare(sql) {
      assert.match(sql, /INSERT INTO zetbros_contact_messages/);
      return { bind(...values) { return { async run() {
        if (archiveFails) throw new Error("D1 unavailable");
        state.writes.push(values);
      } }; } };
    } },
    ASSETS: { fetch: async () => new Response("asset") },
  };
  return { state, worker, env };
}

test("contact message sends to support and archives without trusting visitor status or source", async () => {
  const { state, worker, env } = environment();
  const response = await worker.fetch(request({ ...payload, status: "admin", source: "evil" }), env);
  assert.equal(response.status, 201);
  assert.deepEqual(state.emails, [{ ...payload, name: "", company: "" }]);
  assert.equal(state.writes.length, 1);
  assert.equal(state.writes[0][1], "Website visitor");
  assert.equal(state.writes[0][4], payload.subject);
  assert.equal(state.writes[0][6], "zetbros.com");
  const wire = contactMessage(state.emails[0]);
  assert.match(wire, /To: support@zetbros\.com/);
  assert.match(wire, /Reply-To: visitor@example\.invalid/);
});

test("legacy project enquiries keep their name and topic", async () => {
  const { state, worker, env } = environment();
  const response = await worker.fetch(request({ name: "Visitor", email: payload.email, service: "AI project", company: "Example", message: payload.message }), env);
  assert.equal(response.status, 201);
  assert.equal(state.emails[0].subject, "AI project");
  assert.equal(state.writes[0][1], "Visitor");
});

test("invalid and cross-origin requests never send or archive", async () => {
  for (const input of [
    request(payload, "https://other.example"),
    request({ ...payload, email: "invalid" }),
    request({ ...payload, subject: "" }),
    request({ ...payload, subject: "hello\r\nBcc: wrong@example.com" }),
    request({ ...payload, message: "short" }),
  ]) {
    const { state, worker, env } = environment();
    assert.ok((await worker.fetch(input, env)).status >= 400);
    assert.equal(state.emails.length, 0);
    assert.equal(state.writes.length, 0);
  }
});

test("mail failure is not reported as success; archive failure does not resend accepted mail", async () => {
  const failed = environment({ mailFails: true });
  assert.equal((await failed.worker.fetch(request(), failed.env)).status, 503);
  assert.equal(failed.state.writes.length, 0);
  const archived = environment({ archiveFails: true });
  assert.equal((await archived.worker.fetch(request(), archived.env)).status, 201);
  assert.equal(archived.state.emails.length, 1);
});

test("rate limit, oversize body, and honeypot do not send mail", async () => {
  const blocked = environment({ allowed: false });
  assert.equal((await blocked.worker.fetch(request(), blocked.env)).status, 429);
  assert.equal(blocked.state.emails.length, 0);
  const oversize = environment();
  assert.equal((await oversize.worker.fetch(request({ ...payload, message: "a".repeat(33000) }), oversize.env)).status, 413);
  assert.equal(oversize.state.emails.length, 0);
  const bot = environment();
  assert.equal((await bot.worker.fetch(request({ ...payload, website: "bot" }), bot.env)).status, 200);
  assert.equal(bot.state.emails.length, 0);
});

test("API is write-only and website pages use assets", async () => {
  const { worker, env } = environment();
  assert.equal((await worker.fetch(new Request("https://zetbros.com/api/contact"), env)).status, 405);
  assert.equal(await (await worker.fetch(new Request("https://zetbros.com/harness"), env)).text(), "asset");
});
