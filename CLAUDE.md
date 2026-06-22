# CLAUDE.md — Beikit Web

Production website for **Beikit**, a bakery / café / catering brand (cookies, cheesecakes, milkshakes, iced coffee). Bilingual ES / CA. This is a real, live product site — design and build with high craft, and feel free to improve things. There is no "reference image to match"; you own the design decisions unless the user specifies otherwise.

## Stack
- **React 19** + **TypeScript** + **Vite 8** (SPA, `react-router-dom` 7)
- **Tailwind CSS v3** via PostCSS — config in `tailwind.config.ts`, base layer in `src/index.css`. **Not** the CDN build.
- **framer-motion 12** for animation (`MotionConfig reducedMotion="user"` is set globally in `App.tsx` — honor reduced motion)
- `react-helmet-async` for per-page `<head>` / SEO, `react-hook-form` for forms
- i18n via custom `LanguageProvider` (`src/lib/i18n.tsx`, strings in `i18n.es.ts` / `i18n.ca.ts`)

## Project layout
- `src/pages/` — route components (`Home`, `Catering`, `Gracias`, `LegalPage`, `NotFound`)
- `src/components/layout/` — `Header`, `Footer`, `BottomNav`
- `src/components/sections/` — Home page sections (`Hero`, `Menu`, `Nosotros`, `RRSS`, `Delivery`, `Claim`)
- `src/components/ui/` — reusable primitives (`Button`, `ProductCard`, `GoogleRating`, …)
- `src/lib/` — i18n, `motion.ts` (shared variants/easing), hooks (`useActiveSection`, `useCardHover`, `useButtonMotion`, `useHoverCapable`), `cookieConsent`
- `public/assets/` — real brand assets: `images/` (product `.webp`/`.png`), `svg/` (logos, titles, stickers), `fonts/`

## Commands
- **Dev server:** `npm run dev` → Vite on `http://localhost:5173` (start in background before screenshots; don't start a second instance if already running)
- **Build:** `npm run build` (runs `prebuild` → `fetch:ig`, then `tsc -b && vite build`)
- **Lint:** `npm run lint`
- Always run `npm run lint` (and ideally `tsc -b`) after non-trivial changes; the build is type-checked.

## Brand
Use the tokens already defined in `tailwind.config.ts` — do not invent brand colors or fonts.
- **Colors:** `cream #f6eadf`, `yellow #f8b114`, `dark #320e10`, `orange #e8511b` (+ `*-hover` states, `surface-dark`, `whatsapp`, `error`)
- **Fonts:** `font-display` (Folkies Vantage Script), `font-body` (Beatrice), `font-gulp` (Gulp) — all self-hosted from `public/fonts/`
- **Radii / durations:** use the `borderRadius` and `transitionDuration` scales from the config, not arbitrary values
- Use real assets from `public/assets/` — never `placehold.co` or stock placeholders.

## Design quality bar
- **Animations:** animate `transform`/`opacity` only; reuse easing/variants from `src/lib/motion.ts`; never `transition-all`. Respect the global reduced-motion config.
- **Interactive states:** every clickable element needs `hover`, `focus-visible`, and `active` states.
- **Accessibility:** keep the skip link, semantic landmarks, `aria` labels, and bilingual strings intact. Both ES and CA must stay in sync when copy changes.
- **Responsive:** mobile-first; `BottomNav` shows on mobile (hidden on `/catering`, which has its own sticky CTA).
- **Depth & shadows:** layered, color-tinted shadows over flat `shadow-md`; maintain a base → elevated → floating surface hierarchy.

## Screenshot / verify workflow
- Puppeteer is a devDependency (no global install path needed).
- Section screenshots: `node section-shot.mjs http://localhost:5173 <selector> <name>` → saves to `./temporary screenshots/<name>.png`. Helper scripts live in `scripts/` (`shot-menu.mjs`, etc.).
- Read the saved PNG back with the Read tool to inspect it. When comparing, be specific about px / hex / spacing differences and do more than one pass.

## Notes
- Routes use lazy loading + a `ScrollManager` (hash-aware). Vendor chunks are split manually in `vite.config.ts`.
- `fetch-instagram.mjs` runs at build time to refresh IG/social data; don't remove it from `prebuild` without reason.
- Before adding a new color/font/utility, check whether a token already exists.
