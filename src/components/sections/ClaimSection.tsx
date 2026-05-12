import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { JellyWave } from '../ui/JellyWave'

export function ClaimSection() {
  const { t } = useLanguage()
  const c = t.claim

  return (
    <section className="relative bg-[#e8511b]">

      {/* Warm ambient glow — golden light from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(248,177,20,0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Giant decorative quotation mark — background */}
      <div
        className="absolute top-4 left-4 md:left-8 lg:left-12 font-display text-[120px] md:text-[180px] leading-none text-[#f6eadf]/[0.12] select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Decorative closing quote — bottom right */}
      <div
        className="absolute bottom-28 right-4 md:right-8 lg:right-12 font-display text-[120px] md:text-[180px] leading-none text-[#f6eadf]/[0.12] select-none pointer-events-none rotate-180"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center gap-5 sm:gap-6 md:gap-8">

        {/* Accent line */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="block w-12 h-[2px] bg-[#f6eadf]/40 rounded-full" />
          <span className="font-body font-bold text-[11px] tracking-[0.3em] uppercase text-[#f6eadf]/70">
            Beikit Bakery
          </span>
          <span className="block w-12 h-[2px] bg-[#f6eadf]/40 rounded-full" />
        </motion.div>

        {/* Quote */}
        <motion.p
          className="font-display text-[22px] sm:text-[28px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#f6eadf] drop-shadow-[0_2px_12px_rgba(50,14,16,0.15)] text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          &ldquo;{c.text}&rdquo;
        </motion.p>

        {/* Tagline */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <span className="block w-8 h-[2px] bg-[#f6eadf]/60 rounded-full" />
          <span className="font-body font-bold text-[12px] tracking-[0.25em] uppercase text-[#f6eadf]">
            {c.tagline}
          </span>
          <span className="block w-8 h-[2px] bg-[#f6eadf]/60 rounded-full" />
        </motion.div>

        {/* Brand mini logo */}
        <motion.div
          className="group relative w-16 h-16 md:w-20 md:h-20 cursor-pointer"
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <img
            src="/assets/svg/Vector.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full brightness-0 invert opacity-30 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100"
            style={{ transition: 'filter 80ms var(--ease-out), opacity 80ms var(--ease-out)' }}
          />
          <img
            src="/assets/svg/Group.svg"
            alt="Beikit"
            className="absolute inset-0 w-[50%] h-[50%] m-auto object-contain brightness-0 invert opacity-60 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100"
            style={{ transition: 'filter 80ms var(--ease-out), opacity 80ms var(--ease-out)' }}
          />
        </motion.div>
      </div>

      {/* Jelly wave → cream NosotrosSection */}
      <JellyWave fill="#f6eadf" height={140} />
    </section>
  )
}
