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
  const original = readFileSync(path);
  const bytes = path.endsWith(".png") ? original : Buffer.from(original.toString("utf8").replace(/\r\n/g, "\n"));
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

for (const route of routes) {
  test(`${route}: one canonical and matching share URL`, () => {
    const html = visibleHtml(page(route));
    const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
    assert.equal(canonical.length, 1);
    // Parse URLs to normalize only the origin's optional final slash.
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
  for (const id of ["business", "research", "about", "software", "how-we-build"]) assert.equal([...html.matchAll(new RegExp(`id="${id}"`, "g"))].length, 1, id);
  for (const route of ["/ai-in-practice", "/automation-in-practice", "/infrastructure-in-practice", "/equipment-warranty-research", "/harness"]) assert.ok(html.includes(`href="${route}"`));
  assert.ok(html.includes('href="https://aiko.zetbros.com"'));
  assert.ok(html.includes('aria-haspopup="dialog"'));
  assert.doesNotMatch(html, /id="contact"/);
  assert.ok(html.includes("For people, society and business."));
  assert.ok(html.includes("We build from 0."));
  assert.ok(html.includes("Founder"));
  assert.ok(html.includes("Production in progress"));
});

test("research is an enquiry, not a live claim portal", () => {
  const html = visibleHtml(page("/equipment-warranty-research"));
  assert.ok(html.includes("Research validation"));
  assert.ok(html.includes("not a released product"));
  assert.ok(html.includes("No OEM portal passwords"));
  assert.ok(html.includes("No autonomous claim submission"));
  assert.ok(html.includes("No recovery guarantee"));
  assert.doesNotMatch(html, /id="data-handling"/);
  assert.doesNotMatch(html, /id="conversation"/);
  assert.ok(html.includes('aria-haspopup="dialog"'));
  assert.doesNotMatch(html, /<form\b/i);
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
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).href).sort();
  assert.deepEqual(urls, routes.map(route => new URL(route, origin).href).sort());
  const robots = readFileSync("out/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(robots.includes("Disallow: /api/"));
  assert.ok(existsSync("out/icon-512.png"));
  assert.equal(existsSync("public/robots.txt"), false, "Do not duplicate the App Router metadata route");
  assert.equal(existsSync("public/sitemap.xml"), false, "Do not duplicate the App Router metadata route");
});

test("original logo and icons remain unchanged", () => {
  const original = {
    "app/logo.tsx": "511f9e4e7bf10c51a10b2c23606d04dbe8723af5",
    "app/icon.png": "027d0a573d46587cd09f58c150b9a680d9db50e5",
    "app/apple-icon.png": "54223c22717050db6b2a369810e956fea31dc7dc",
  };
  for (const [path, sha] of Object.entries(original)) assert.equal(blobSha(path), sha, path);
});
