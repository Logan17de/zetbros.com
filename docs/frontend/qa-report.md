# Frontend verification — 2026-10-01

## Scope and result

The eight public routes now use the calm product-studio design in the accompanying brief and theme packet: licensed, locally served Inter; warm neutral and pale-mint surfaces; the original transparent Zetbros logo with the quiet tagline directly below it; readable prose and restrained group entrance motion. Bounded content panels use a shared translucent glass treatment over a pale mineral-to-teal light field. A bright/dark bevel and narrow static reflection add depth while text stays sharp. A diagonal bottom-left-to-top-right sheen repeats on a 10-second CSS cycle while the panel is in view; a click creates a short decorative SVG fracture behind its content. The pause control stops the sheen and removes any active fracture. Reduced motion disables both effects.

AIKO and Harness appear as text-led cards under **Our products** only. Their duplicate hero list and app badges are removed, as are glyphs beside named Harness/DeepSeek entries in the Harness diagrams. Process, capability, and tool symbols remain. No new framework or Rive runtime was added. The existing contact dialog, request payload, Worker configuration, logo artwork, and product status qualifications were preserved.

## Executed source and build checks

| Check | Result |
| --- | --- |
| `npm run lint` | TypeScript passed |
| `npm test` | 6/6 Worker tests passed; expected simulated delivery/archive failure logs are test cases |
| `npm run build` | Next.js 15.5.24 static export passed; all eight public routes generated |
| `node --test tests/site.test.mjs` | 15/15 export and content checks passed |
| `npx wrangler deploy --dry-run --keep-vars` | Packaging passed; 80 static assets and the configured ASSETS, DB, and rate-limit bindings recognized; no deployment occurred |
| `git diff --check` | Passed; Git emitted informational Windows line-ending conversion notices |

The generated-only `.next/types/routes.d.ts` reference in `next-env.d.ts` was reverted after the build. The local static Worker preview runs at `http://127.0.0.1:8787` with local bindings only; it has not been deployed by this report.

## Browser checks completed before static-preview handoff

The current run used the installed Edge browser through Codex browser controls against the local Next.js development preview. Edge was at 80% browser zoom; explicit browser viewport overrides of 256×384, 312×675, 614×819, and 1152×800 physical pixels yielded measured CSS viewports of 320×480, 390×843, 767×1023, and 1440×1000 respectively. The 767px result is the browser's rounding of the intended 768px breakpoint check. Temporary viewport overrides and the 200% root-font diagnostic were reset.

All eight routes were inspected at those four CSS widths. The browser DOM check found the expected title and H1 on each route, no broken images, no nested glass panels, and no horizontal document overflow at normal text size. Glass-panel counts were 9 on home, 21 on Harness, 15/23/17 on the AI/automation/infrastructure practice routes, 3 on research, and 0 on the two legal routes. The counts reflect existing bounded panels, not artificial boxes around prose.

The current 390px homepage opening screenshot is `.frontend-qa/glass-final/home-final-390.jpg`. The latest static-preview captures are `.frontend-qa/glass-final/{real-glass-products-desktop,real-glass-products-mobile,real-glass-harness-desktop,real-glass-harness-mobile,real-glass-contact-mobile}.jpg`; pre-refinement static overview files are `.frontend-qa/glass-final/{static-home-desktop,static-products-desktop,static-harness-desktop}.jpg`. Other representative post-glass dev evidence is `.frontend-qa/glass-final/{harness-desktop,practice-desktop,research-desktop}.jpg` and `.frontend-qa/glass-slice/{product-desktop-view,product-mobile,product-shatter-frame,product-sheen-frame}.jpg`. The glass slice predates the final removal of the duplicated hero product list and app badges; the latest static product screenshots reflect that removal. Earlier pre-glass route and contact state evidence is under `.frontend-qa/implementation/`, including `contact-error-320x480-exact.jpg` and `contact-success-320x480.jpg`. These local, ignored files are review evidence and are not part of the published site.

