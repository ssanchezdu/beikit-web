import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { ProductCardCompact, type ImageShape } from '../ui/ProductCardCompact'
import { JellyWave } from '../ui/JellyWave'
import { MicroCtaContent } from '../ui/MicroCtaContent'

const UBER_EATS_URL = 'https://ubereats.com'
const FEATURED_COUNT = 3

/* Brand-consistent accent palette per category — warm, edible, non-generic. */
const ACCENTS = {
  // NY Classic, Oreo, Lotus, Pistacchio, Kinder, Red Velvet, Dinosaurus, Triple Choc
  cookies:     ['#c97f3a', '#d9cfc2', '#d49856', '#b5c47a', '#ead7b8', '#d16a5a', '#f0d890', '#a56b47'],
  // Flat list across both cheesecake subgroups in order
  cheesecakes: ['#f0e3cf', '#d9cfc2', '#b5c47a', '#d49856', '#ead7b8', '#eab0bd', '#d9cfc2', '#b5c47a', '#d49856'],
  // Vainilla, Chocolate, Fresa, Oreo, Lotus, Dinosaurus
  milkshakes:  ['#f6eadf', '#a56b47', '#eab0bd', '#d9cfc2', '#d49856', '#f0d890'],
  // Café Latte, French Vainilla, Oreo, Lotus, Mocha, Mocha White, Matcha, Chai
  otros:       ['#d9b88e', '#ead7b8', '#d9cfc2', '#d49856', '#a56b47', '#ead0c8', '#b5c47a', '#e8a45c'],
} as const

type Item = { name: string; price: string; desc: string }

/* Flatten cheesecakes (which come grouped) into a single list with group markers. */
function flattenCheesecakes(groups: { title: string; items: Item[] }[]): Item[] {
  return groups.flatMap((g) => g.items)
}

/* Definitive cookie photos, keyed by carta name (identical in ES and CA). */
const COOKIE_IMAGES: Record<string, string> = {
  'NY Classic': '/assets/images/nyclassic.webp',
  Oreo: '/assets/images/oreo.webp',
  Lotus: '/assets/images/lotus.webp',
  Pistacchio: '/assets/images/pistacchio.webp',
  Kinder: '/assets/images/kinder.webp',
  'Red Velvet': '/assets/images/redvelvet.webp',
  Dinosaurus: '/assets/images/dinosaurus.webp',
  'Triple Choc': '/assets/images/triplechoc.webp',
}

/* Latte photos — Café Latte (bestseller), Matcha and Chai each have their own
   image; the remaining coffees fall back to the default café latte photo.
   Café Latte is keyed in both languages (ES "Café", CA "Cafè"). */
const LATTE_IMAGES: Record<string, string> = {
  'Café Latte': '/assets/images/cafelattereg.webp',
  'Cafè Latte': '/assets/images/cafelattereg.webp',
  'Matcha Latte': '/assets/images/matcha.webp',
  'Chai Latte': '/assets/images/chailatte.webp',
}

/* Cheesecake photos — keyed by position in the flattened list (names repeat
   across the two groups, so a name key can't distinguish them).
   Indices 0-4 = "Horno cremosa" group · 5-8 = "Mousse fría" group. */
const CHEESECAKE_IMAGES: Record<number, string> = {
  0: '/assets/images/clasicaporcion.webp',
  1: '/assets/images/oreoporcion.webp',
  2: '/assets/images/pistachoporcion.webp',
  3: '/assets/images/lotusporcion.webp',
  4: '/assets/images/kinderporcion.webp',
  5: '/assets/images/fresa1.webp',
  6: '/assets/images/oreo1.webp',
  7: '/assets/images/pistacho1.webp',
  8: '/assets/images/lotus1.webp',
}

