import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../lib/i18n'
import { EASE_ENTRANCE } from '../lib/motion'
import { Button } from '../components/ui/Button'

export function Gracias() {
  const { t } = useLanguage()
  const g = t.gracias

  return (
    <>
      <Helmet>
        <title>Solicitud recibida — Beikit Bakery</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="min-h-[85vh] bg-cream flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

        {/* Warm ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(248,177,20,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Background watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]"
          aria-hidden="true"
        >
          <img src="/assets/svg/sticker_cookies.svg" width="600" height="600" loading="lazy" className="w-[600px] h-auto" alt="" aria-hidden="true" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8 max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
        >
          {/* Accent circle with warm glow */}
          <div className="relative">
            <div
              className="absolute inset-[-12px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,81,27,0.10) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center">
              <span className="text-[40px]" role="img" aria-label="Celebración">🎉</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[52px] md:text-[72px] leading-none text-dark">
              {g.title}
            </h1>
            <p className="font-body text-[17px] text-dark/50 leading-relaxed whitespace-pre-line">
              {g.body}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[2px] bg-orange/30 rounded-full" />
            <span className="font-body text-[11px] tracking-[0.2em] uppercase text-orange/50">
              Heartmade Everyday
            </span>
            <span className="block w-8 h-[2px] bg-orange/30 rounded-full" />
          </div>

          <Button variant="dark" to="/" className="text-[12px] tracking-[0.15em] px-8 py-4 gap-2.5 shadow-[0_8px_24px_-6px_rgba(50,14,16,0.25)]">
            {g.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </motion.div>
      </section>
    </>
  )
}
