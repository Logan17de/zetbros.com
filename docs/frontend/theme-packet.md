# Theme Packet: calm product studio

Chosen implementation direction, 2026-09-29; glass revision, 2026-10-01. Values are authoring tokens to validate in the browser, not a claim of completed implementation.

## Classification and identity

Zetbros is a public technology/product studio for people, society and businesses. The first screen should explain, then help visitors browse products or business work. Personality: considered, capable, approachable. Medium-density homepage; denser guides/practice examples; calm legal reading. Interaction is light: real links, anchors, disclosures, contact dialog. Trust comes from honest status/research qualifications and accurate feedback, not invented proof. English/Latin copy with system fallback for other characters. Available assets are the original logo/favicon and original line icons/diagrams.

Keep the original logo and **From zero to something real** directly beneath it without punctuation. The tagline remains a quiet part of the brand lockup, not an oversized promotional box. Preserve the original artwork. No owner identity or public GitHub.

Distinguishing detail: a small open ring and restrained connecting line can describe the actual path from an idea to a useful outcome. Use this in process/diagram content, not as a repeated background decoration or a replacement logo.

## Composition

The user permits new backgrounds, heading treatments and geometry, superseding earlier white-only/unboxed rules. This does not mean every sentence needs a box.

- Opening: original brand lockup, clear introduction, existing People & society / Business solutions paths. Nav, logo and essential copy/actions appear immediately.
- Product discovery: place AIKO and Harness in **Our products**, using two meaningful panels with existing descriptions, links and truthful status. Remove the duplicate app listing from the opening flow. Use names without app icons or letter badges; do not invent app artwork or screenshots.
- Social purpose: open narrative and compact benefit grouping. Avoid separate boundaries around each sentence.
- Business: distinct AI, automation and infrastructure offer groups. Three offers are real content here, not a grid formula to repeat on every section.
- Research: one quiet feature surface with its qualification and working route/contact action.
- Process/about: an open narrative and a connected process treatment, then the minimal footer.

Reordering complete groups is allowed where helpful. Preserve IDs, meaningful text and honest qualifications. Do not silently remove content or hide it behind carousels. Refine the representative slice before scaling.

## Typography

Use **Inter variable** for display, reading and UI, self-hosted from the official project with OFL license. Fallback: `"Segoe UI", Arial, sans-serif`. One family gives a consistent voice. Use optical sizing when supported. No monospace paragraphs, emoji illustration or proprietary reference fonts.

| Role | Desktop | Mobile | Weight / line height |
|---|---|---|---|
| Subpage display | 48–64px fluid | 34–40px | 600 / 1.08–1.15 |
| Section heading | 34–44px fluid | 28–32px | 600 / 1.15–1.22 |
| Panel title | 23–28px | 21–24px | 600 / 1.25 |
| Lead | 20–22px | 18–20px | 400 / 1.5 |
| Reading | 17–18px | 16–17px | 400 / 1.6–1.7 |
| Controls/nav | 14–16px | 14–16px | 500–600 / 1.4 |
| Metadata | 13–14px | 13–14px | 500 / 1.5 |
| Logo tagline | 21–24px | 19–21px | 400–500 / 1.4 |

Use rem-based tokens; fluid sizing only for major headings. Display tracking around -0.035em, panel titles -0.02em, body normal. Prose 60–68ch; legal reading near 70ch. No fixed text heights or desktop-only line breaks. Use `font-display: swap`, preload only the needed critical file, retain fallbacks, record source/version/payload and verify actual loading/rendered fonts. Do not fabricate fallback metric adjustments.

## Semantic palette

Adapt existing `app/studio.css` token names; avoid separate competing palettes per module.

| Role | Value | Use |
|---|---|---|
| Canvas | `#F5F6F2` | Warm neutral page foundation |
| Surface | `#FFFFFF` | Product/offer panels and dialog |
| Soft surface | `#E7EFEB` | Process, research or contextual group |
| Ink | `#162E32` | Heading and reading |
| Secondary text | `#536467` | Supporting copy |
| Action/focus | `#006875` | Existing logo-related deep teal |
| Action hover | `#004D57` | Interaction feedback |
| On action | `#FFFFFF` | Primary button labels |
| Structural border | `#D4DFDA` | Quiet separation |
| Control border | `#7A9192` | Input/interactive outline |
| Success | `#216847` | With explicit message/icon |
| Error | `#A33232` | With explanation |

