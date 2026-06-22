import { useRef, type ReactNode, type Ref } from 'react'
import { Link } from 'react-router-dom'
import { useButtonMotion } from '../../lib/useButtonMotion'

/**
 * Button — the canonical button primitive.
 *
 * Owns the invariants that must never drift across the site: corner radius,
 * colour, focus ring, base typography, and the *feedback motion language*
 * (see `useButtonMotion` — a tuned "Jelly Pop" squash-and-stretch). Per-context
 * details (size, tracking, margin) pass through `className`.
 */
export type ButtonVariant =
  | 'yellow'
  | 'orange'
  | 'dark'
  | 'whatsapp'
  | 'outline-dark'
  | 'outline-cream'

/* `motion-reduce:active:opacity-80` restores a press acknowledgement for users
   who opted out of motion — the Jelly Pop squash no-ops for them, so the
   colour/opacity transition (already in TRANSITION) carries the feedback. */
const BASE =
  'font-body font-bold uppercase rounded-full inline-flex items-center justify-center motion-reduce:active:opacity-80'

/* Transform is owned by `useButtonMotion` (Jelly Pop); the CSS transition here
   only smooths the colour/opacity changes — never transform. */
const TRANSITION =
  'background-color 200ms var(--ease-out), color 200ms var(--ease-out), ' +
  'border-color 200ms var(--ease-out), opacity 200ms var(--ease-out)'

/* The variant owns the entire *colour* language so it can't drift per call site:
   - Solid variants: background darkens on hover + a static, colour-matched
     shadow for depth (the shadow no longer reacts to state — the Jelly Pop
     motion is the feedback now).
   - Outline variants: fill with the accent colour and invert the text on hover
     (a clean inversion). A call site may override the fill colour for a
     semantic action (e.g. WhatsApp green) with `hover:!bg-*`, but the
     *behaviour* — full fill + invert — stays identical everywhere.
   Call sites pass only size/tracking/margin via `className`, never hover. */
const VARIANT: Record<ButtonVariant, string> = {
  yellow:   'bg-yellow text-dark hover:bg-yellow-hover shadow-[0_8px_24px_-8px_rgba(248,177,20,0.42)]',
  orange:   'bg-orange text-white hover:bg-orange-hover shadow-[0_8px_24px_-8px_rgba(232,81,27,0.38)]',
  dark:     'bg-dark text-cream hover:bg-dark-hover shadow-[0_8px_24px_-8px_rgba(50,14,16,0.28)]',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover shadow-[0_8px_24px_-8px_rgba(37,211,102,0.42)]',
  'outline-dark':
    'border-2 border-dark/25 text-dark hover:bg-dark hover:text-cream hover:border-dark',
  'outline-cream':
    'border-2 border-cream/30 text-cream hover:bg-cream hover:text-dark hover:border-cream',
}

interface ButtonProps {
  variant: ButtonVariant
  children: ReactNode
  /** Per-context extras: size (px/py), tracking, text size, margin… */
  className?: string
  /** Use the light focus ring — for buttons on dark backgrounds. */
  focusOnDark?: boolean
  /** Internal route → renders a react-router <Link>. */
  to?: string
  /** URL → renders an <a>. */
  href?: string
  /** Opens the <a> in a new tab with safe rel. */
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

export function Button({
  variant,
  children,
  className = '',
  focusOnDark = false,
  to,
  href,
  external = false,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null)
  useButtonMotion(ref)

  const cls = `${BASE} ${focusOnDark ? 'focus-ring-dark' : 'focus-ring'} ${VARIANT[variant]} ${className}`
  const style = { transition: TRANSITION }

  if (to) {
    return (
      <Link ref={ref as Ref<HTMLAnchorElement>} to={to} className={cls} style={style} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        style={style}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button ref={ref as Ref<HTMLButtonElement>} type={type} onClick={onClick} disabled={disabled} className={cls} style={style} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
