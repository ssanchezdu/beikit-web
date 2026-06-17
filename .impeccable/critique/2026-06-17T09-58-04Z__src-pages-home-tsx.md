---
target: the homepage
total_score: 35
p0_count: 0
p1_count: 0
timestamp: 2026-06-17T09-58-04Z
slug: src-pages-home-tsx
---
# Critique — Home (src/pages/Home.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Expand/collapse has `aria-expanded` + chevron; CTAs clear. Mostly static, few states needed. |
| 2 | Match System / Real World | 4 | Natural ES/CA voice, food language, familiar icons (store/phone/truck, IG/TikTok). |
| 3 | User Control and Freedom | 4 | Lang toggle, expand/collapse, cookie reject/accept, labeled bottom nav, clear exits. |
| 4 | Consistency and Standards | 4 | Highly consistent system: JellyWave transitions, color roles, CTA styles, type scale. |
| 5 | Error Prevention | 3 | Home has no risky inputs; image/URL fallbacks present (forms live on Catering). |
| 6 | Recognition Rather Than Recall | 4 | Labeled icons, everything visible, no hidden nav. |
| 7 | Flexibility and Efficiency | 3 | Multiple order paths + per-item Uber Eats deep links + lang toggle. |
| 8 | Aesthetic and Minimalist Design | 4 | Focused, appetite-forward, uncluttered; each section earns its space. |
| 9 | Error Recovery | 3 | IG fetch degrades to fallback gracefully; little else to recover on home. |
| 10 | Help and Documentation | 3 | Footer carries contact/hours/phone; FAQ lives on Catering page. |
| **Total** | | **35/40** | **Good (top of band)** |

## Anti-Patterns Verdict

**Does this look AI-generated? No.** It passes the brand slop test decisively.

**LLM assessment:** Committed/drenched color strategy — each section is its own color world (cream → oxblood `#320e10` → cream → orange `#e8511b` → cream → yellow `#f8b114` → dark), bridged by a custom `JellyWave`. Three real custom fonts (Beatrice, Gulp, Folkies Vantage Script — none on the reflex-reject list), real founder + product photography, and custom branded line-art stickers (clean, not sketchy-doodle). Brand voice carries copy ("Date un capricho con beikit", "Spoiler: nuestras redes huelen a cookies"). This is distinctive work.

**Deterministic scan:** `detect.mjs` over `src/components/sections`, `src/pages/Home.tsx`, and `src/index.css` returned **0 findings, exit 0**. No side-stripe borders, gradient text, ghost-card shadow+border pairs, over-rounding, or stripe backgrounds. Clean.

**Visual overlays:** No live browser overlay injection used; assessment done via direct Puppeteer screenshots (desktop 1440 + mobile 390) of all six sections.

## Overall Impression

This is a confident, appetite-first landing page that already looks ready to ship — far above the AI-slop baseline. The biggest opportunity is not visual; it's the conversion path. The hero's single action throws every visitor straight to Uber Eats off-site, skipping the "make me hungry first" browse step that the rest of the page does so well. Tighten the funnel and fix a couple of contrast/cadence tells and this is launch-grade.

## What's Working

1. **Color choreography.** The section-by-section color worlds bridged by JellyWave give the scroll a rhythm most food sites never attempt. This is voice, not decoration.
2. **Appetite-before-explanation IA.** Product photos dominate the menu, founders' faces build trust, the claim section delivers brand emotion — exactly the PRODUCT.md principle order.
3. **Craft in the details.** Menu expand/collapse re-anchors scroll so the button stays under the user's finger; `MotionConfig reducedMotion="user"` correctly converts slide reveals to crossfades for reduced-motion users; GPU-friendly transform strings on hover cards.

## Priority Issues

