import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../lib/i18n'
import { JellyWave } from '../ui/JellyWave'

/*
  Donutland-inspired hero: MASSIVE centered headline with product stickers
  framing the text at different z-layers, creating depth and appetite.

  Composition: centered 3-line headline with "HEARTMADE EVERYDAY" eyebrow
  above, sub-copy + CTAs below. Stickers pushed to corners/edges so they
  frame but never cover the headline text.

  Typography: Beatrice SemiBold (font-body font-bold) in uppercase.
*/

const LINE_EASE = [0.25, 0.46, 0.45, 0.94] as const

export function HeroSection() {
  const { t } = useLanguage()
  const h = t.hero
  const n = t.nav

  return (
    <section className="relative bg-[#f6eadf] flex flex-col min-h-screen overflow-x-hidden">

      {/* Warm ambient glow — centered, large */}
      <div className="glow-warm absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Extra warm pulse behind center text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.08) 0%, rgba(232,81,27,0.03) 40%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* ── Main composition ──────────────────────────────────── */}
      {/* flex-1 fills remaining viewport after the 220px JellyWave.
          pt-[88px] = header 72px + 16px breathing (2×8).
          justify-end on md+ pushes content toward the wave for tighter composition. */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-10 lg:px-16 pt-[96px] md:pt-[104px] pb-0">

        {/* ── Centered content block ──────────────────────────── */}
        <div className="relative w-full max-w-[1200px] mx-auto flex flex-col items-center">

          {/* ── Stickers — BEHIND text (z-0) ────────────────────── */}

          {/* Cheesecake — top right corner, clear of headline */}
          <motion.img
            src="/assets/svg/sticker_cheesecake.svg"
            alt="" aria-hidden="true" width="280" height="280"
            className="float-a absolute z-0 right-[2%] sm:right-[1%] md:right-[-6%] lg:right-[-1%] xl:right-[-2%] top-[-8%] sm:top-[-5%] md:top-[-2%] lg:top-[2%] w-[64px] sm:w-[90px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-auto select-none pointer-events-none drop-shadow-[0_16px_40px_rgba(50,14,16,0.12)]"
            initial={{ opacity: 0, y: 40, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.4, ease: LINE_EASE }}
          />

          {/* Iced coffee — top left corner, pushed well clear of headline */}
          <motion.img
            src="/assets/svg/sticker_icedcoffee.svg"
            alt="" aria-hidden="true" width="110" height="110"
            className="float-c absolute z-0 left-[-4%] sm:left-[-3%] md:left-[-9%] lg:left-[-3%] xl:left-[-6%] top-[-6%] sm:top-[-4%] md:top-[-2%] lg:top-[-4%] xl:top-[-8%] w-[48px] sm:w-[58px] md:w-[70px] lg:w-[90px] xl:w-[110px] h-auto select-none pointer-events-none drop-shadow-[0_12px_32px_rgba(50,14,16,0.10)] opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: LINE_EASE }}
          />

          {/* ── Eyebrow: HEARTMADE EVERYDAY — centered above headline ── */}
          <motion.span
            className="flex items-center gap-2.5 mb-5 md:mb-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: LINE_EASE }}
          >
            <span className="font-display text-[22px] md:text-[26px] text-[#e8511b] leading-none -rotate-3 translate-y-[1px]">
              Heartmade
            </span>
            <span className="font-body font-bold text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-[#320e10] leading-none">
              Everyday
            </span>
          </motion.span>

          {/* ── Headline lines — CENTERED ─────────────────────── */}
          <h1 className="relative z-10 text-center" aria-label={h.headline}>
            {/* Line 1 */}
            <motion.span
              className="block font-body font-bold uppercase text-[#320e10] leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 8.5rem)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: LINE_EASE }}
            >
              {h.headlineLines.line1}
            </motion.span>

            {/* Line 2 — the star word */}
            <motion.span
              className="block font-body font-bold uppercase text-[#320e10] leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(3.2rem, 13vw, 12.5rem)' }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: LINE_EASE }}
            >
              {h.headlineLines.line2}
            </motion.span>

            {/* Line 3 — "con"/"amb" + Beikit wordmark (baseline-locked, a11y-clean) */}
            <motion.span
              className="flex items-baseline justify-center gap-[0.2em] font-body font-bold uppercase text-[#320e10] leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 8.5rem)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: LINE_EASE }}
            >
              {h.headlineLines.line3}
              <img
                src="/assets/svg/logo_beikit.svg"
                alt=""
                aria-hidden="true"
                translate="no"
                width="568"
                height="170"
                fetchPriority="high"
                className="h-[0.95em] w-auto select-none"
              />
            </motion.span>
          </h1>

          {/* ── Stickers — IN FRONT of text on md+ ──────────────── */}

          {/* Cookies — bottom left, pushed well into corner */}
          <motion.img
            src="/assets/svg/sticker_cookies.svg"
            alt="" aria-hidden="true" width="300" height="300"
            className="float-b absolute z-0 md:z-20 left-[-6%] sm:left-[-5%] md:left-[-10%] lg:left-[-7%] xl:left-[-12%] bottom-[-20%] sm:bottom-[-16%] md:bottom-[-14%] lg:bottom-[-14%] xl:bottom-[-18%] w-[72px] sm:w-[100px] md:w-[140px] lg:w-[170px] xl:w-[220px] h-auto select-none pointer-events-none drop-shadow-[0_20px_48px_rgba(50,14,16,0.15)]"
            initial={{ opacity: 0, x: -50, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.5, ease: LINE_EASE }}
          />

          {/* Milkshake — bottom right, pushed to corner */}
          <motion.img
            src="/assets/svg/sticker_milkshake.svg"
            alt="" aria-hidden="true" width="200" height="200"
            className="float-c absolute z-0 md:z-20 right-[-4%] sm:right-[-3%] md:right-[-7%] lg:right-[-3%] xl:right-[-9%] bottom-[-12%] sm:bottom-[-10%] md:bottom-[-6%] lg:bottom-[-18%] xl:bottom-[-26%] w-[58px] sm:w-[80px] md:w-[110px] lg:w-[120px] xl:w-[150px] h-auto select-none pointer-events-none drop-shadow-[0_16px_40px_rgba(50,14,16,0.12)]"
            initial={{ opacity: 0, y: 30, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 8 }}
            transition={{ duration: 0.8, delay: 0.55, ease: LINE_EASE }}
          />
        </div>

        {/* ── Sub-copy + CTAs — centered below headline ──────── */}
        <motion.div
          className="relative z-30 w-full max-w-[640px] mx-auto mt-8 md:mt-10 flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: LINE_EASE }}
        >
          {/* Sub-copy — centered, more legible */}
          <p className="font-body text-[15px] md:text-[17px] text-[#320e10]/60 leading-relaxed text-center max-w-[480px]">
            {h.sub}
          </p>

          {/* CTAs — centered row */}
          <div className="flex gap-3">
            <a
              href="https://glovoapp.com"
              target="_blank"
              rel="noreferrer"
              className="press focus-ring font-body font-bold text-[12px] md:text-[13px] tracking-[0.12em] uppercase px-5 md:px-8 py-3.5 md:py-4 rounded-[14px] bg-[#f8b114] text-[#320e10] hover:bg-[#e8a010] inline-flex items-center gap-2 shadow-[0_8px_30px_-4px_rgba(248,177,20,0.45)]"
              style={{ transition: 'transform 160ms var(--ease-out), background-color 200ms var(--ease-out)' }}
            >
              <span>{h.cta}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <Link
              to="/catering"
              className="press focus-ring font-body font-bold text-[12px] md:text-[13px] tracking-[0.12em] uppercase px-5 md:px-8 py-3.5 md:py-4 rounded-[14px] border-2 border-[#320e10] text-[#320e10] hover:bg-[#320e10] hover:text-[#f6eadf] inline-flex items-center justify-center"
              style={{ transition: 'transform 160ms var(--ease-out), background-color 200ms var(--ease-out), color 200ms var(--ease-out)' }}
            >
              {n.catering}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* JellyWave — tall and prominent, bridging to next section */}
      <JellyWave dual fill="#320e10" fillAccent="#e8511b" height={220} />
    </section>
  )
}
