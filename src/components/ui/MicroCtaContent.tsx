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
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

/*
  Compact-to-expanded CTA content.

  Default: arrow is width-0 and invisible — button appears tight on the right.
  Hover / focus-visible: arrow expands from 0 → 20px and fades in, gap opens
  via margin-left. The button pill grows rightward with no layout thrash.
*/
export function MicroCtaContent({ label, arrowSize = 12, arrow }: MicroCtaContentProps) {
  return (
    <>
      {label}
      <span
        aria-hidden="true"
        className="inline-flex items-center overflow-hidden max-w-0 opacity-0
          group-hover/cta:max-w-5 group-hover/cta:opacity-100 group-hover/cta:ml-2
          group-focus-visible/cta:max-w-5 group-focus-visible/cta:opacity-100 group-focus-visible/cta:ml-2"
        style={{
          transition:
            'max-width 220ms var(--ease-out), margin-left 220ms var(--ease-out), opacity 200ms cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        {arrow ?? defaultArrow(arrowSize)}
      </span>
    </>
  )
}
