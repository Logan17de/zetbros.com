# Implementation handoff — GPT-6 Sol / Extra High

2026-09-29; updated 2026-10-01 for the user's glass/sheen/shatter request. The user requested research/docs first, then creation by this model/reasoning level. These documents are a specification, not proof of implementation or verification.

## Read first

`DESIGN.md`, `docs/frontend/design-brief.md`, `reference-study.md`, `theme-packet.md`, and the `frontend-studio` skill from the local skill catalog plus its implementation/QA references and negative prompt. User now allows backgrounds and heading treatment changes, superseding white-only/unboxed rules. Preserve logo and the tagline beneath it without punctuation.

## Starting state

- Workspace: the existing Zetbros repository checkout in the environment context; repository `Logan17de/zetbros.com`. File paths in this document are relative to that checkout.
- `main` baseline `547ac5a2dbfdc3ad1e68ff756d7d072257055e8f`. Research changed docs only. Inspect status and preserve those changes. Create a `codex/` implementation branch.
- Next 15.5.24, React19.1, npm, global CSS + CSS Modules, static `/out`. No Tailwind/shadcn/Radix installed. Keep native dialog and existing architecture. No Figma/auth flow.
- Existing Worker `zetbros`; last recorded version `7353946b-55a4-4bf9-9041-5043de9e7028`, deployment `2026-09-29T08:28:24.992Z`. Re-inspect before deployment.

## Sequence

1. Inspect source and reference captures. Implement homepage opening/product grouping plus contact dialog as the representative slice. View desktop/mobile before extending. Root agent can review the slice; no need to ask user to restate preferences.
2. Carry shared type, palette, surfaces and layout to all eight routes. Preserve meaningful text, IDs, honest research/status qualifications. Reordering complete groups is allowed.
3. Replace competing motion ownership with the Theme Packet's coordinated blur-and-fade. No standalone blur patch before the redesigned structure.
   Apply the Oct 1 glass revision to relevant existing surfaces using one reusable treatment/controller. Review a desktop/mobile sample and actual effect frames before scaling. Preserve clear content/actions and add pause/reduced-motion handling.
   The subsequent realism request calls for clearer glass, visible background continuity, fine beveled edges and controlled reflections. Treat the earlier frosted-pane screenshots as baseline evidence, and inspect the revised material before publication.
4. Verify responsive, keyboard, state and motion behavior in a real browser; fix concrete in-scope defects; run existing checks.
5. Create reviewable commit/PR, CI, merge/deploy using the already authorized existing Worker workflow when gates pass. Preserve configuration and use `--keep-vars`. Attach any created PR with the Codex app artifact tool. Do not trigger repeated OAuth or unnecessary confirmation.
6. Update `docs/frontend/qa-report.md` with new evidence and limitations. Historical results are not new passes. Record final SHA, Cloudflare version/deployment/timestamp and live URL results.

## Files/routes

| Area | Source |
|---|---|
| Foundation | `app/globals.css`, `app/studio.css`, `app/layout.tsx`; layout imports globals + studio only |
| Homepage `/` | `app/page.tsx`; preserve nav and IDs software/business/research/about/services/ai/infrastructure/automation/support/how-we-build |
| Motion | `app/reveal-box-text.tsx`, `app/scroll-reveal-motion.tsx`, active studio rules; do not reimport old unused effect CSS |
| `/harness` | `app/harness/page.tsx`, `harness.module.css`; diagram, examples, status, native details |
| Three practice routes | `app/practice-page.tsx`, `practice-page.module.css`; `/ai-in-practice`, `/automation-in-practice`, `/infrastructure-in-practice` |
| Research | `app/equipment-warranty-research/page.tsx`, `research.module.css` |
| Legal | `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/legal.module.css` |
| Contact | `app/contact-dialog.tsx`, `contact-form.tsx` and corresponding modules; styling/state polish, preserve behavior |
| Brand | `app/logo.tsx`, `public/zetbros-logo.png`, icon/favicon files; unchanged original artwork |
| Delivery | `wrangler.jsonc`, `cloudflare/worker.mjs`; inspect/preserve, no rewrite for styling |

Keep the original SVG line style for generic process diagrams, business examples as examples, Harness “Production in progress,” real plugin trust qualifications, and research as an enquiry rather than a claim portal. The user's latest steering places AIKO and Harness under **Our products** and removes their duplicate opening-flow listing. Remove app icons and A/H letter badges, including a generic window glyph used as a Harness badge beside its name. Keep a balanced full-width opening flow after removing the app list, and repeat affected homepage/Harness layout and navigation checks.

## Protected behavior/services