- **[P2] Hero offers only an off-site exit.** The hero's single CTA ("PIDE AHORA") sends every visitor to Uber Eats immediately. `ctaSecondary: 'VER CARTA'` is already defined in i18n but is **never rendered on the home hero** (only Catering uses it). 
  - **Why it matters:** A hungry-but-undecided visitor has no on-page path; they either commit to leaving the site or bounce. The whole page below is built to create appetite, and the hero skips it.
  - **Fix:** Render the existing `h.ctaSecondary` as a secondary button linking to `#menu`. Keep "PIDE AHORA" as primary.
  - **Suggested command:** `$impeccable craft` (hero secondary CTA) or `$impeccable layout`

- **[P2] Muted microcopy fails WCAG AA contrast.** The rating review-count line uses `text-dark/55` (`#320e10` at 55% on cream `#f6eadf` ≈ **3.8:1** at 13px — below the 4.5:1 floor). Bottom-nav inactive labels use the same `text-dark/55` at ~11px.
  - **Why it matters:** This is the social-proof line ("57 reseñas en Google") — proof the brand wants read, unreadable in sunlight on a phone. Sam (low-vision) and Casey (outdoor mobile) both lose it.
  - **Fix:** Bump to `text-dark/70` or darker for body-size muted text; verify ≥4.5:1.
  - **Suggested command:** `$impeccable audit` then `$impeccable colorize`

- **[P2] Uppercase tracked eyebrow + dash repeats on 5 of 6 sections.** "NUESTRA CARTA", "TRES MANERAS DE PEDIR", "BEIKIT BAKERY", the Nosotros label — all the same small-caps + leading-dash device. The skill flags this exact cadence as AI section-grammar.
  - **Why it matters:** It's the one move that makes an otherwise-distinctive page read as templated on close inspection.
  - **Fix:** Keep "HEARTMADE EVERYDAY / AMERICAN BAKERY" as the deliberate brand system, but vary the others — drop some entirely (RRSS already does), or replace with a different lead-in device per section.
  - **Suggested command:** `$impeccable typeset` or `$impeccable distill`

- **[P3] Cookie banner occupies the bottom ~25% of the mobile viewport** over the hero CTA zone until dismissed, sitting just above the bottom nav.
  - **Why it matters:** On first load (the highest-intent moment) the primary CTA and rating share space with a large consent block on small screens.
  - **Fix:** Slimmer mobile banner, or anchor it so it never overlaps the hero CTA / bottom nav.
  - **Suggested command:** `$impeccable adapt`

## Persona Red Flags

**Casey (Distracted Mobile):** Cookie banner crowds the hero CTA + rating on first load. Rating microcopy at 3.8:1 is hard to read outdoors. Single hero CTA jumps to the Uber Eats app — if interrupted, Casey returns to a different app, not the page. Bottom nav in thumb zone is a plus.

**Jordan (First-Timer):** Strong overall — "PIDE AHORA" is unmistakable, and the Delivery section's three labeled modes (En el local / Take away / Delivery) answer "how do I get this?" clearly. The gap: the hero's only action leaves the site before Jordan can browse what's on offer.

**Project persona — "Hungry local on a phone" (from PRODUCT.md):** The intended path is "I want this → see it → order." The hero collapses that to "→ order off-site," skipping the see-it step the page is otherwise excellent at. This is the single highest-leverage fix for the stated success metric (turn appetite into an order).

## Minor Observations

- All section content starts at `initial={{ opacity: 0 }}` and reveals on `whileInView`. It's robust here (IntersectionObserver works headless, `once: true`, reduced-motion handled) — but content is visually hidden until intersection. On very short viewports a section that never crosses its `amount` threshold would stay hidden; worth a quick check on the shortest target devices.
- Hero milkshake sticker sits close to the "beikit" wordmark on mobile — verify it never overlaps the glyphs at 320px width.
- `score` text is `text-dark/80` (fine); only the review-count half of the same line is under-contrast — easy targeted fix.

## Questions to Consider

- What if the hero kept the visitor on-page first — "Ver carta" scrolling to the menu — and let the product photos do the selling before the Uber Eats handoff?
- Does every section need an eyebrow, or would removing three of them make the remaining one feel intentional?
- Is the off-site jump to Uber Eats the only order path you want measured, or is keeping users on-page to browse a goal worth instrumenting?