Edge's earlier scrolled and 200%-text screenshot helper intermittently tiled or included area outside the emulated viewport. `.frontend-qa/glass-final/home-390-text200.jpg` is **not** reliable visual evidence. The opening `home-final-390.jpg` capture is a reliable full CSS viewport, though it includes the Next.js development indicator. The root reviewer later obtained reliable screenshots from the static preview in a fresh browser tab. For those static screenshots, Edge's local-site native zoom was 2/3; CDP viewport compensation produced exact CSS sizes, with image raster sizes of 960×640 or 260×560 pixels. Temporary CDP viewport, text-size, script, and media overrides were reset afterward.

In the final static preview, all eight public routes were checked at CSS 390 and 1440: titles and H1s matched, `documentElement.clientWidth === scrollWidth`, all images loaded, and no glass panels nested. The browser's captured developer logs contained no warnings or errors. The CDP event tail was truncated, so this is **not** a claim of complete historical network/event-log coverage. The root reviewer also inspected final desktop/mobile product and Harness glass, research, practice, and contact captures.

## Behavior observed

- Shared panel click fracture covered the Harness map at its actual panel size and faded out. Existing Harness disclosure, availability contact trigger, homepage product navigation, and practice links remained usable; keyboard Enter on a real link activated the link and the decorative fracture.
- Pausing removed an in-flight fracture, stopped the sheen, and prevented new click fractures. Resuming restored them. The button exposes Pause/Resume glass effects labels. A live `prefers-reduced-motion: reduce` emulation hid the control and sheen and prevented the click fracture; restoring normal preference re-enabled them.
- Computed sheen animation duration was exactly `10s`. On a 335px-wide final static pane, sampled translation was x144/y118 at 302ms, x427/y-91 at 903ms, and x151/y112 at 10,304ms, confirming a rising full-pane traverse and repeat (within one sampled frame). This confirms direction and timing, not frame-rate smoothness on every device.
- At the footer, the pause button moved above the legal links. Measured CSS viewport positions: at 320×480, header ended at y105, button y122–166, Terms y333–380; at 390×843, header y61, button y78–122, Terms y697–744; at 767×1023, header y71, button y78–122, Terms y877–924. At 390px with 200% root text, the header ended at y110, the resize-aware button moved to y126–170, and Terms sat at y674–744. At 767px with 200% text, button y88–132 cleared the y71 header and y854–924 Terms link.
- The homepage contact dialog was checked at 320×480 with the full blurred backdrop, reachable Send action, readable error and success messages. Local browser-intercepted 500, 429, and 200 responses exercised retry, rate-limit, and success feedback; these are simulated frontend states, not delivered mail. The form's native keyboard focus/Escape behavior, required-field validation, loading/busy state, project/research subject prefills, and original `/api/contact` payload were checked earlier in this redesign pass. No production form POST was made.
- The final static glass effect was checked with JavaScript disabled: homepage headings had 0 hidden instances, 9 panels remained present, the motion button was absent, and client/scroll width was 367/367. Scripts were restored after this check.
- Final static fracture created 10 decorative shards while content opacity stayed at 1; the shards were gone after 850ms. Pause removed an active fracture and suppressed another; keyboard Enter resumed. A live reduced-motion change hid the control and sheen and suppressed fracture.
- Final static contact at CSS 390×840 focused the email field, retained an 8px backdrop blur, and Escape returned focus to the trigger. No contact request was submitted to production.

After changing the two-column product-flow hero to one full-width conceptual flow, a 767px/200%-text Edge dev check found 15px of reported `documentElement.scrollWidth` overflow. The diagram split grid was made shrinkable and the homepage composition reflow breakpoint was widened to 899px so capability rows and process steps stack before their text clips. The root reviewer then checked the final static preview at 200% root text: CSS 768, 898, 900, and 1440 all had `documentElement.clientWidth === scrollWidth` (745/745, 876/876, 877/877, and 1417/1417 respectively). CSS 390 at normal text was 367/367. No document horizontal overflow remained at these checks.

## Limits and protected services

Physical iOS/Android devices, Safari/Firefox, a formal screen-reader run, Lighthouse/field performance, and measured animation frame-rate were not run. Do not treat screenshot stills as proof of smooth motion. The production site is not yet verified by this report.

No production contact request, mail-delivery test, or D1 production write was made. Email/SpaceMail, aliases, SMTP/IMAP, DNS records, D1 schema/data, AIKO and other apps/Workers, Supabase/Vercel, and account-wide settings were outside this frontend change. Existing Worker bindings and custom domains will be verified after an authorized deployment.

