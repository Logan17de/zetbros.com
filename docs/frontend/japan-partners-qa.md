# Japan partners and company registration — 2026-10-05

## Scope

The homepage now lists Wintech Solutions as a partner in Japan and provides a second column for companies to register their services and coverage. The registration action opens the existing blurred-background dialog. Registrations go through the existing `/api/contact` service to `support@zetbros.com` for manual review; they do not automatically publish a company, approve it, match it to clients, or guarantee projects. The privacy page describes the additional registration fields and review purpose.

Wintech's location and service description were checked against its [official website](https://wintechsolutions.info/). Its services are described without importing customer logos, statistics, or new app icons.

The existing Inter typography, mineral/teal canvas, glass panels and controls, unboxed headings, original Zetbros logo, and theme are preserved. The new section uses the existing reveal and glass components and stacks its two columns below 900px. No framework, runtime, or dependency was added.

AIKO and Wintech use `app/external-link.tsx`, which always sets `target="_blank"` and `rel="noopener noreferrer"`. Use this component for future external website links. Static acceptance checks inspect links across all eight public routes and reject external links that omit these attributes.

## Executed checks

- `npm run build`: passed; all eight public routes exported by Next.js 15.5.24.
- `npm run lint`: TypeScript passed.
- `npm test`: 7/7 Worker tests passed. The registration contract test uses a mocked sender and database and verifies the support recipient, company details, and preserved website information. Simulated delivery/archive errors are expected test fixtures.
- `node --test tests/site.test.mjs`: 17/17 checks passed, including partner content, internal destinations, external new-tab links, metadata, and unchanged brand assets.
- `npx wrangler deploy --dry-run --keep-vars`: passed; existing ASSETS, DB and rate-limit bindings and 82 exported assets recognized.
- `git diff --check`: passed.

## Browser evidence

The real static Worker preview was checked in Edge at `http://127.0.0.1:8787`, using local bindings. Measured CSS widths were 320, 390, 768, 899, 900 and 1440px. The homepage had no horizontal document overflow, broken images or clipped partner controls. The company dialog had no horizontal overflow, focused the company field, and retained the existing 8px backdrop blur at every width. The two partner columns correctly switch between 899 and 900px.

Actual desktop/mobile screenshots of the partner section, registration form, error/success feedback, and privacy page were captured and inspected. The form was also checked at 320×480. At 200% root text size and widths 390, 768 and 1440, neither the homepage nor the open company dialog had horizontal overflow.

Native validation blocked an empty form, an invalid email, a non-HTTP(S) company website and unchecked contact permission. A blank optional company website was accepted. Intercepted local requests confirmed that the real company website is included in the message while the API's existing `website` honeypot remains empty. The sending state disables submission and exposes `aria-busy`. Simulated network, 500 and 429 failures retained entered details and restored the submit action; a simulated 201 response replaced the form with review-first success feedback and focused that status message. The initial raw connection-error text was corrected and these states were rechecked after the final build.

Close and Escape dismissed the dialog and restored focus to its trigger; reopening reset the form. Native keyboard navigation was exercised. Existing general and research contact dialogs still focus the email field, expose email/subject/message, and preserve the research subject prefill.

Keyboard activation of both external links produced browser `Page.windowOpen` events with `_blank`, `noopener`, and a user gesture. Separate destination tabs appeared, and the original Zetbros tab kept its URL. Only the test-created destination tabs were closed. All public external anchors also passed the static attribute checks.

Evidence is in the ignored `.frontend-qa/japan-partners/` directory: `responsive-matrix.json`, `text-reflow.json`, `registration-payload.json`, `registration-states.json`, `external-links.json`, `local-browser-logs.json`, and `local-*.jpg`. Captured local developer warning/error logs were empty. An initial browser fallback request for the unreferenced `/favicon.ico` returned 404 in the preview; the site's declared PNG icons loaded. The existing icon assets are unchanged.

## Limits and deployment boundary

Mail delivery, a real production form submission, physical mobile devices, Safari/Firefox, formal screen-reader testing and performance measurements were not run. Browser submission responses were fixtures; no test messages reached the inbox and no production database rows were written. No D1 schema migration, email/SpaceMail configuration, DNS record change, AIKO app change, other Worker change, Supabase change, Vercel configuration change, or account-wide setting change is part of this implementation.

Wrangler was already authenticated; no Cloudflare MCP login or new authorization flow was used. Its available-update notice is informational and the pinned CLI was retained. Production deployment IDs, timestamp, binding/domain verification, HTTP results and live screenshots are recorded separately in `.frontend-qa/japan-partners/` after publishing to the existing `zetbros` Worker.