export function MenuSection() {
  const { t } = useLanguage()
  const m = t.menu

  const cheesecakeItems = flattenCheesecakes(m.items.cheesecakes)

  const categories = [
    {
      key: 'cookies' as const,
      titleType: 'svg' as const,
      eyebrow: 'Heartmade',
      title: m.cookies.title,
      description: m.cookies.description,
      items: m.items.cookies,
      photo: '/assets/svg/sticker_cookies.svg',
      itemImages: COOKIE_IMAGES,
      imageShape: 'square' as const,
    },
    {
      key: 'cheesecakes' as const,
      titleType: 'svg' as const,
      eyebrow: 'Creamy',
      title: m.cheesecakes.title,
      description: m.cheesecakes.description,
      items: cheesecakeItems,
      photo: '/assets/svg/sticker_cheesecake.svg',
      itemImagesByIndex: CHEESECAKE_IMAGES,
      imageShape: 'landscape' as const,
    },
    {
      key: 'milkshakes' as const,
      titleType: 'text' as const,
      eyebrow: 'Heartmade',
      title: m.milkshakes.title,
      description: m.milkshakes.description,
      items: m.items.milkshakes,
      photo: '/assets/images/milkshake.webp',
      imageShape: 'tall' as const,
    },
    {
      key: 'otros' as const,
      titleType: 'text' as const,
      eyebrow: 'Heartmade',
      title: m.otros.title,
      description: m.otros.description,
      items: m.items.otros,
      photo: '/assets/images/cafelatte.webp',
      itemImages: LATTE_IMAGES,
      imageShape: 'tall' as const,
    },
  ]

  return (
    <section
      id="menu"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#320e10' }}
    >
      {/* Section eyebrow */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-10 md:pb-14">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="block w-10 h-[3px] bg-[#e8511b] rounded-full" />
          <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-[#e8511b]">
            Nuestra carta
          </span>
        </motion.div>
      </div>

      {/* Categories — each as a section block with featured grid + expand */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-16 sm:pb-24 md:pb-32 flex flex-col gap-16 sm:gap-20 md:gap-28">
        {categories.map((cat) => (
          <CategoryBlock
            key={cat.key}
            cat={cat}
            verTodos={m.verTodos}
            verMenos={m.verMenos}
            masPedidoLabel={m.masPedido}
            pideYaLabel={m.pideYa}
            accents={ACCENTS[cat.key]}
          />
        ))}
      </div>

      <JellyWave fill="#e8511b" height={140} />
    </section>
  )
}

interface CategoryBlockProps {
  cat: {
    key: 'cookies' | 'cheesecakes' | 'milkshakes' | 'otros'
    titleType: 'svg' | 'text'
    eyebrow: string
    title: string
    description: string
    items: Item[]
    photo: string
    itemImages?: Record<string, string>
    itemImagesByIndex?: Record<number, string>
    imageShape: ImageShape
  }
  verTodos: (n: number) => string
  verMenos: string
  masPedidoLabel: string
  pideYaLabel: string
  accents: readonly string[]
}

function CategoryBlock({ cat, verTodos, verMenos, masPedidoLabel, pideYaLabel, accents }: CategoryBlockProps) {
  const [expanded, setExpanded] = useState(false)

  const featured = cat.items.slice(0, FEATURED_COUNT)
  const rest = cat.items.slice(FEATURED_COUNT)
  const hasRest = rest.length > 0

  // Milkshake cards let the glass tower above the card edge — the grid needs
  // extra row gap + top padding so the overflow clears its neighbours.
  const overflowCat = cat.key === 'milkshakes'
  const gridCols = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 md:gap-x-6'
  const featuredGrid = overflowCat
    ? `${gridCols} gap-y-14 sm:gap-y-16 md:gap-y-16 pt-7 md:pt-9`
    : `${gridCols} gap-y-4 sm:gap-y-5 md:gap-y-6`
  const expandedGrid = overflowCat
    ? `${gridCols} gap-y-14 sm:gap-y-16 md:gap-y-16 pt-14 md:pt-16`
    : `${gridCols} gap-y-4 sm:gap-y-5 md:gap-y-6 pt-1`

  return (
    <div className="flex flex-col gap-7 sm:gap-9 md:gap-12">
      {/* Category header */}
      <motion.header
        className="flex flex-col max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {cat.titleType === 'svg' ? (
          <img
            src={`/assets/svg/${cat.key}_title.svg`}
            alt={`${cat.eyebrow} ${cat.title}`}
            className="w-auto h-[48px] sm:h-[64px] md:h-[96px] lg:h-[120px] self-start mb-3 sm:mb-4 md:mb-6"
          />
        ) : (
          <>
            <span className="font-display text-[18px] md:text-[22px] leading-none text-[#e8511b] -rotate-3 -mb-3 md:-mb-4 self-start pl-2 md:pl-4">
              {cat.eyebrow}
            </span>
            <h3 className="font-gulp font-normal lowercase text-[56px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.9] tracking-[-0.02em] text-[#f6eadf] mb-3 sm:mb-4 md:mb-6">
              {cat.title}
            </h3>
          </>
        )}
        <p className="font-body text-[14px] md:text-[16px] leading-[1.65] text-[#f6eadf]/65 max-w-[58ch] text-pretty">
          {cat.description}
        </p>
      </motion.header>

      {/* Featured grid — 3 cards */}
      <div className={featuredGrid}>
        {featured.map((item, i) => {
          const accent = accents[i % accents.length]
          return (
            <motion.div
              key={`${cat.key}-featured-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <ProductCardCompact
                name={item.name}
                description={item.desc}
                photo={cat.itemImagesByIndex?.[i] ?? cat.itemImages?.[item.name] ?? cat.photo}
                accent={accent}
                pideYaLabel={pideYaLabel}
                orderHref={UBER_EATS_URL}
                bestseller={i === 0}
                bestsellerLabel={masPedidoLabel}
                imageShape={cat.imageShape}
                overflow={cat.key === 'milkshakes'}
                noImageShadowOnHover={cat.key !== 'cheesecakes'}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Expanded grid — rest of items, animated reveal */}
      <AnimatePresence initial={false}>
        {expanded && hasRest && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className={expandedGrid}>
              {rest.map((item, i) => {
                const accent = accents[(FEATURED_COUNT + i) % accents.length]
                return (
                  <motion.div
                    key={`${cat.key}-rest-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <ProductCardCompact
                      name={item.name}
                      description={item.desc}
                      photo={cat.itemImagesByIndex?.[FEATURED_COUNT + i] ?? cat.itemImages?.[item.name] ?? cat.photo}
                      accent={accent}
                      pideYaLabel={pideYaLabel}
                      orderHref={UBER_EATS_URL}
                      imageShape={cat.imageShape}
                      overflow={cat.key === 'milkshakes'}
                      noImageShadowOnHover={cat.key !== 'cheesecakes'}
                    />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand toggle */}
      {hasRest && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group/cta press focus-ring inline-flex items-center gap-2 font-body font-bold uppercase tracking-[0.16em] text-[11px] md:text-[12px] px-6 py-3 rounded-full border-2 border-[#f6eadf]/20 text-[#f6eadf] hover:border-[#e8511b] hover:text-[#e8511b]"
            style={{
              transition:
                'border-color 240ms var(--ease-out), color 240ms var(--ease-out), transform 180ms var(--ease-out)',
            }}
          >
            <MicroCtaContent
              label={expanded ? verMenos : verTodos(cat.items.length)}
              arrow={
                <span
                  className="inline-flex"
                  style={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 320ms var(--ease-out)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              }
            />
          </button>
        </div>
      )}
    </div>
  )
}
