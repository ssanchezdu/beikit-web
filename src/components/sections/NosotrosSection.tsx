import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { JellyWave } from '../ui/JellyWave'
import { EASE_ENTRANCE } from '../../lib/motion'

const EASE = EASE_ENTRANCE

export function NosotrosSection() {
  const { t } = useLanguage()
  const n = t.nosotros

  return (
    <section className="relative bg-cream overflow-hidden">

      {/* Warm ambient glow — behind photo area */}
      <div
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.07) 0%, rgba(232,81,27,0.03) 40%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,81,27,0.04) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 sm:py-24 md:py-32 lg:py-40">

        {/* ── Editorial split: Photo + Story ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-stretch">

          {/* LEFT — Photo of Juan & Anna */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* Warm glow behind photo */}
            <div
              className="absolute -inset-6 md:-inset-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(248,177,20,0.10) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Photo container with warm treatment */}
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(50,14,16,0.20),0_8px_24px_-8px_rgba(50,14,16,0.10)] lg:h-full">
              <div className="aspect-[4/3] sm:aspect-[5/6] lg:aspect-auto lg:h-full">
                <img
                  src="/assets/images/fundadores.webp"
                  alt="Juan y Anna, fundadores de Beikit Bakery, frente a su local en Granollers"
                  width="1100"
                  height="1532"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Story content */}
          <div className="flex flex-col gap-0 lg:py-4">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            >
              <span className="block w-10 h-[3px] bg-orange rounded-full" />
              <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">
                {n.label}
              </span>
            </motion.div>

            {/* Headline — display script for warmth */}
            <motion.h2
              className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[1.1] text-dark mb-6 sm:mb-8 text-balance"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
            >
              {n.headline}
            </motion.h2>

            {/* Accent divider */}
            <motion.div
              className="w-14 h-[3px] bg-orange rounded-full mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Body paragraphs */}
            <motion.div
              className="flex flex-col gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            >
              <p className="font-body text-[15px] leading-[1.8] text-dark/55">{n.body1}</p>
              <p className="font-body text-[15px] leading-[1.8] text-dark/55">{n.body2}</p>
            </motion.div>

            {/* ── Signature block — personal, warm ────────────── */}
            <motion.div
              className="pt-8 border-t border-dark/10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.40, ease: EASE }}
            >
              <div className="flex items-center gap-4">
                {/* Mini portrait — Beikit sunburst B mark as signed seal */}
                <div className="relative flex-shrink-0 w-[60px] h-[60px]">
                  <div
                    className="absolute -inset-2 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,81,27,0.10) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <img
                    src="/assets/svg/Vector.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(50,14,16,0.15)]"
                  />
                  <img
                    src="/assets/svg/Group.svg"
                    alt="Beikit"
                    className="absolute inset-0 w-[50%] h-[50%] m-auto object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  {/* Handwritten signature — Folkies Vantage Script */}
                  <span className="font-display text-[28px] md:text-[32px] leading-none text-dark -rotate-[1.5deg]">
                    Juan & Anna
                  </span>
                  <span className="font-body text-[12px] text-dark/45 tracking-[0.06em] mt-1.5 italic">
                    Fundadores, Beikit Bakery
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Jelly wave → yellow RRSSSection */}
      <JellyWave fill="#f8b114" height={140} />
    </section>
  )
}
