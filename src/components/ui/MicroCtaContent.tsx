import type { ReactNode } from 'react'

interface MicroCtaContentProps {
  label: ReactNode
  arrowSize?: number
  arrow?: ReactNode
}

const defaultArrow = (size: number) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export function MicroCtaContent({ label, arrowSize = 12, arrow }: MicroCtaContentProps) {
  return (
    <>
      <span
        className="inline-block group-hover/cta:-translate-x-0.5 group-focus-visible/cta:-translate-x-0.5"
        style={{ transition: 'transform 220ms var(--ease-out)' }}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="inline-flex items-center opacity-0 -translate-x-1 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 group-focus-visible/cta:opacity-100 group-focus-visible/cta:translate-x-0"
        style={{ transition: 'opacity 220ms var(--ease-out), transform 220ms var(--ease-out)' }}
      >
        {arrow ?? defaultArrow(arrowSize)}
      </span>
    </>
  )
}
