import { motion } from 'framer-motion'
import { useCardHover } from '../../lib/useCardHover'
import { MicroCtaContent } from './MicroCtaContent'

export type ImageShape = 'square' | 'landscape' | 'tall'

interface ProductCardCompactProps {
  name: string
  description: string
  photo: string
  accent: string
  pideYaLabel: string
  orderHref: string
  bestseller?: boolean
  bestsellerLabel?: string
  imageShape: ImageShape
  overflow?: boolean
  noImageShadowOnHover?: boolean
}

const BASE_BG = '#3b1315'
const BASE_TEXT = '#f6eadf'
const INVERTED_TEXT = '#320e10'

/*
  Unified image-box system. Every box carries roughly the same visual mass; its
  aspect ratio matches the product photo so the image fills the box edge to edge
  — square cookies, landscape cheesecake slices, tall milkshake/latte glasses.
*/
const IMAGE_BOX: Record<ImageShape, string> = {
  // square is sized larger than equal-area would suggest: a round cookie only
  // fills ~78% of its bounding box, so it needs a bigger box to match the
  // perceived mass of a slice that fills its rectangle. All values ×8.
  square:    'w-[224px] h-[224px] sm:w-[256px] sm:h-[256px] md:w-[288px] md:h-[288px]',
  landscape: 'w-[232px] h-[168px] sm:w-[264px] sm:h-[192px] md:w-[288px] md:h-[208px]',
  tall:      'w-[176px] h-[264px] sm:w-[208px] sm:h-[312px] md:w-[224px] md:h-[336px]',
}

export function ProductCardCompact({
  name,
  description,
  photo,
  accent,
  pideYaLabel,
  orderHref,
  bestseller = false,
  bestsellerLabel = 'Más pedido',
  imageShape,
  overflow = false,
  noImageShadowOnHover = false,
}: ProductCardCompactProps) {
  const { hovered, reduceMotion, bind } = useCardHover()

  const imageSize = IMAGE_BOX[imageShape]

  // Towering treatment (milkshakes): pull the image up so it breaks the frame,
  // sitting lower than before, with a minimal gap to the title.
  // pointer-events-none keeps the overflowing part from intercepting clicks.
  const imageWrap = overflow
    ? `-mt-[32px] sm:-mt-[40px] md:-mt-[48px] mb-1 pointer-events-none ${imageSize}`
    : `mb-5 sm:mb-6 ${imageSize}`

  const bg = hovered ? accent : BASE_BG
  const fg = hovered ? INVERTED_TEXT : BASE_TEXT
  const subtle = hovered ? 'rgba(50,14,16,0.65)' : 'rgba(246,234,223,0.55)'

  return (
    <article
      {...bind}
      className="group relative rounded-lg sm:rounded-xl flex flex-col items-center text-center px-5 pt-7 pb-5 sm:pt-9 sm:pb-7 isolate h-full"
      style={{
        backgroundColor: bg,
        color: fg,
        transition:
          'background-color 220ms var(--ease-out), color 220ms var(--ease-out), transform 220ms var(--ease-out)',
        transform: hovered && !reduceMotion ? 'translateY(-4px)' : 'translateY(0)',
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
        className={`flex items-center justify-center ${imageWrap}`}
        style={{
          filter: hovered
            ? noImageShadowOnHover
              ? 'none'
              : 'drop-shadow(0 22px 32px rgba(0,0,0,0.50))'
            : 'drop-shadow(0 14px 22px rgba(0,0,0,0.38))',
          transition: 'filter 220ms var(--ease-out)',
        }}
        animate={{
          scale: hovered && !reduceMotion ? 1.06 : 1,
          rotate: hovered && !reduceMotion ? 4 : 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.8 }}
      >
        <img
          src={photo}
          alt=""
          loading="lazy"
          className="w-full h-full object-contain select-none"
        />
      </motion.div>

      {/* Name */}
      <h4
        className="font-display text-[22px] sm:text-[24px] md:text-[26px] leading-[1] tracking-[-0.01em] text-pretty mb-3 sm:mb-4"
        style={{ color: fg, transition: 'color 220ms var(--ease-out)' }}
      >
        {name}
      </h4>

      {/* Description */}
      <p
        className="font-body text-[13px] leading-[1.55] mb-5 max-w-[34ch]"
        style={{ color: subtle, transition: 'color 220ms var(--ease-out)' }}
      >
        {description}
      </p>

      {/* CTA — pinned to bottom */}
      <a
        href={orderHref}
        target="_blank"
        rel="noreferrer"
        className="group/cta press focus-ring mt-auto inline-flex items-center gap-2 font-body font-bold uppercase tracking-[0.14em] text-[11px] px-5 py-[10px] rounded-full"
        style={{
          backgroundColor: hovered ? '#320e10' : '#f8b114',
          color: hovered ? '#f6eadf' : '#320e10',
          transition:
            'background-color 220ms var(--ease-out), color 220ms var(--ease-out), transform 180ms var(--ease-out)',
        }}
        aria-label={`${pideYaLabel} — ${name}`}
      >
        <MicroCtaContent label={pideYaLabel} />
      </a>
    </article>
  )
}
