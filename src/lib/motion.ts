/**
 * Shared motion tokens — single source of truth for Framer Motion animations.
 *
 * EASE_ENTRANCE is the gentle ease-out used for on-scroll content reveals.
 * UI interactions (hover, press) use the CSS `--ease-out` curve in index.css.
 */
export const EASE_ENTRANCE = [0.25, 0.46, 0.45, 0.94] as const

/** Animation durations in seconds (Framer Motion expects seconds). */
export const DURATION = {
  fast: 0.16,
  base: 0.2,
  slow: 0.28,
} as const
