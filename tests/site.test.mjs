import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const origin = "https://zetbros.com";
const routes = ["/", "/harness", "/ai-in-practice", "/automation-in-practice", "/infrastructure-in-practice", "/equipment-warranty-research", "/privacy", "/terms"];
function page(path) {
  const stem = path === "/" ? "out/index" : `out${path}`;
  const file = [`${stem}.html`, `${stem}/index.html`].find(existsSync);
  assert.ok(file, `Missing exported page: ${path}. Run npm run build first.`);
  return readFileSync(file, "utf8");
}
function visibleHtml(html) { return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""); }
function attribute(tag, name) {
  const value = tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  assert.ok(value, `Missing ${name} attribute in ${tag}`);
  return value;
}
function blobSha(path) {
  const bytes = readFileSync(path);
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

for (const route of routes) {
  test(`${route}: one canonical and matching share URL`, () => {
    const html = visibleHtml(page(route));
    const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
    assert.equal(canonical.length, 1);
    // URL parsing treats the origin with/without its final slash equivalently,
    // while still checking the exact page, protocol, host, query and fragment.
    const expected = new URL(route, origin).href;
    assert.equal(new URL(attribute(canonical[0][0], "href")).href, expected);
    const og = html.match(/<meta\b[^>]*property="og:url"[^>]*>/)?.[0];
    assert.equal(new URL(attribute(og, "content")).href, expected);
    assert.ok(html.includes('name="twitter:card" content="summary"'));
    assert.ok(html.includes(`${origin}/icon-512.png`));
    assert.doesNotMatch(html, /<a\b[^>]*>\s*<a\b/i, "Logo must not be wrapped in another link");
  });
}

test("all internal page links and fragments resolve in exported HTML", () => {
  for (const route of routes) {
    for (const match of visibleHtml(page(route)).matchAll(/<a\b[^>]*href="([^\"]*)"/g)) {
      const href = match[1];
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const target = new URL(href, `${origin}${route}`);
      assert.equal(target.origin, origin);
      assert.ok(routes.includes(target.pathname), `${route}: unlisted internal route ${href}`);
      const html = visibleHtml(page(target.pathname));
      if (target.hash) assert.ok(html.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${route}: missing fragment ${href}`);
    }
  }
});

test("homepage exposes business, research and founder identity without dropping products", () => {
  const html = visibleHtml(page("/"));
  for (const id of ["business", "research", "about", "software", "contact", "how-we-build"]) assert.equal([...html.matchAll(new RegExp(`id="${id}"`, "g"))].length, 1, id);
  for (const route of ["/ai-in-practice", "/automation-in-practice", "/infrastructure-in-practice", "/equipment-warranty-research", "/harness"]) assert.ok(html.includes(`href="${route}"`));
  assert.ok(html.includes('href="https://aiko.zetbros.com"'));
  assert.ok(html.includes('href="mailto:logan@zetbros.com"'));
  assert.ok(html.includes("Founder"));
  assert.ok(html.includes("Production in progress"));
});

test("research is an enquiry, not a live claim portal", () => {
  const html = visibleHtml(page("/equipment-warranty-research"));
  assert.ok(html.includes("Research / validation"));
  assert.ok(html.includes("does not accept claim uploads"));
  assert.ok(html.includes("No OEM portal passwords or credentials"));
  assert.ok(html.includes("No automatic submissions"));
  assert.ok(html.includes("No guarantee of eligibility"));
  assert.ok(html.includes('id="data-handling"'));
  assert.ok(html.includes('name="company"'));
  assert.match(html, /<option[^>]*selected[^>]*>Equipment warranty research<\/option>/);
  assert.doesNotMatch(html, /<input\b[^>]*type="file"/i);
});

test("project patterns are not presented as customer case studies", () => {
  for (const route of ["/ai-in-practice", "/automation-in-practice", "/infrastructure-in-practice"]) {
    const html = visibleHtml(page(route));
    assert.ok(html.includes("not customer case studies"));
    assert.ok(html.includes("Intended outcome"));
    assert.ok(html.includes('href="/#business"'));
  }
});

test("robots and sitemap cover exactly the public routes", () => {
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort();
  assert.deepEqual(urls, routes.map(route => `${origin}${route}`).sort());
  const robots = readFileSync("out/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(robots.includes("Disallow: /api/"));
  assert.ok(existsSync("out/icon-512.png"));
});

test("original logo, icons and email-independent infrastructure remain unchanged", () => {
  const original = {
    "app/logo.tsx": "511f9e4e7bf10c51a10b2c23606d04dbe8723af5",
    "app/icon.png": "027d0a573d46587cd09f58c150b9a680d9db50e5",
    "app/apple-icon.png": "54223c22717050db6b2a369810e956fea31dc7dc",
    "cloudflare/worker.mjs": "649f0e24c502f59b1bb155005e35b1d7560a5a74",
    "wrangler.jsonc": "12097fd6734f44f7c93b5498d96eac4205c7abaa",
  };
  for (const [path, sha] of Object.entries(original)) assert.equal(blobSha(path), sha, path);
});
