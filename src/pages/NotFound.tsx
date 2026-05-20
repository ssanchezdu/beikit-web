import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../lib/i18n'
import { EASE_ENTRANCE } from '../lib/motion'
import { Button } from '../components/ui/Button'

export function NotFound() {
  const { t } = useLanguage()
  const n = t.notFound

  return (
    <>
      <Helmet>
        <title>404 — Beikit Bakery</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="min-h-[85vh] bg-dark flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

        {/* Warm ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(232,81,27,0.06) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Giant 404 background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-display text-[40vw] leading-none text-cream/[0.04]">
            404
          </span>
        </div>

        {/* Cookie sticker — floating with warm glow */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-[100px] select-none pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="float-b">
            <img src="/assets/svg/sticker_cookies.svg" width="100" height="100" loading="lazy" className="w-full h-auto drop-shadow-xl" alt="" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Milkshake sticker — left side */}
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-[70px] select-none pointer-events-none hidden md:block"
          aria-hidden="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.10, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="float-c">
            <img src="/assets/svg/sticker_milkshake.svg" width="70" height="70" loading="lazy" className="w-full h-auto drop-shadow-xl" alt="" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_ENTRANCE }}
        >
          {/* Orange accent */}
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
            <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">
              Error 404
            </span>
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[52px] md:text-[72px] leading-[1.05] text-cream whitespace-pre-line text-balance">
              {n.title}
            </h1>
            <p className="font-body italic text-[18px] text-cream/40">
              {n.sub}
            </p>
          </div>

          <Button variant="orange" focusOnDark to="/" className="text-[12px] tracking-[0.15em] px-8 py-4 gap-2.5 shadow-[0_8px_24px_-6px_rgba(232,81,27,0.35)]">
            {n.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </motion.div>
      </section>
    </>
  )
}
