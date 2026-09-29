# Frontend verification — 2026-09-29

## Result and scope

Implemented the open editorial studio direction across all eight public routes. Shared white surfaces, graphite typography, teal actions, fine rules, modest control radii, and restrained motion replace the previous stacked panel treatments. The original logo, page content, routes, metadata, contact request payload, and Worker configuration remain intact. No dependencies were added. No authentication exists on this public site.

The contact popup preserves its native dialog behavior and blurred backdrop. Error/success feedback now scrolls into view on small screens, errors have an alert role, and the form exposes its busy state. Logo dimensions reserve its original 3:1 aspect ratio. Headings remain readable before JavaScript and with reduced motion.

## Executed checks

| Command | Result |
| --- | --- |
| `python C:/Users/Logan\ De/.agents/skills/frontend-studio/scripts/preflight.py --root .` (PowerShell path quoted) | Repository inventory passed; no Tailwind/shadcn installed |
| `npm run lint` | TypeScript passed |
| `npm test` | 6 Worker tests passed; expected simulated failure logs occurred |
| `npm run build` | Production static export passed; all eight public routes generated |
| `node --test tests/site.test.mjs` | 15 acceptance checks passed |
| `npx wrangler dev --local --port 8787` | Production export served by local Worker; only local bindings |
| `node .frontend-qa/baseline.mjs` | Live baseline desktop/mobile screenshots |
| `node .frontend-qa/slice.mjs` | Representative homepage/contact review; local simulated error |
| `node .frontend-qa/final.mjs` | 36 viewport/route diagnostics and screenshots; no overflow, broken images, duplicate IDs, unnamed-control candidates, runtime exceptions, failed requests, or HTTP errors |
| `node .frontend-qa/interactions.mjs` | All checks below passed using real Chrome input and intercepted local form responses |
| `node .frontend-qa/review.mjs` | Additional readable desktop/mobile screenshots and lower-page sections |
| `npx wrangler deploy --dry-run --keep-vars` | Packaging passed; existing zetbros, DB, rate-limit and asset bindings |
| `git diff --check` | Passed; informational Windows line-ending notices only |

The logo acceptance check now hashes the original PNG asset itself rather than freezing the wrapper component; the PNG, icon, and apple icon hashes are unchanged.

## Browser coverage and visual inspection

Real installed Chrome, controlled through its DevTools protocol. Production build at http://127.0.0.1:8787. All of `/`, `/harness`, `/ai-in-practice`, `/automation-in-practice`, `/infrastructure-in-practice`, `/equipment-warranty-research`, `/privacy`, and `/terms` checked at 320, 390, 768, and 1440 CSS pixels. Homepage boundaries also checked at 759, 761, 999, and 1001 pixels. Zero document horizontal overflow in all 36 cases.

Inspected actual desktop/mobile screenshots for the homepage, Harness, research, AI examples, automation, infrastructure, privacy, and terms; also lower homepage product rows, a complete project section, the Harness plugin list, expanded disclosure, mobile error/success, desktop popup/focus, and 200% text resizing. The desktop/mobile reflow, hierarchy, wrapping, white surfaces, and unboxed headings are coherent. Original text-heavy project pages remain long by design.

During the representative review, removed inherited empty grid rows under the product pathway and made mobile form feedback visible. Consolidated the global cascade so obsolete visual overrides no longer load. No unresolved in-scope visual blocker was found in the inspected views.

## Interactions and states

- Homepage Products, Business, Research, and About anchors; research page navigation; Harness return to products; privacy/terms footer navigation.
- Contact opening and initial email focus; forward/reverse Tab exclude background controls. Native browser chrome can remain reachable, as expected for the platform dialog. Escape restores focus to the trigger; close button and outside-backdrop click close it.
- Empty required fields and malformed email block submission.
- Sending state disables the submit button and sets aria-busy. Request remains POST /api/contact with the original fields.
- Browser-intercepted 500 response preserves entered fields for retry; 429 shows the rate-limit message; intercepted 200 resets fields and announces success. These are simulated frontend responses, not claims of delivered mail.
- Research contact prepopulates the equipment-warranty subject; project contact prepopulates its project-specific subject.
- Harness details opens by click and closes with Enter; product availability remains honestly marked in progress.
- Reduced motion disables heading animations. JavaScript-disabled homepage headings stay visible. Root font size 200% at 390px reflows without document overflow; this is a text-resizing diagnostic, not a native-browser zoom certification.
- Captured browser accessibility trees for the page and dialog, plus real CDP runtime/network logs. No formal screen-reader conformance claim.

## Typography and contrast

CDP reports actual rendered Segoe UI Variable Display for the heading and Segoe UI Variable Text for reading text, both local system fonts. No font download was added.

Opaque sRGB checks using the skill contrast helper: graphite/white 14.069:1; muted/white 6.140:1; white/teal 6.487:1; white/hover 9.549:1; success/white 6.696:1; error/white 6.863:1; caution/white 6.405:1; input boundary/white 3.104:1. Text exceeds 4.5:1 and input boundary exceeds 3:1. Decorative rules are not control boundaries. Breadcrumb inline links appear as 23px-high diagnostic candidates; they have surrounding spacing and are not adjacent crowded controls.

## Evidence

Local, ignored evidence is in `.frontend-qa/`: `baseline/` before, `slice/` representative iteration, `final/` full route matrix plus audit/fonts/accessibility/log JSON, `review/` readable viewport and section screenshots, and `states/` contact/keyboard/disclosure/reduced-motion/text-size evidence and interaction results. These files are deliberately not published with the website. Browser automation initially needed fixes for native browser-chrome focus and waiting for stable navigation targets; the final complete interaction run passed.

## Limits and protected services

No tooling blocker remains for the Chrome checks. Physical iOS/Android devices, Safari/Firefox, screen-reader testing, native browser zoom, and Lighthouse/field performance measurement were NOT RUN. No Figma was supplied. No claim of cross-browser certification or measured Core Web Vitals is made.

No production form submission or inbox-delivery test was made during the redesign. Existing SpaceMail sending and D1 archival are unchanged; their unit tests passed. No email, DNS, D1 schema/data, Worker bindings, Cloudflare account settings, AIKO, Supabase, or Vercel configuration was changed. Production publication and live checks are reported separately after deployment.
