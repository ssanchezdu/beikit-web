/*
  Google rating — subtle social proof for the hero.

  Presentational only: score/labels arrive as props so the parent owns i18n
  and the data source. Values are hardcoded upstream (no live sync); wiring a
  Places API later just means feeding real props in.

  Styled as quiet inline text in the brand palette — deliberately NOT a
  button/CTA: no surface, border, shadow or lift, sitting flat on the section.
  It stays an <a> (navigation to the Google listing, so visitors can verify
  the reviews), with only an understated underline-on-hover affordance.

  The star fill is proportional (`rating` 0–5), so a future 4.7 renders
  correctly. The rating is also conveyed as text (`score`, `reviews`), so the
  orange stars are reinforcing — never the sole carrier of the information.
*/

interface GoogleRatingProps {
  /** Numeric rating 0–5 — drives the proportional star fill. */
  rating: number
  /** Locale-formatted score shown as text, e.g. "5,0". */
  score: string
  /** Localized review-count label, e.g. "46 reseñas en Google". */
  reviews: string
  /** Accessible name for the whole link. */
  ariaLabel: string
  /** Link to the Google Maps listing. */
  href: string
}

const STAR_PATH =
  'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
/* Brand orange for filled stars; brand dark, low-alpha, for the empty track. */
const STAR_FILLED = '#e8511b'
const STAR_TRACK = 'rgba(50,14,16,0.15)'

function StarRow({ color }: { color: string }) {
  return (
    <span className="flex" style={{ color }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}

export function GoogleRating({ rating, score, reviews, ariaLabel, href }: GoogleRatingProps) {
  const fillPct = Math.max(0, Math.min(1, rating / 5)) * 100

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      /* min-h keeps a 44px tap target — invisible, no surface, so it still
         reads as a plain line of text rather than a control. */
      className="focus-ring group inline-flex items-center gap-2 min-h-[44px] rounded-[3px]"
    >
      {/* Stars — proportional fill over a muted track */}
      <span className="relative inline-flex shrink-0" aria-hidden="true">
        <StarRow color={STAR_TRACK} />
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct}%` }}>
          <StarRow color={STAR_FILLED} />
        </span>
      </span>

      {/* Score · review count — quiet brand-dark microcopy */}
      <span className="font-body text-[13px] leading-none whitespace-nowrap" aria-hidden="true">
        <span className="font-semibold text-dark/80">{score}</span>
        <span className="text-dark/25">{'  ·  '}</span>
        <span className="text-dark/55 underline-offset-2 group-hover:underline group-focus-visible:underline">
          {reviews}
        </span>
      </span>
    </a>
  )
}