Calculated opaque sRGB contrast: ink/canvas 13.15:1; secondary/canvas 5.71:1; secondary/soft 5.30:1; white/action 6.49:1; control border/white 3.34:1; error/white 6.86:1; success/white 6.70:1. These are token calculations, not accessibility certification. Recheck actual implemented combinations, including selected and disabled states. Light theme only; no unrequested theme switch. A saturated full-page background would overpower the logo and long reading.

## Geometry and surfaces

Main width 1200px; reading 720px. Spacing steps 4, 8, 12, 16, 24, 32, 48, 64, 80, 104px. Gutters 16px at 320, 20px mobile, 28px tablet, 40px desktop. Section rhythm about 64–88px desktop / 40–56px mobile; tighter within related groups.

Allowed surface family:

1. **Open section:** ordinary heading/prose without a border or shadow.
2. **Content panel:** translucent white on neutral, 20px radius (16px mobile), 24–36px padding, one subtle boundary. For an actual product/offer/feature group. Page background remains visible through the decorative glass layer. No nested card stacks.
3. **Context well:** translucent pale mint, 16px radius, no heavy shadow; a real flow, stage or grouped detail. Use the same glass family instead of a competing treatment.
4. **Overlay:** white native contact dialog, 24px radius, restrained shadow, blurred/dimmed backdrop; content can scroll within the viewport.

Controls have 10px radii and at least 44px interaction height. Use chips only for actual statuses/labels. Border/fill should usually suffice; no global card shadow. A single soft elevation token may support a genuinely raised feature. Static panels do not lift on hover. Actionable panels may emphasize border/arrow without implying a whole card is clickable when only its link is.

Headings may belong to a meaningful surface but never have a rectangle around every line or word. Legal pages remain open documents. Harness diagrams use boundaries to explain architecture.

## Glass revision: 2026-10-01

The user explicitly requested glass panels, a sheen from bottom-left to top-right every 10 seconds, and a click-triggered 2D shatter. This supersedes the earlier prohibition on glass. Retain the selected typography, palette, composition and restrained entrance system.

- Apply one shared treatment to existing meaningful content panels, context wells and bounded diagram groups across routes. Do not add boxes to open prose. Inputs, buttons and status/error messages remain clear task controls rather than nested decorative glass.
- Use a translucent white or mint layer with bounded backdrop blur, a quiet edge and subtle highlight. Keep copy above the effect and sharp. Verify composited contrast against actual backgrounds; provide a readable solid fallback when backdrop filtering is unavailable. Avoid nested backdrop filters.
- The subsequent realism request requires a clearer pane and visible background continuity rather than a milky card. Use a fine beveled perimeter, restrained specular reflections and a calm mineral/teal directional light field beneath. Avoid broad white haze, saturated blobs and new decorative imagery. Review the actual material on desktop/mobile before approving it.
- Sweep a narrow, soft sheen diagonally from bottom-left to top-right once per 10-second cycle. The visible pass is brief, followed by rest; do not move or reblur text. Limit animated layers and avoid blanket `will-change`.
- Clicking a panel briefly fractures its decorative shell into lightweight 2D fragments, then restores it. Fragments remain behind content, inside the surface boundary, and ignore pointer events. Existing links, controls, disclosures and forms act immediately. No destructive content removal, delayed navigation, fake card-button semantics or forced keyboard stops.
- Activation of existing keyboard-operable actions may trigger the same decorative effect. Keep focus visible. Add one compact, labeled pause/resume control for recurring effects without expanding the minimal footer; paused state stops sheen and shatter. Reduced motion, including a live preference change, disables the effects immediately. Base/no-JS content stays visible.
- CSS/SVG is the preferred lightweight implementation for this request. Rive is optional; no `.riv` asset or existing Rive runtime was supplied. Do not add a large animation dependency solely to draw simple decorative fragments.
- Inspect representative desktop/mobile panels and actual sheen/shatter frames before scaling. Verify the 10-second cycle, diagonal direction, restoration, pause/resume, reduced motion, keyboard and descendant actions. Repeat geometry/asset checks at 320/390/768/1440 after applying glass. Earlier QA of opaque panels is baseline evidence only.

## Responsive rules