- Contact stays the existing popup with blurred backdrop, labeled email/subject/message, `/api/contact`, same payload/validation, submitting/error/rate-limit/success, subject prefills and support@zetbros.com delivery plus D1 archive. No inline form or mailto-Logan CTA; do not restore removed data-handling/contact sections.
- Footer: Zetbros, Privacy, Terms only. Nav: Products / Business / Research / About / Contact; no duplicate top Talk to us. No owner name or public GitHub.
- No SpaceMail/email aliases/SMTP/IMAP/MX/SPF/DKIM/DMARC or other email/DNS setting changes. Existing sending alone was authorized and is already implemented.
- No production D1 schema/data/test submissions. No AIKO app, other Worker/project, Supabase, Vercel settings, unrelated DNS or account-wide configuration changes.
- Update existing `zetbros` Worker only. Preserve custom domains, www redirect, ASSETS/DB/rate-limit bindings, variables/secrets/routes. Local Wrangler is already authenticated. Avoid Cloudflare MCP OAuth.

## Verification

Run `npm run lint` (TypeScript), `npm test` (Worker), `npm run build` (static export), `node --test tests/site.test.mjs` (export/metadata/content/assets). Do not weaken behavior or original-asset checks. Avoid tests that merely restate CSS. A useful motion invariant is no nested targets/no content stranded hidden, backed by actual browser inspection.

Use **supported mcp__cua_repl browser controls**. Shell Chrome/CDP launching was blocked; the in-app browser works. Do not work around that block with another shell automation method. Read browser and local-web-development/CDP capability docs when needed. Leave the user's original live tab untouched; create a test tab. Research tab was closed and viewport reset. Root transfers browser ownership to Sol during implementation to avoid concurrent control.

Save/inspect evidence under `.frontend-qa/`. Use local preview without production bindings. Simulate contact responses with supported local browser interception/mock, never test-submit production or write D1.

| Gate | Required evidence |
|---|---|
| Responsive | Home, Harness, representative practice, research, legal and popup at 320/390/768/1440, plus actual breakpoint boundaries; remaining routes desktop/mobile |
| Navigation | Primary links, routes, anchors/index, product/related links; AIKO destination read only |
| Contact | General/research/project triggers, correct subject; initial email focus, Tab/Shift+Tab trap, Escape, close/backdrop/return focus; empty/required/email validation, focus, loading/disabled, error/retry, rate-limit, success |
| Harness | Disclosure open/close, anchors/status/no fake download, readable diagrams without page overflow |
| Motion | Non-nested owners, coordinated trigger and sampled duration, crisp final state, no first-screen reblur/replay, fast scrolling/anchors, reduced motion + live preference change, keyboard interruption |
| Glass | Background visible through panels, readable composited contrast/fallback, bottom-left to top-right sheen every 10 seconds, sampled 2D shatter/restoration, pause/resume, reduced motion/live change, keyboard and immediate descendant actions; no nested filters or page overflow |
| Robustness | No-JS/delayed-JS visible content; 200% text/zoom, long input, loaded font/fallback, no failed local assets; actual console/runtime logs |
| Accessibility | Semantic headings, labels, visible focus, target sizes, final contrast pairs; no claim of formal certification |

Physical phones, Safari, assistive-tech certification, field Core Web Vitals and real production email delivery are NOT VERIFIED unless actually exercised. Mocked success proves UI handling only.

## Deployment and live gates

Existing workflow is authorized: tested branch -> PR/CI -> merge -> tested final main -> `npx wrangler deploy --keep-vars --message '...SHA...'`. Recheck remote changes and tested tree. Do not deploy unrelated changes.

Verify `/`, `/equipment-warranty-research`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/harness`, `/terms` and all three practice pages. Research title remains “Equipment warranty recovery — research pilot.” Current zero-to-real/social/business identity supersedes the old homepage wording request. Verify no research 404, public robots/sitemap, www canonical redirect preserving path/query, live assets and representative HTML matching tested export. Confirm `/api/contact` wiring with read-only checks (GET remains method-rejected) and retained D1 binding without a production POST.

Report SHA, Worker/version/deployment ID if available, timestamp, every URL status, warnings/errors, and explicit confirmation email/DNS and D1 data/schema were unchanged. Include a screenshot of the implemented result.

## Research evidence

`.frontend-qa/references/` contains ten desktop PNGs: linear, stripe, vercel, apple, notion, figma, framer, webflow, pitch, wise; extra apple/stripe/linear-panels, apple/notion-mobile, zetbros-baseline-desktop/mobile. Some font metadata reads transiently returned a blank context while screenshots displayed the correct page. Only successful family reads are used; Webflow font stays unverified. This is a research-tool limitation, not a Zetbros error.
