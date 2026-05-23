import { motion } from 'framer-motion'
import { useCardHover } from '../../lib/useCardHover'
import { MicroCtaContent } from './MicroCtaContent'

interface ProductCardProps {
  name: string
  description: string
  photo: string
  imageSide: 'left' | 'right'
  accent: string
  tallSticker?: boolean
  pideYaLabel: string
  orderHref: string
}

const BASE_BG = '#320e10'
const BASE_TEXT = '#f6eadf'
const INVERTED_TEXT = '#320e10'

export function ProductCard({
  name,
  description,
  photo,
  imageSide,
  accent,
  tallSticker = false,
  pideYaLabel,
  orderHref,
}: ProductCardProps) {
  const { hovered, reduceMotion, bind } = useCardHover()

  const bg = hovered ? accent : BASE_BG
  const fg = hovered ? INVERTED_TEXT : BASE_TEXT
  const subtle = hovered ? 'rgba(50,14,16,0.70)' : 'rgba(246,234,223,0.60)'
  const imageOnLeft = imageSide === 'left'

  return (
    <article
      {...bind}
      ref={bind.ref as React.RefObject<HTMLElement>}
      className="group relative rounded-xl sm:rounded-2xl isolate"
      style={{
        backgroundColor: bg,
        color: fg,
        overflow: 'visible',
        transition:
          'background-color 240ms var(--ease-out), color 240ms var(--ease-out), transform 240ms var(--ease-out)',
        transform: hovered && !reduceMotion ? 'translateY(-3px)' : 'translateY(0)',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {/* ── MOBILE layout (< 640px): stacked vertically ──────────── */}
      <div className="sm:hidden flex flex-col items-center py-6 px-5 gap-5">
        <div
          style={{
            width: tallSticker ? 96 : 110,
            height: tallSticker ? 130 : 110,
            filter: hovered
              ? 'drop-shadow(0 20px 28px rgba(0,0,0,0.50))'
              : 'drop-shadow(0 14px 22px rgba(0,0,0,0.42))',
            transition: 'filter 240ms var(--ease-out)',
            flexShrink: 0,
          }}
        >
          <img
            src={photo}
            alt={name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            className="select-none"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h4
            className="font-display text-[24px] leading-[0.98] tracking-[-0.02em] text-pretty"
            style={{ color: fg, transition: 'color 240ms var(--ease-out)' }}
          >
            {name}
          </h4>
          <p
            className="font-body text-[13px] leading-[1.6]"
            style={{ color: subtle, transition: 'color 240ms var(--ease-out)' }}
          >
            {description}
          </p>
          <a
            href={orderHref}
            target="_blank"
            rel="noreferrer"
            className="group/cta press focus-ring mt-1 self-start inline-flex items-center gap-2 font-body font-bold uppercase tracking-[0.14em] text-[11px] px-5 py-[10px] rounded-full"
            style={{
              backgroundColor: hovered ? '#320e10' : '#f8b114',
              color: hovered ? '#f6eadf' : '#320e10',
              transition:
                'background-color 220ms var(--ease-out), color 220ms var(--ease-out), transform 180ms var(--ease-out)',
            }}
          >
            <MicroCtaContent label={pideYaLabel} />
          </a>
        </div>
      </div>

      {/* ── SM+ layout (≥ 640px): horizontal with overflowing sticker ── */}
      <div className="hidden sm:block">
        {/* OVERFLOWING PRODUCT IMAGE */}
        {tallSticker ? (
          <motion.div
            className={`pointer-events-none absolute top-1/2 z-20 flex items-center justify-center
              w-[160px] h-[214px] sm:w-[192px] sm:h-[256px] md:w-[256px] md:h-[336px] ${
                imageOnLeft
                  ? '-left-1 sm:-left-2 md:-left-8'
                  : '-right-1 sm:-right-2 md:-right-8'
              }`}
            style={{
              transform: 'translateY(-50%)',
              filter: hovered
                ? 'drop-shadow(0 28px 36px rgba(0,0,0,0.55))'
                : 'drop-shadow(0 22px 30px rgba(0,0,0,0.50))',
              transition: 'filter 240ms var(--ease-out)',
            }}
            animate={{
              scale: hovered && !reduceMotion ? 1.06 : 1,
              rotate: hovered && !reduceMotion ? (imageOnLeft ? -5 : 5) : 0,
              y: '-50%',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 17, mass: 0.9 }}
          >
            <img
              src={photo}
              alt={name}
              loading="lazy"
              className="w-full h-full object-contain select-none"
            />
          </motion.div>
        ) : (
          <motion.img
            src={photo}
            alt={name}
            width="340"
            height="340"
            loading="lazy"
            className={`pointer-events-none select-none absolute top-1/2 z-20
              w-[160px] sm:w-[220px] md:w-[336px] h-auto ${
                imageOnLeft
                  ? 'left-1 sm:left-2 md:-left-8'
                  : 'right-1 sm:right-2 md:-right-8'
              }`}
            style={{
              transform: 'translateY(-50%)',
              filter: hovered
                ? 'drop-shadow(0 24px 32px rgba(50,14,16,0.45))'
                : 'drop-shadow(0 18px 24px rgba(0,0,0,0.35))',
              transition: 'filter 240ms var(--ease-out)',
            }}
            animate={{
              scale: hovered && !reduceMotion ? 1.06 : 1,
              rotate: hovered && !reduceMotion ? (imageOnLeft ? -5 : 5) : 0,
              y: '-50%',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 17, mass: 0.9 }}
          />
        )}

        {/* CARD CONTENT */}
        <div
          className={`relative flex items-center
            min-h-[200px] sm:min-h-[224px] md:min-h-[240px]
            py-7 sm:py-8 md:py-10 ${
              tallSticker
                ? imageOnLeft
                  ? 'pl-[168px] sm:pl-[200px] md:pl-[268px] pr-6 sm:pr-10 md:pr-14'
                  : 'pr-[168px] sm:pr-[200px] md:pr-[268px] pl-6 sm:pl-10 md:pl-14'
                : imageOnLeft
                  ? 'pl-[172px] sm:pl-[232px] md:pl-[352px] pr-6 sm:pr-10 md:pr-14'
                  : 'pr-[172px] sm:pr-[232px] md:pr-[352px] pl-6 sm:pl-10 md:pl-14'
            }`}
        >
          <div className="flex flex-col gap-3 sm:gap-4 max-w-[44ch]">
            <h4
              className="font-display text-[26px] sm:text-[32px] md:text-[42px] leading-[0.98] tracking-[-0.02em] text-pretty"
              style={{ color: fg, transition: 'color 240ms var(--ease-out)' }}
            >
              {name}
            </h4>

            <p
              className="font-body text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6]"
              style={{ color: subtle, transition: 'color 240ms var(--ease-out)' }}
            >
              {description}
            </p>

            <a
              href={orderHref}
              target="_blank"
              rel="noreferrer"
              className="group/cta press focus-ring mt-2 self-start inline-flex items-center gap-2 font-body font-bold uppercase tracking-[0.14em] text-[12px] px-6 py-[12px] rounded-full"
              style={{
                backgroundColor: hovered ? '#320e10' : '#f8b114',
                color: hovered ? '#f6eadf' : '#320e10',
                transition:
                  'background-color 220ms var(--ease-out), color 220ms var(--ease-out), transform 180ms var(--ease-out)',
              }}
            >
              <MicroCtaContent label={pideYaLabel} arrowSize={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
