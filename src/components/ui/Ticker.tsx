interface TickerProps {
  items: string[]
  separator?: string
  bgColor?: string
  textColor?: string
  speed?: number
  reverse?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-[11px] tracking-[0.22em] py-2.5',
  md: 'text-[12px] tracking-[0.2em] py-3',
  lg: 'text-[14px] tracking-[0.18em] py-4',
}

export function Ticker({
  items,
  separator = '★',
  bgColor = '#320e10',
  textColor = '#f6eadf',
  speed = 28,
  reverse = false,
  size = 'md',
  className = '',
}: TickerProps) {
  // Duplicate so the marquee loops seamlessly
  const track = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`overflow-hidden ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="font-body font-bold uppercase inline-flex items-center gap-5"
            style={{ color: textColor }}
          >
            <span>{item}</span>
            <span
              className="inline-block"
              style={{ color: bgColor === '#f8b114' ? '#320e10' : '#e8511b', opacity: 0.7 }}
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
