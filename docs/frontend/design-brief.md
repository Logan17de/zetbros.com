# Zetbros frontend refresh

Status: Implemented and browser-verified; see qa-report.md

## Scope and baseline

Refresh all eight public routes: homepage, Harness, AI/automation/infrastructure examples, equipment warranty research, privacy, and terms. Preserve all existing text, anchors, navigation destinations, metadata routes, logo/favicon files, contact subjects and payloads, API behavior, email delivery, and Cloudflare architecture. No authentication exists on this public site. Do not modify D1 data/schema, email/DNS settings, AIKO, or unrelated services.

Next.js 15.5.24, React 19.1, npm lockfile, CSS Modules and global CSS. No Tailwind, shadcn, Radix, or Base UI is installed. Retain CSS and the native dialog. No Figma supplied. Existing Chrome is available through CDP; agent-browser is not on PATH. No dependency additions planned.

Baseline: live revision 951723f. Desktop/mobile screenshots in `.frontend-qa/baseline`. Code inspection found repeated framed content, inconsistent blues, hover movement on non-interactive panels, and word-reveal CSS that can hide headings without JavaScript. These are refresh targets, not newly introduced defects.

## Direction: open editorial studio

The first screen explains the studio and makes products/business work discoverable. Considered precision product (compact panels and product-led geometry) and contemporary editorial (open rows, strong reading hierarchy, section rules). Select editorial because Zetbros serves people, society, and businesses and has substantial explanatory content rather than a live dashboard.

- Composition: a balanced logo/tagline and introduction opening; a flat product pathway; varied unboxed service rows, product listings, research and process sections. Preserve source reading order and all content. Fine rules organize dense pages.
- Typography: existing Segoe UI Variable Display / Segoe UI for headings; Segoe UI Variable Text / Segoe UI for reading, with system sans fallbacks. No downloads. Confirm rendered fonts in Chrome. Body 16–18px, leads 18–22px, section titles 30–48px, subpage titles 40–64px. The brand tagline remains quiet at 19–24px directly below the original logo, without punctuation.
- Palette: white `#ffffff`; graphite ink `#172f34`; muted text `#526568`; action/focus deep teal `#006875`; hover `#004d57`; structural rule `#d6e1e0`; input border `#829698`; success `#216847`; error `#a33232`. White text on action. Light theme only, honoring the user's white-page constraint.
- Geometry: 1200px main width; 720px reading measure; 24–40px gutters; 8px spacing rhythm; 64–104px section rhythm. Open content with no decorative panels. 4px controls, 8px diagrams/dialog. Elevation only for the contact overlay. Preserve meaningful diagram connections and input boundaries.
- Signature: a small open circular marker beside section labels, echoing the zero theme and the logo ring, plus a consistent thin-rule structure.
- Motion: 140ms link/button feedback; 180ms dialog entry; restrained 280ms section/word settling, capped stagger, no initial content hiding. Reduced motion shows static final content immediately. No new motion library.
- Negative constraints: no gradient hero, ambient blobs, decorative glow, repeated card grid, boxed headings, pill panels, heavy shadows, fake metrics/testimonials, custom cursors, long stagger chains, hidden-first-render text, or overflow suppression. Preserve the original brand artwork and all honest product/research qualifications.

## Implementation and checks

Representative slice first: homepage opening, product pathway, and working contact popup at desktop/mobile sizes. Then extend the shared tokens to all page modules and lower homepage sections.

Relevant states: idle/empty contact fields, native required/email validation, focused controls, submitting/disabled, request failure/retry, rate limit feedback, and success. Simulate server responses only in a local browser by intercepting `/api/contact`; no test mail or production D1 writes. Exercise prefilled research/project subjects and real navigation. Preserve native dialog focus trapping, Escape, and return focus.

Widths: 320, 390, 768, 1440 CSS pixels, plus breakpoint boundaries. Capture screenshots, console/runtime errors, accessibility trees, image failures, overflow and focus evidence. Inspect desktop/mobile screenshots and at least one non-default state. Check keyboard, 200% text resizing, reduced motion, JavaScript-disabled reading, and opaque palette contrast. Physical devices, Safari and assistive-technology certification are outside available tooling and must be labeled unverified.

Run `npm run lint`, `npm test`, `npm run build`, and `node --test tests/site.test.mjs`. Preserve all existing tests. Store evidence under `.frontend-qa/` (ignored) and the final factual report in this directory. Deployment remains authorized in the ongoing website workflow after validation, using the existing Worker only.