## Follow-up verification — 2026-10-02

The user requested one continuous page background, glass containers around text links (including links within existing glass panes), and removal of the Pause/Resume glass control. This revision supersedes the earlier pause-button behavior documented above. A shared, vertically consistent mineral-to-teal canvas now covers every route and its header; the homepage's alternate opaque section bands are transparent. Raised glass link controls have no underline and do not stack another backdrop filter. Logo image links and solid primary actions retain their existing treatments. Visible glass panes run the existing 10-second sheen automatically. The device's reduced-motion preference is still respected.

`npm run build`, `npm run lint`, and all 15 static-site acceptance checks passed. The Worker, deployment configuration, contact payload, content, routes, and approved logo were not changed.

The root reviewer checked the local static Worker preview in Edge at exact measured CSS widths of 320, 390, 768, and 1440 pixels, with a viewport height of 840 pixels. Across all eight public routes, document scroll width equaled client width; images loaded; main and header used the same computed background; no anchors had underlines; no pause/resume controls remained; and no link controls clipped their text. The captured developer warning/error log was empty. The 32 measurements are saved in `.frontend-qa/background-links/route-matrix.json`.

Actual desktop and mobile screenshots were inspected for the homepage society section, product panes, and contact dialog, plus the mobile Harness page. Evidence is saved as `.frontend-qa/background-links/{after-society-desktop,after-products-desktop,after-products-mobile,after-contact-mobile,after-harness-mobile}.jpg`. The homepage header wraps to two navigation rows on narrow screens and its measured height updates anchor clearance.

The mobile contact trigger opened the existing dialog, focused the email field, and retained the email, subject, message, privacy link, and 8px backdrop blur. Escape closed it and returned focus to Contact. Keyboard Enter on Meet Harness navigated to `/harness`. Clicking a product pane created ten decorative fracture shards while its content opacity remained 1. The sheen's computed duration was 10 seconds with infinite iteration and a running play state. The unchanged motion direction and repeat had been sampled in the October 1 verification; this follow-up does not claim new frame-rate measurements.

At 200% root text size on the homepage, measured CSS widths of 390, 768, and 1440 still had no horizontal document overflow or clipped link controls. With JavaScript disabled at 390 pixels, the shared background remained visible, all headings were visible, no motion button appeared, and client/scroll widths remained equal. Text-size and script overrides were restored.

No contact POST or production data write was made. Physical devices, Safari/Firefox, formal assistive-technology testing, and frame-rate measurements remain outside this verification. Production checks for this follow-up are recorded separately after deployment.

### Final glass scope clarification — 2026-10-02

The user's later clarification supersedes the broad text-link treatment above: only controls inside an existing glass pane receive a raised glass layer. All other controls, including navigation, footer, contact-dialog privacy links, and primary actions outside panes, use their normal styles without underlines. Buttons inside panes use a readable teal foreground and keep their icon on the same flex row. The homepage's “What should we build next?” invitation and the Harness architecture/access section no longer have glass, opaque fills, borders, or shadows; their content and interactions remain.

The final static build and TypeScript passed, as did all 15 acceptance checks. All eight routes were rechecked at exact 320/390/768/1440 CSS widths after the final button alignment fix: zero overflow, clipped controls, broken images, underlines, motion toggles, glass controls outside panes, or glass navigation/footer controls. Results are in `.frontend-qa/background-links/glass-scope-matrix.json`. Captured developer warnings/errors were empty. Desktop/mobile screenshots of the unboxed invitation and Harness information were inspected; the Harness glass contact button's arrow remained inside its 44px-high control. Both the normal Share with us trigger and the glass Harness contact trigger opened the dialog, focused email, and returned focus when closed with Escape. No messages were submitted.

Evidence: `.frontend-qa/background-links/{scoped-glass-products-desktop,scoped-glass-invitation-mobile,scoped-glass-harness-details-desktop,scoped-glass-harness-details-mobile}.jpg`. The first local rebuild encountered an output-directory lock from the running preview; stopping that preview resolved it. Subsequent builds succeeded. The prior verification limits and protected-service restrictions still apply.
