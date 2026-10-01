# Zetbros reference study

Research date: 2026-09-29. Researcher: primary agent. Implementation recipient: GPT-6 Sol, Extra High.

## Method and limits

Reviewed ten official sites with the web tool and inspected real browser screenshots. This is a selected set of strong relevant references, not an objective ranking of the world's ten best websites. Marketing pages change and vary by locale.

Captures are local in `.frontend-qa/references/` (ignored by Git). All ten desktop views were inspected, plus Apple and Notion at 390px, and Zetbros at 390px/1440px. Additional lower-page views cover Apple, Stripe and Linear. Some references displayed regional/cookie notices. Those notices were not used as visual models. No code, illustrations, product screenshots or proprietary fonts were copied.

Font observations identify declared CSS families, not every rendered glyph. Webflow's font was not reliably captured. Reference animation timings were **not measured**; proposed Zetbros timings are our design decisions.

## Ten references

| Official reference | Observed | Adapt for Zetbros | Exclude | Local PNG evidence |
|---|---|---|---|---|
| [Linear](https://linear.app/) | Large left-aligned headings, Inter Variable declared, restrained borders, focused product panels on a dark canvas | Type hierarchy and quiet panel boundaries | Full dark theme, fake product UI, overflowing demo carousels | `linear`, `linear-panels` |
| [Stripe](https://stripe.com/) | Strong hierarchy, colorful hero, lower-page split title/copy layouts and pale modules; Söhne declared | Clear offer grouping and title-plus-summary sections | Broad gradient campaign, invented client proof, proprietary type | `stripe`, `stripe-panels` |
| [Vercel](https://vercel.com/) | Precise controls and low-contrast edges; Geist Sans declared | Shared control geometry and primary/secondary action roles | Black technical branding, triangle artwork, dashboard imitation | `vercel` |
| [Apple Mac](https://www.apple.com/mac/) | White/cool-gray regions, spacious product groups and soft-corner panels; SF Pro Display declared | Surface hierarchy and section pacing; one surface per meaningful group | Copied SF fonts/hardware imagery, horizontal-only browsing, scroll choreography | `apple`, `apple-panels`, `apple-mobile` |
| [Notion](https://www.notion.com/) | Friendly strong type, clear paired actions, white space and warm accents; NotionInter/Inter declared | Approachable type and full-width stacked mobile actions | Cycling headlines, copied mascots, customer logo strip | `notion`, `notion-mobile` |
| [Figma](https://www.figma.com/) | Scale contrast and asymmetric headline/product composition; Figma Sans declared | Controlled asymmetry and varied visual weight | Bright collage, proprietary font, decorative layers without content | `figma` |
| [Framer](https://www.framer.com/) | Concise heading/actions followed by one coherent product stage; GT Walsheim declared | Treat related heading, copy and surface as a composed unit | Perpetual background motion, copied previews and font | `framer` |
| [Webflow](https://webflow.com/) | Strong headline/action contrast and grouped previews; font unverified | Each section has an obvious job and next action | Enterprise claims, animation spectacle, invented proof | `webflow` |
| [Pitch](https://pitch.com/) | Soft major panels and a prominent task; purple brand and Mark Pro Bold declared | Distinguish important panels from background with restrained soft geometry | Floating decoration, purple takeover, false interactive demo | `pitch` |
| [Wise](https://wise.com/) | Plain category navigation, direct language, strong green brand; Wise Sans/Inter declared | Clear people/business categories and need-based browsing | Green brand copying, heavy all-caps display, financial app patterns | `wise` |

## Synthesis

Use **Linear/Notion type discipline, Apple surface hierarchy, Stripe offer grouping and Vercel control consistency** as the main influences. The other sites help judge composition and restraint. An effect from every site would reproduce the inconsistency the user disliked. One shared type, color, geometry and motion system must bind the result together.

Inter is available from its [official project](https://rsms.me/inter/) under the [SIL Open Font License 1.1](https://github.com/rsms/inter/blob/master/LICENSE.txt). Obtain the required files from an official release/distribution, retain the license, self-host and record the source/version. Do not copy proprietary fonts named above.

## Zetbros baseline

Production baseline commit: `547ac5a2dbfdc3ad1e68ff756d7d072257055e8f`. Screenshots: `zetbros-baseline-desktop.png` (1440px) and `zetbros-baseline-mobile.png` (390px).

- The white-only flat rows give products, business capabilities, purpose and research nearly identical weight. Introduce meaningful grouping and a varied but coherent section rhythm.
- Keep the original brand lockup, but make actual products and the progression from idea to useful outcome more legible. Thin rows and repeated rules currently do most of the visual work.
- Many long sections share similar scale and generous gaps. Improve density/grouping without deleting meaningful content or hiding it in carousels.
- Motion source inspection explains the mismatch: independent heading and section observers use thresholds 0.28 and 0.14; word delays combine with parent delays; parent and child groups can animate together. The 560/620ms easing front-loads motion, and already visible content may restart in a blurred state.
- These are design findings, not a new complete functional audit. Contact delivery, all breakpoints and deployment require separate implementation checks.

## Direction decision

| Candidate | Fit | Decision |
|---|---|---|
| Technical editorial | Efficient reading, but close to the current sparse design; weak differentiation between products and long narrative content | Do not continue as the primary direction |
| Calm product studio | Human and business-oriented; supports product/offer panels, open prose, useful diagrams, a warm neutral canvas and coordinated fades | **Selected** |

Existing original icons, product names/status, diagrams and the logo provide enough authentic material. No invented app screenshot is needed.

## Mobile lessons

The sampled Notion mobile layout stacks clear full-width actions while retaining readable type. Apple keeps section labels legible but its horizontal product rail does not fit Zetbros' two-product set. Stack Zetbros products/offers in normal flow. Use an accessible mobile menu only if the five nav items cannot remain comfortably touchable.

## Deliverables

[Theme Packet](theme-packet.md) defines actual tokens and motion rules. [Implementation handoff](implementation-handoff.md) maps them to files, routes, protected behavior and checks. Reference screenshots are research evidence for the implementer, never assets to publish in `public/`.