The 2026-10-02 surface refinement uses one vertically consistent mineral/teal canvas on every route and its header. Open sections remain transparent; no alternating mint bands or per-route canvas fills. The shared canvas also renders without JavaScript. Following the user's clarification, only links and buttons inside a glass pane receive a small raised glass layer; all other controls retain their normal treatment, including navigation and footer links. No link underlines or nested backdrop filters are added. The homepage's product invitation and the Harness architecture/access section stay open on the canvas, without glass framing. The user requested removal of the glass pause/resume control: the 10-second sheen runs automatically while visible, with the existing device reduced-motion preference respected.

- 320–599px: one column, stacked products/offers, readable source order, full-width paired actions when needed; logo preserves aspect ratio and fits gutters.
- 600–899px: selected two-column groups when copy fits; intro may remain stacked. Avoid a cramped or awkward third business card.
- 900px+: balanced asymmetry, two product columns, three business columns only when legible, capped content width.
- The five nav destinations need touchable targets. If cramped, build a small accessible menu with expanded/collapsed state, keyboard, Escape and real links. No menu purely for decoration.
- Check 320/390/768/1440 and breakpoint boundaries. No overflow suppression as a fix. Dialog must fit 320px and mobile-height viewport with long subject/error text.

## Coordinated blur-and-fade

The complaint is synchronization and abruptness. Merely lengthening the current two competing systems is insufficient.

1. **One controller and one animation owner per visual group.** Eyebrow, heading and short lead enter as a unit; a nearby product/offer group can have its own entrance. No group contains another animated group. Never blur an entire multi-screen section.
2. Remove independent word-stagger observer behavior from `RevealBoxText`. Replace with semantic text/headings or a simple adapter preserving call sites; no meaningless aria-hidden word spans.
3. Server/base HTML is fully visible. Leave content already in the initial viewport static, including nav, logo, intro and actions. Animate only eligible offscreen groups after successful initialization. Missing observer, disabled/delayed JS or fast anchor navigation must not strand hidden content. Do not persist opacity zero waiting for JS.
4. Start at **900ms**, `cubic-bezier(.25,.1,.25,1)`, at most **2.5px blur**, **8px settling**, opacity near 0.35 to 1. These are authoring values for browser tuning, not measured timings of reference sites. One trigger event governs the group. No per-word cascade or global index delay; default simultaneous peers, maximum 60ms deliberate offset for two peers.
5. Use a shared observer that starts slightly before entry (e.g. threshold 0.01 with a modest positive bottom root margin), then unobserve. Do not wait for 28% of a tall element. Finish crisp with no retained blur/transform or layout shift. Tune after watching actual scroll behavior.
6. No replay on scroll-back. Do not animate nav, legal prose, form fields/errors or the LCP asset. Check the invariant that no reveal target contains another.
7. Reduced-motion preference (including a live change) and keyboard focus within a group immediately show final state. Cleanup cancels observers/animations and restores visibility, including Strict Mode and route changes. No blanket will-change, transition:all, perpetual entrance effects or delayed navigation. The separately requested recurring glass sheen follows the controls in the glass revision.
8. Hover/focus feedback: 160–180ms color/border/underline with immediate focus ring. Dialog: about 220ms opacity and at most 6px travel; no reveal controller inside. Rapid closing/reopening must retain focus behavior.

Verify normal/rapid scrolling, anchor jumps, scroll-back, route entry, first paint, focus during entry, reduced motion and no-JS reading. Inspect an animation sample/sequence or timeline, not just a settled screenshot. Report sample duration/synchronization honestly; still images do not prove frame rate. Physical mobile performance stays unverified unless tested.

## Six negative constraints

1. No default gradients/blobs, copied brand assets, fake proof or fake product screens. Glass is explicitly requested; constrain it to the shared surface treatment above.
2. No boxes around every sentence, nested cards or the same three-card grid throughout.
3. No washed-out text, fixed text clipping, forced breaks or hidden overflow masking defects.
4. No nested blur, word cascade, long delay, replay or JS-gated primary content.
5. No drifting font/color/radius systems across Harness, practice, research and legal routes; no app logos or letter badges. The user's October 2 clarification adds matching generic desktop and engine symbols to the two Harness architecture rows.
6. No altered routes/API/contact payloads, owner exposure, fake downloads or production data writes for testing.
