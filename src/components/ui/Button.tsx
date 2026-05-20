import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Button — the canonical button primitive.
 *
 * Owns the invariants that must never drift across the site: corner radius,
 * press feedback, focus ring and base typography. Colour comes from `variant`;
 * per-context details (size, tracking, shadow, margin) pass through `className`.
 */
export type ButtonVariant =
  | 'yellow'
  | 'orange'
  | 'dark'
  | 'whatsapp'
  | 'outline-dark'
  | 'outline-cream'

const BASE =
  'press font-body font-bold uppercase rounded-full inline-flex items-center justify-center'

const TRANSITION =
  'transform 160ms var(--ease-out), background-color 200ms var(--ease-out), ' +
  'color 200ms var(--ease-out), border-color 200ms var(--ease-out), ' +
  'box-shadow 200ms var(--ease-out), opacity 200ms var(--ease-out)'

/* Solid variants set bg + text + hover. Outline variants set only the border
   width + text colour; each call supplies its own border colour / hover via
   `className`, since outline buttons are intentionally context-specific. */
const VARIANT: Record<ButtonVariant, string> = {
  yellow:          'bg-yellow text-dark hover:bg-yellow-hover',
  orange:          'bg-orange text-white hover:bg-orange-hover',
  dark:            'bg-dark text-cream hover:bg-dark-hover',
  whatsapp:        'bg-whatsapp text-white',
  'outline-dark':  'border-2 text-dark',
  'outline-cream': 'border-2 text-cream',
}

interface ButtonProps {
  variant: ButtonVariant
  children: ReactNode
  /** Per-context extras: size (px/py), tracking, text size, shadow, margin… */
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
  const cls = `${BASE} ${focusOnDark ? 'focus-ring-dark' : 'focus-ring'} ${VARIANT[variant]} ${className}`
  const style = { transition: TRANSITION }

  if (to) {
    return (
      <Link to={to} className={cls} style={style} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
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
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
