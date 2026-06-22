# Beikit Web

Sitio web de **Beikit** — marca de repostería / cafetería / catering (cookies, cheesecakes, milkshakes, café frío). Web bilingüe ES / CA.

## Stack
- **React 19** + **TypeScript** + **Vite 8** (SPA con `react-router-dom` 7)
- **Tailwind CSS v3** (PostCSS) — config en `tailwind.config.ts`, base en `src/index.css`
- **framer-motion 12** para animación (respeta `prefers-reduced-motion`)
- `react-helmet-async` (SEO por página), `react-hook-form` (formularios)
- i18n propio (`src/lib/i18n.tsx`, strings en `i18n.es.ts` / `i18n.ca.ts`)

## Comandos
```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # prebuild (fetch:ig) + tsc -b + vite build
npm run preview  # previsualizar el build de producción
npm run lint     # ESLint
```

## Estructura
- `src/pages/` — rutas (`Home`, `Catering`, `Gracias`, `LegalPage`, `NotFound`)
- `src/components/layout/` — `Header`, `Footer`, `BottomNav`
- `src/components/sections/` — secciones de la home (`Hero`, `Menu`, `Nosotros`, `RRSS`, `Delivery`, `Claim`)
- `src/components/ui/` — primitivos reutilizables (`Button`, `ProductCard`, `GoogleRating`, …)
- `src/lib/` — i18n, `motion.ts` (variants/easing), hooks, consentimiento de cookies
- `public/assets/` — imágenes, SVG (logos, títulos, stickers) y fuentes auto-hospedadas

## Marca
Tokens definidos en `tailwind.config.ts`:
- **Colores:** `cream`, `yellow`, `dark`, `orange` (+ estados `*-hover`, `surface-dark`, `whatsapp`, `error`)
- **Fuentes:** `font-display` (Folkies Vantage Script), `font-body` (Beatrice), `font-gulp` (Gulp)

Ver [CLAUDE.md](CLAUDE.md) para las convenciones de trabajo y la guía de diseño.

## Notas
- Rutas con lazy loading + `ScrollManager` (con soporte de hash). Chunks de vendor separados en `vite.config.ts`.
- `fetch-instagram.mjs` se ejecuta en `prebuild` para refrescar datos de redes sociales.
