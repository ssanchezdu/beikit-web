import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProductCardCompactProps {
  name: string
  description: string
  photo: string
  accent: string
  pideYaLabel: string
  orderHref: string
  bestseller?: boolean
  bestsellerLabel?: string
  tallSticker?: boolean
}

const BASE_BG = '#3b1518'
const BASE_TEXT = '#f6eadf'
const INVERTED_TEXT = '#320e10'

export function ProductCardCompact({
  name,
  description,
  photo,
  accent,
  pideYaLabel,
  orderHref,
  bestseller = false,
  bestsellerLabel = 'Más pedido',
  tallSticker = false,
}: ProductCardCompactProps) {
  const [hovered, setHovered] = useState(false)

  const bg = hovered ? accent : BASE_BG
  const fg = hovered ? INVERTED_TEXT : BASE_TEXT
  const subtle = hovered ? 'rgba(50,14,16,0.65)' : 'rgba(246,234,223,0.55)'

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative rounded-[20px] sm:rounded-[24px] flex flex-col items-center text-center px-5 pt-7 pb-5 sm:pt-9 sm:pb-7 isolate h-full"
      style={{
        backgroundColor: bg,
        color: fg,
        transition:
          'background-color 480ms var(--ease-out), color 480ms var(--ease-out), transform 480ms var(--ease-out)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Bestseller ribbon */}
      {bestseller && (
        <span
          className="absolute -top-2 right-4 z-10 font-body font-bold uppercase tracking-[0.18em] text-[9px] px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{
            backgroundColor: '#f8b114',
            color: '#320e10',
            boxShadow: '0 4px 12px -2px rgba(248,177,20,0.45)',
          }}
        >
          ★ {bestsellerLabel}
        </span>
      )}

      {/* Sticker — sized responsively for visual impact (visceral level) */}
      <motion.div
        className={`flex items-center justify-center mb-5 sm:mb-6 ${
          tallSticker
            ? 'w-[150px] h-[200px] sm:w-[170px] sm:h-[228px] md:w-[180px] md:h-[244px]'
            : 'w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] md:w-[210px] md:h-[210px]'
        }`}
        style={{
          filter: hovered
            ? 'drop-shadow(0 22px 32px rgba(0,0,0,0.50))'
            : 'drop-shadow(0 14px 22px rgba(0,0,0,0.38))',
          transition: 'filter 480ms var(--ease-out)',
        }}
        animate={{ scale: hovered ? 1.06 : 1, rotate: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.8 }}
      >
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain select-none"
        />
      </motion.div>

      {/* Name */}
      <h4
        className="font-display text-[22px] sm:text-[24px] md:text-[26px] leading-[1] tracking-[-0.01em] text-pretty mb-3 sm:mb-4"
        style={{ color: fg, transition: 'color 480ms var(--ease-out)' }}
      >
        {name}
      </h4>

      {/* Description */}
      <p
        className="font-body text-[13px] leading-[1.55] mb-5 max-w-[34ch]"
        style={{ color: subtle, transition: 'color 480ms var(--ease-out)' }}
      >
        {description}
      </p>

      {/* CTA — pinned to bottom */}
      <a
        href={orderHref}
        target="_blank"
        rel="noreferrer"
        className="press focus-ring mt-auto inline-flex items-center gap-2 font-body font-bold uppercase tracking-[0.14em] text-[11px] px-5 py-[10px] rounded-full"
        style={{
          backgroundColor: hovered ? '#320e10' : '#f8b114',
          color: hovered ? '#f6eadf' : '#320e10',
          transition:
            'background-color 480ms var(--ease-out), color 480ms var(--ease-out), transform 180ms var(--ease-out)',
        }}
        aria-label={`${pideYaLabel} — ${name}`}
      >
        {pideYaLabel}
        <span
          className="inline-block"
          style={{
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 480ms var(--ease-out)',
          }}
          aria-hidden="true"
        >
          →
        </span>
      </a>
    </article>
  )
}
