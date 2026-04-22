import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { ProductCard } from '../ui/ProductCard'
import { JellyWave } from '../ui/JellyWave'

const UBER_EATS_URL = 'https://ubereats.com'

/* Brand-consistent accent palette for hover states — warm, edible, non-generic. */
const ACCENTS = {
  // One accent per cookie, in the same order as m.items.cookies:
  // NY Classic, Oreo, Lotus, Pistacchio, Kinder, Red Velvet, Dinosaurus, Triple Choc
  cookies:     ['#c97f3a', '#d9cfc2', '#d49856', '#b5c47a', '#ead7b8', '#d16a5a', '#f0d890', '#a56b47'],
  // Flat list spanning both cheesecake subgroups in order:
  // Horno: Clásica, Oreo, Pistacchio, Lotus, Kinder · Mousse: Fresa, Oreo, Pistacchio, Lotus
  cheesecakes: ['#f0e3cf', '#d9cfc2', '#b5c47a', '#d49856', '#ead7b8', '#eab0bd', '#d9cfc2', '#b5c47a', '#d49856'],
  // Order: Vainilla, Chocolate, Fresa, Oreo, Lotus, Dinosaurus
  milkshakes:  ['#f6eadf', '#a56b47', '#eab0bd', '#d9cfc2', '#d49856', '#f0d890'],
  // Order: Café Latte, French Vainilla, Oreo, Lotus, Mocha, Mocha White, Matcha, Chai
  otros:       ['#d9b88e', '#ead7b8', '#d9cfc2', '#d49856', '#a56b47', '#ead0c8', '#b5c47a', '#e8a45c'],
} as const

export function MenuSection() {
  const { t } = useLanguage()
  const m = t.menu

  const categories = [
    {
      key: 'cookies' as const,
      eyebrow: 'Heartmade',
      title: m.cookies.title,
      description: m.cookies.description,
      items: m.items.cookies,
      photo: '/assets/svg/sticker_cookies.svg',
    },
    {
      key: 'cheesecakes' as const,
      eyebrow: 'Creamy',
      title: m.cheesecakes.title,
      description: m.cheesecakes.description,
      groups: m.items.cheesecakes,
      photo: '/assets/svg/sticker_cheesecake.svg',
    },
    {
      key: 'milkshakes' as const,
      eyebrow: 'Heartmade',
      title: m.milkshakes.title,
      description: m.milkshakes.description,
      items: m.items.milkshakes,
      photo: '/assets/svg/sticker_milkshake.svg',
      tallSticker: true,
    },
    {
      key: 'otros' as const,
      eyebrow: 'Heartmade',
      title: m.otros.title,
      description: m.otros.description,
      items: m.items.otros,
      photo: '/assets/svg/sticker_icedcoffee.svg',
      tallSticker: true,
    },
  ]

  return (
    <section
      id="menu"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#320e10' }}
    >
      {/* Section intro — just the eyebrow, headline removed */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-12 md:pb-16">
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

      {/* Category groups — each category has its own title + description + a stack of product cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-16 sm:pb-24 md:pb-32 flex flex-col gap-14 sm:gap-24 md:gap-32">
        {categories.map((cat) => (
          <div key={cat.key} className="flex flex-col gap-6 sm:gap-10 md:gap-14">
            {/* Category header */}
            <motion.header
              className="flex flex-col max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {cat.key === 'cookies' || cat.key === 'cheesecakes' ? (
                <img
                  src={`/assets/svg/${cat.key}_title.svg`}
                  alt={`${cat.eyebrow} ${cat.title}`}
                  className="w-auto h-[56px] sm:h-[80px] md:h-[128px] lg:h-[160px] self-start mb-4 sm:mb-6 md:mb-8"
                />
              ) : (
                <>
                  <span className="font-display text-[20px] md:text-[26px] leading-none text-[#e8511b] -rotate-3 -mb-4 md:-mb-6 self-start pl-2 md:pl-6">
                    {cat.eyebrow}
                  </span>
                  <h3 className="font-gulp font-normal lowercase text-[64px] sm:text-[88px] md:text-[140px] lg:text-[180px] leading-[0.9] tracking-[-0.02em] text-[#f6eadf] mb-4 sm:mb-6 md:mb-8">
                    {cat.title}
                  </h3>
                </>
              )}
              <p className="font-body text-[15px] md:text-[17px] leading-[1.7] text-[#f6eadf]/65 max-w-[52ch] text-pretty">
                {cat.description}
              </p>
            </motion.header>

            {/* Product cards — grouped (cheesecakes) or flat (others).
                Tall-sticker categories need more vertical gap because the image protrudes; wide-sticker categories keep a tighter rhythm. */}
            {'groups' in cat ? (
              <div className="flex flex-col gap-10 sm:gap-16 md:gap-24">
                {cat.groups.map((group, gi) => {
                  const offset = cat.groups
                    .slice(0, gi)
                    .reduce((sum, g) => sum + g.items.length, 0)
                  return (
                    <div key={group.title} className="flex flex-col gap-5 sm:gap-8 md:gap-10">
                      <motion.h4
                        className="font-display text-[28px] sm:text-[36px] md:text-[48px] leading-none text-[#e8511b] self-start"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        {group.title}
                      </motion.h4>
                      <div className="flex flex-col gap-8 sm:gap-16 md:gap-20">
                        {group.items.map((item, i) => {
                          const globalI = offset + i
                          const imageSide: 'left' | 'right' = globalI % 2 === 0 ? 'left' : 'right'
                          const accent = ACCENTS[cat.key][globalI % ACCENTS[cat.key].length]
                          return (
                            <motion.div
                              key={`${group.title}-${item.name}`}
                              initial={{ opacity: 0, y: 24 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.15 }}
                              transition={{
                                duration: 0.6,
                                delay: i * 0.06,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              }}
                            >
                              <ProductCard
                                name={item.name}
                                description={item.desc}
                                photo={cat.photo}
                                imageSide={imageSide}
                                accent={accent}
                                tallSticker={false}
                                pideYaLabel={m.pideYa}
                                orderHref={UBER_EATS_URL}
                              />
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div
                className={`flex flex-col ${
                  'tallSticker' in cat && cat.tallSticker
                    ? 'gap-10 sm:gap-20 md:gap-28'
                    : 'gap-8 sm:gap-16 md:gap-20'
                }`}
              >
                {cat.items.map((item, i) => {
                  const imageSide: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right'
                  const accent = ACCENTS[cat.key][i % ACCENTS[cat.key].length]
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.06,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <ProductCard
                        name={item.name}
                        description={item.desc}
                        photo={cat.photo}
                        imageSide={imageSide}
                        accent={accent}
                        tallSticker={'tallSticker' in cat ? cat.tallSticker : false}
                        pideYaLabel={m.pideYa}
                        orderHref={UBER_EATS_URL}
                      />
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <JellyWave fill="#e8511b" height={140} />
    </section>
  )
}
