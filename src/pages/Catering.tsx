import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../lib/i18n'
import { JellyWave } from '../components/ui/JellyWave'
import { MicroCtaContent } from '../components/ui/MicroCtaContent'
import { Button } from '../components/ui/Button'
import { EASE_ENTRANCE } from '../lib/motion'

const WHATSAPP_NUMBER = '34603919473'
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Beikit! Me gustaría información sobre catering para mi evento.')}`
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? ''

type FormData = {
  nombre: string
  email: string
  telefono?: string
  tipoEvento: string
  fecha: string
  personas: string
  productos: string[]
  mensaje?: string
  privacidad: boolean
}

const EASE = EASE_ENTRANCE

// ---------------------------------------------------------------------------
// Catering Hero — centered power composition with framing stickers (Home line)
// ---------------------------------------------------------------------------
function CateringHero() {
  const { t, lang } = useLanguage()
  const h = t.catering.hero
  // CA star word ("el teu event" — 12 chars) is wider than ES ("tu evento" — 9 chars).
  // Tighten the clamp so it doesn't bleed past the safe container on desktop/tablet.
  const starSize = lang === 'ca'
    ? 'clamp(2.4rem, 9.5vw, 9rem)'
    : 'clamp(3.2rem, 12vw, 11.5rem)'
  const sideSize = lang === 'ca'
    ? 'clamp(2.2rem, 6.8vw, 6.2rem)'
    : 'clamp(2.6rem, 8vw, 7.4rem)'

  return (
    <section className="relative bg-dark overflow-hidden flex flex-col min-h-[92vh] md:min-h-[88vh]">

      {/* Warm ambient glow — behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[1000px] h-[650px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.12) 0%, rgba(232,81,27,0.06) 40%, transparent 72%)' }}
        aria-hidden="true"
      />

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-10 lg:px-16 pt-[110px] md:pt-[120px] pb-10">

        <div className="relative w-full max-w-[1200px] mx-auto flex flex-col items-center">

          {/* Eyebrow — script + small caps (mirrors Home) */}
          <motion.span
            className="flex items-center gap-2.5 mb-5 md:mb-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            <span className="font-display text-[22px] md:text-[26px] text-yellow leading-none -rotate-3 translate-y-[1px]">
              Heartmade
            </span>
            <span className="font-body font-bold text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-cream leading-none">
              Catering
            </span>
          </motion.span>

          {/* Headline — centered 3-line with star word */}
          <h1 className="relative z-10 text-center" aria-label={h.title}>
            <motion.span
              className="block font-body font-bold uppercase text-cream leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: sideSize }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {h.headlineLines.line1}
            </motion.span>

            <motion.span
              className="block font-body font-bold uppercase text-cream leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: starSize }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {h.headlineLines.line2}
            </motion.span>

            <motion.span
              className="flex items-baseline justify-center gap-[0.22em] font-body font-bold uppercase text-cream leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: sideSize }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              {h.headlineLines.line3}
              <span
                aria-hidden="true"
                translate="no"
                className="inline-block select-none align-baseline mx-[0.10em]"
                style={{
                  height: '0.82em',
                  width: '2.74em',
                  backgroundColor: '#e8511b',
                  WebkitMaskImage: 'url(/assets/svg/logo_beikit.svg)',
                  maskImage: 'url(/assets/svg/logo_beikit.svg)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              />
              <span className="sr-only">beikit</span>
            </motion.span>
          </h1>

        </div>

        {/* Sub-copy + CTAs */}
        <motion.div
          className="relative z-30 w-full max-w-[640px] mx-auto mt-10 md:mt-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        >
          <p className="font-body text-[15px] md:text-[17px] text-cream/80 leading-relaxed text-center max-w-[480px]">
            {h.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="yellow"
              focusOnDark
              href="#catering-form"
              className="group/cta text-[12px] md:text-[13px] tracking-[0.12em] px-6 md:px-8 py-3.5 md:py-4 gap-2 shadow-[0_10px_32px_-6px_rgba(248,177,20,0.50)]"
            >
              <MicroCtaContent
                label={h.cta}
                arrow={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                }
              />
            </Button>
            <Button
              variant="outline-cream"
              focusOnDark
              href={WHATSAPP_HREF}
              external
              className="border-cream/30 hover:bg-whatsapp hover:text-white hover:border-whatsapp text-[12px] md:text-[13px] tracking-[0.12em] px-6 md:px-8 py-3.5 md:py-4 gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {h.ctaSecondary}
            </Button>
          </div>

          <p className="font-body text-[12px] md:text-[12px] text-cream/75 tracking-[0.06em]">
            {h.reassurance}
          </p>
        </motion.div>
      </div>

      {/* JellyWave to cream — dual to echo Home hero */}
      <JellyWave dual fill="#f6eadf" fillAccent="#e8511b" height={180} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Valores — editorial split: story + signature + inline values row
// ---------------------------------------------------------------------------
function ValoresSection() {
  const { t } = useLanguage()
  const v = t.catering.valores

  return (
    <section className="relative bg-cream overflow-hidden">

      {/* Warm glows */}
      <div
        className="absolute top-[8%] left-[10%] w-[560px] h-[560px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.08) 0%, rgba(232,81,27,0.03) 40%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[18%] right-[8%] w-[420px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,81,27,0.05) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-36">

        {/* Editorial split — photo + story */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 md:gap-14 lg:gap-20 items-stretch">

          {/* Left — photo */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div
              className="absolute -inset-6 md:-inset-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(248,177,20,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-[0_24px_64px_-14px_rgba(50,14,16,0.24),0_10px_28px_-10px_rgba(50,14,16,0.12)] lg:h-full">
              <div
                className="aspect-[5/4] lg:aspect-auto lg:h-full relative"
                style={{ background: 'radial-gradient(ellipse at 30% 30%, #5c2d2e 0%, #3b1315 45%, #2a0c0e 100%)' }}
              >
                {/* Sticker composition — cheesecake top right, cookies bottom left, milkshake mid */}
                <img
                  src="/assets/svg/sticker_cheesecake.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-[6%] right-[-6%] w-[60%] max-w-[320px] opacity-[0.42] rotate-[8deg] drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                />
                <img
                  src="/assets/svg/sticker_cookies.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute bottom-[-4%] left-[-8%] w-[72%] max-w-[360px] opacity-[0.48] -rotate-[6deg] drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                />
                <img
                  src="/assets/svg/sticker_milkshake.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-[42%] right-[18%] w-[32%] max-w-[160px] opacity-[0.35] rotate-[-4deg] drop-shadow-[0_18px_40px_rgba(0,0,0,0.40)] select-none pointer-events-none"
                />

                {/* Warm grain overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay"
                  style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(248,177,20,0.22) 0%, transparent 55%)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(50,14,16,0.40) 0%, rgba(50,14,16,0.10) 40%, transparent 72%)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Floating chip — top left */}
              <motion.div
                className="absolute top-4 left-4 md:top-6 md:left-6 bg-dark/85 backdrop-blur-sm rounded-full px-4 py-2 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.30)]"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
              >
                <span className="font-body font-bold text-[10px] tracking-[0.22em] uppercase text-yellow">
                  · Eventos & Corporativo
                </span>
              </motion.div>

              {/* Floating chip — bottom right */}
              <motion.div
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-cream/92 backdrop-blur-sm rounded-md px-4 py-2.5 shadow-[0_4px_16px_-4px_rgba(50,14,16,0.15)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
              >
                <span className="font-body font-bold text-[11px] tracking-[0.18em] uppercase text-orange">
                  Heartmade Everyday
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — story */}
          <div className="flex flex-col order-1 lg:order-2 lg:py-4">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-7"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            >
              <span className="block w-10 h-[3px] bg-orange rounded-full" />
              <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">
                {v.tag}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="font-display text-[34px] md:text-[44px] lg:text-[54px] leading-[1.08] text-dark mb-7 text-balance"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
            >
              {v.title}
            </motion.h2>

            <motion.div
              className="w-14 h-[3px] bg-orange rounded-full mb-7"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.div
              className="flex flex-col gap-5 mb-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            >
              <p className="font-body text-[15px] md:text-[16px] leading-[1.8] text-dark/75">{v.body1}</p>
              <p className="font-body text-[15px] md:text-[16px] leading-[1.8] text-dark/75">{v.body2}</p>
            </motion.div>

            {/* Signature */}
            <motion.div
              className="pt-7 border-t border-dark/10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.52, ease: EASE }}
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0 w-[58px] h-[58px]">
                  <div
                    className="absolute -inset-2 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,81,27,0.12) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <img src="/assets/svg/Vector.svg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(50,14,16,0.15)]" />
                  <img src="/assets/svg/Group.svg" alt="Beikit" className="absolute inset-0 w-[50%] h-[50%] m-auto object-contain" />
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-[26px] md:text-[30px] leading-none text-dark -rotate-[1.5deg]">
                    Juan &amp; Anna
                  </span>
                  <span className="font-body text-[12px] text-dark/50 tracking-[0.06em] mt-1.5 italic">
                    Fundadores, Beikit Bakery
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave to dark Pasos */}
      <JellyWave fill="#320e10" height={140} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Pasos — connected timeline with warm glow number markers
// ---------------------------------------------------------------------------
function PasosSection() {
  const { t } = useLanguage()
  const p = t.catering.pasos

  return (
    <section className="relative bg-cream overflow-hidden">

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,81,27,0.06) 0%, rgba(248,177,20,0.04) 40%, transparent 72%)' }}
        aria-hidden="true"
      />

<div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col gap-16">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
            <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">{p.tag}</span>
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
          </div>
          <h2 className="font-display text-[42px] md:text-[60px] lg:text-[72px] leading-[1.02] text-dark">{p.title}</h2>
          <p className="font-body text-[15px] md:text-[16px] text-dark/72 leading-relaxed max-w-xl">
            {p.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal dashed rail — desktop only, behind numbers */}
          <div
            className="hidden md:block absolute left-[7%] right-[7%] top-[27px] pointer-events-none"
            style={{
              height: '2px',
              backgroundImage: 'linear-gradient(to right, rgba(50,14,16,0.25) 50%, transparent 50%)',
              backgroundSize: '12px 2px',
              backgroundRepeat: 'repeat-x',
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-10 lg:gap-12 relative">
            {p.steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-5 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              >
                {/* Number marker with warm glow — on top of rail */}
                <div className="relative w-14 h-14">
                  <div
                    className="absolute inset-[-8px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,81,27,0.18) 0%, transparent 68%)' }}
                    aria-hidden="true"
                  />
                  <div className="relative w-14 h-14 rounded-full border-2 border-orange flex items-center justify-center bg-cream shadow-[0_6px_18px_-4px_rgba(232,81,27,0.30)]">
                    <span className="font-display text-[22px] leading-none text-orange translate-y-[1px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <span className="font-body font-bold text-[11px] tracking-[0.22em] uppercase text-orange leading-none">
                    {step.time}
                  </span>
                  <h3 className="font-body font-bold text-[16px] md:text-[17px] text-dark leading-snug">{step.title}</h3>
                  <p className="font-body text-[14px] text-dark/72 leading-[1.7]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <JellyWave fill="#320e10" height={140} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Productos — featured hero card + grid with product photos
// ---------------------------------------------------------------------------
type ProductCard = {
  badge?: string
  title: string
  desc: string
  pills: readonly string[]
}

// Definitive product photos — one representative per family (keyed by title,
// identical in ES and CA).
const PRODUCT_PHOTOS: Record<string, string> = {
  Cheesecakes: '/assets/images/clasicaporcion.webp',
  Cookies: '/assets/images/nyclassic.webp',
  Milkshakes: '/assets/images/milkshake_vanilla.webp',
  Lattes: '/assets/images/cafelatte.webp',
}

function photoFor(title: string) {
  return PRODUCT_PHOTOS[title] || PRODUCT_PHOTOS.Cookies
}

// Per-family image footprint inside the 4:3 media zone. The wide cheesecake
// slice fills the zone easily so it needs a smaller cap; the tall latte
// glasses need a larger cap to read big. (Milkshakes use a full-bleed photo.)
const PRODUCT_IMAGE_SIZE: Record<string, string> = {
  Cheesecakes: 'max-w-[72%] max-h-[76%]',
  Cookies:     'max-w-[88%] max-h-[90%]',
  Lattes:      'max-w-[96%] max-h-full',
}
function imageSizeFor(title: string) {
  return PRODUCT_IMAGE_SIZE[title] || 'max-w-[88%] max-h-[90%]'
}

function ProductoCardBlock({ card, i }: { card: ProductCard; i: number }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl flex flex-col h-full bg-surface-dark border border-cream/10 hover:border-orange/40 hover:shadow-[0_20px_48px_-14px_rgba(232,81,27,0.22)]"
      style={{ transition: 'border-color 240ms var(--ease-out), box-shadow 240ms var(--ease-out)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
    >
      {/* Media — definitive product photo on the warm card surface */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {/* Warm radial light behind the product */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 44%, rgba(248,177,20,0.16) 0%, rgba(232,81,27,0.07) 42%, transparent 72%)' }}
          aria-hidden="true"
        />
        {/* Product photo — large and dominant, for appetite appeal.
            Milkshakes ship as a framed portrait photo; the rest are cutouts. */}
        <div className="absolute inset-0 flex items-center justify-center">
          {card.title === 'Milkshakes' ? (
            <img
              src={photoFor(card.title)}
              alt=""
              loading="lazy"
              className="h-[88%] w-auto object-contain rounded-xl drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] group-hover:scale-[1.06] select-none pointer-events-none"
              style={{ transition: 'transform 600ms var(--ease-out)' }}
            />
          ) : (
            <img
              src={photoFor(card.title)}
              alt=""
              loading="lazy"
              className={`w-auto h-auto ${imageSizeFor(card.title)} object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] group-hover:scale-[1.06] select-none pointer-events-none`}
              style={{ transition: 'transform 600ms var(--ease-out)' }}
            />
          )}
        </div>
        {/* Hairline separator at bottom of media */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-cream/10" aria-hidden="true" />

        {card.badge && (
          <span className="absolute top-4 left-4 font-body font-bold text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35)] bg-yellow text-dark">
            {card.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
        <h3 className="font-body font-bold uppercase tracking-[-0.01em] leading-[1.05] text-[20px] md:text-[22px] text-cream">
          {card.title}
        </h3>
        <p
          className="font-body text-[14px] leading-[1.65] text-cream/80 line-clamp-3"
          style={{ minHeight: 'calc(1.65em * 3)' }}
        >
          {card.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {card.pills.map((pill, j) => (
            <span
              key={j}
              className="font-body text-[11px] px-3 py-1.5 rounded-full border border-cream/20 text-cream/80"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function ProductosSection() {
  const { t } = useLanguage()
  const p = t.catering.productos

  return (
    <section id="catering-productos" className="relative bg-dark overflow-hidden scroll-mt-[96px]">

      <div
        className="absolute bottom-0 left-0 w-[520px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(232,81,27,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[8%] right-[4%] w-[380px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col gap-14">

        <motion.div
          className="flex flex-col gap-4 max-w-3xl"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-4">
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
            <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">{p.tag}</span>
          </div>
          <h2 className="font-display text-[42px] md:text-[60px] lg:text-[70px] leading-[1.02] text-cream">{p.title}</h2>
          <p className="font-body text-[15px] md:text-[16px] text-cream/75 leading-relaxed max-w-xl">
            {p.intro}
          </p>
        </motion.div>

        {/* Equal-height 2×2 grid — 4 product families (Cheesecakes, Cookies, Milkshakes, Lattes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {p.cards.map((card, i) => (
            <ProductoCardBlock key={i} card={card as ProductCard} i={i} />
          ))}
        </div>
      </div>

      <JellyWave fill="#f6eadf" height={140} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Form section — redesigned: chip-based selectors, sectioned layout, reduced friction.
// ---------------------------------------------------------------------------
function FormSection() {
  const { t } = useLanguage()
  const f = t.catering.form
  const navigate = useNavigate()
  const [serverError, setServerError] = useState(false)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: 'onBlur', shouldFocusError: true })

  const onInvalid = (errs: Record<string, unknown>) => {
    const first = Object.keys(errs)[0] as keyof FormData | undefined
    if (first) setFocus(first)
  }

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const onSubmit = async (data: FormData) => {
    setServerError(false)
    if (!FORMSPREE_ENDPOINT) {
      if (import.meta.env.DEV) {
        console.warn('[Catering] VITE_FORMSPREE_ENDPOINT no configurado; se omite la petición de red.')
        navigate('/gracias')
        return
      }
      setServerError(true)
      return
    }
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        navigate('/gracias')
      } else {
        setServerError(true)
      }
    } catch {
      setServerError(true)
    }
  }

  const inputBase =
    'form-field w-full font-body text-[15px] text-cream bg-surface-dark border border-cream/15 rounded-md px-5 py-4 outline-none focus-visible:border-orange focus-visible:ring-2 focus-visible:ring-orange/30 placeholder:text-cream/55'
  const inputError =
    'form-field w-full font-body text-[15px] text-cream bg-surface-dark border border-error rounded-md px-5 py-4 outline-none focus-visible:border-error focus-visible:ring-2 focus-visible:ring-error/30 placeholder:text-cream/55'

  // Reusable chip styles for radio/checkbox groups (peer pattern)
  const chipBase =
    'block text-center font-body text-[14px] py-3 px-4 rounded-full bg-surface-dark border border-cream/15 text-cream/75 peer-checked:border-orange peer-checked:text-cream peer-checked:bg-orange/15 peer-checked:font-bold peer-focus-visible:ring-2 peer-focus-visible:ring-orange/30 hover:border-cream/30 cursor-pointer'

  // Visual asterisk + screen-reader-only "(obligatorio)" for required fields.
  const requiredMark = (
    <>
      <span aria-hidden="true" className="text-orange"> *</span>
      <span className="sr-only"> ({f.requiredField})</span>
    </>
  )

  return (
    <section id="catering-form" className="bg-dark relative overflow-hidden scroll-mt-[96px]">

      {/* Warm glow behind form */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[680px] h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.10) 0%, rgba(232,81,27,0.04) 45%, transparent 72%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col gap-12 md:gap-14">

        {/* Header */}
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
            <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">{f.tag}</span>
          </div>
          <h2 className="font-display text-[42px] md:text-[60px] leading-[1.02] text-cream">{f.title}</h2>
          <p className="font-body text-[15px] md:text-[16px] text-cream/70 leading-[1.65] max-w-lg">
            {f.intro}
          </p>

          {/* Reassurance bar */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-2">
            {f.reassurance.map((r, i) => (
              <li key={i} className="inline-flex items-center gap-2 font-body text-[12px] text-cream/75">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f8b114" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
          className="flex flex-col gap-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {/* Nombre */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="cat-nombre" className="font-body font-bold text-[13px] text-cream">{f.nombre}{requiredMark}</label>
            <input
              id="cat-nombre"
              type="text"
              autoComplete="name"
              aria-invalid={errors.nombre ? 'true' : undefined}
              className={errors.nombre ? inputError : inputBase}
              {...register('nombre', { required: f.required })}
            />
            {errors.nombre && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.nombre.message}</span>}
          </div>

          {/* Email + Teléfono (teléfono opcional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2.5">
              <label htmlFor="cat-email" className="font-body font-bold text-[13px] text-cream">{f.email}{requiredMark}</label>
              <input
                id="cat-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                aria-invalid={errors.email ? 'true' : undefined}
                className={errors.email ? inputError : inputBase}
                {...register('email', {
                  required: f.required,
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: f.emailError },
                })}
              />
              {errors.email && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2.5">
              <label htmlFor="cat-telefono" className="font-body font-bold text-[13px] text-cream">
                {f.telefono} <span className="font-normal text-cream/55">{f.telefonoOptional}</span>
              </label>
              <input
                id="cat-telefono"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder={f.placeholderPhone}
                aria-invalid={errors.telefono ? 'true' : undefined}
                className={errors.telefono ? inputError : inputBase}
                {...register('telefono', {
                  pattern: { value: /^\+?[\d\s-]{9,}$/, message: f.phoneError },
                })}
              />
              {errors.telefono && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.telefono.message}</span>}
            </div>
          </div>

          {/* Tipo evento — chips */}
          <div className="flex flex-col gap-2.5">
            <span id="cat-tipoEvento-label" className="font-body font-bold text-[13px] text-cream">{f.tipoEvento}{requiredMark}</span>
            <div role="radiogroup" aria-labelledby="cat-tipoEvento-label" className="flex flex-wrap gap-2">
              {f.eventTypes.map((type) => (
                <label key={type} className="relative cursor-pointer">
                  <input
                    type="radio"
                    value={type}
                    className="peer sr-only"
                    {...register('tipoEvento', { required: f.requiredSelect })}
                  />
                  <span
                    className={chipBase}
                    style={{ transition: 'border-color 200ms var(--ease-out), background-color 200ms var(--ease-out), color 200ms var(--ease-out)' }}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
            {errors.tipoEvento && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.tipoEvento.message}</span>}
          </div>

          {/* Fecha + Personas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2.5">
              <label htmlFor="cat-fecha" className="font-body font-bold text-[13px] text-cream">{f.fecha}{requiredMark}</label>
              <input
                id="cat-fecha"
                type="date"
                min={today}
                aria-invalid={errors.fecha ? 'true' : undefined}
                className={errors.fecha ? inputError : inputBase}
                {...register('fecha', {
                  required: f.required,
                  validate: (v) => v >= today || f.dateError,
                })}
              />
              {errors.fecha && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.fecha.message}</span>}
            </div>
            <div className="flex flex-col gap-2.5">
              <span id="cat-personas-label" className="font-body font-bold text-[13px] text-cream">{f.personas}{requiredMark}</span>
              <div role="radiogroup" aria-labelledby="cat-personas-label" className="flex flex-wrap gap-2">
                {f.personasOptions.map((opt) => (
                  <label key={opt} className="relative cursor-pointer">
                    <input
                      type="radio"
                      value={opt}
                      className="peer sr-only"
                      {...register('personas', { required: f.requiredSelect })}
                    />
                    <span
                      className={chipBase}
                      style={{ transition: 'border-color 200ms var(--ease-out), background-color 200ms var(--ease-out), color 200ms var(--ease-out)' }}
                    >
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
              {errors.personas && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.personas.message}</span>}
            </div>
          </div>

          {/* Productos — multi-select chips, required (con "No lo sé aún" como opt-out semántico) */}
          <div className="flex flex-col gap-2.5">
            <span id="cat-productos-label" className="font-body font-bold text-[13px] text-cream">{f.productos}{requiredMark}</span>
            <span className="font-body text-[13px] text-cream/70 -mt-1">{f.productosHelp}</span>
            <div role="group" aria-labelledby="cat-productos-label" className="flex flex-wrap gap-2">
              {f.productosOptions.map((opt) => (
                <label key={opt} className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    value={opt}
                    className="peer sr-only"
                    {...register('productos', {
                      validate: (v) => (Array.isArray(v) && v.length > 0) || f.requiredSelect,
                    })}
                  />
                  <span
                    className={chipBase}
                    style={{ transition: 'border-color 200ms var(--ease-out), background-color 200ms var(--ease-out), color 200ms var(--ease-out)' }}
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>
            {errors.productos && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.productos.message as string}</span>}
          </div>

          {/* Mensaje — opcional */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="cat-mensaje" className="font-body font-bold text-[13px] text-cream">
              {f.mensaje} <span className="font-normal text-cream/55">{f.mensajeOptional}</span>
            </label>
            <textarea
              id="cat-mensaje"
              rows={3}
              placeholder={f.placeholderMensaje}
              className={`${inputBase} resize-none`}
              {...register('mensaje')}
            />
          </div>

          {/* Privacidad checkbox */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-orange flex-shrink-0 rounded"
                {...register('privacidad', { required: f.required })}
              />
              <span
                className="font-body text-[13px] text-cream/75 group-hover:text-cream"
                style={{ transition: 'color 200ms var(--ease-out)' }}
              >
                {f.privacidadPre}
                <a
                  href="/privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="focus-ring rounded-[2px] font-bold underline underline-offset-2 decoration-orange/60 text-cream hover:decoration-orange"
                  style={{ transition: 'text-decoration-color 200ms var(--ease-out)' }}
                >
                  {f.privacidadLink}
                </a>
                {requiredMark}
              </span>
            </label>
            {errors.privacidad && <span role="alert" aria-live="polite" className="font-body text-[12px] text-error">{errors.privacidad.message}</span>}
          </div>

          {/* Server error */}
          {serverError && (
            <p role="alert" aria-live="polite" className="font-body text-[13px] text-error bg-error/10 rounded-md px-6 py-4 border border-error/30">
              {f.errorMsg}
            </p>
          )}

          {/* Submit */}
          <div className="flex flex-col gap-5 mt-2">
            <Button
              variant="orange"
              type="submit"
              disabled={isSubmitting}
              className="submit-cta group text-[13px] tracking-[0.14em] px-8 py-5 gap-3 w-full disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_12px_32px_-8px_rgba(232,81,27,0.55),0_2px_6px_-1px_rgba(232,81,27,0.25)]"
            >
              <span>{isSubmitting ? f.sending : f.submit}</span>
              {!isSubmitting && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="submit-cta-arrow"
                  style={{ transition: 'transform 220ms var(--ease-out)' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </Button>

            {/* WhatsApp fallback — secondary, low-emphasis */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="press focus-ring font-body text-[13px] text-cream/70 hover:text-whatsapp inline-flex items-center justify-center gap-2 self-center"
              style={{ transition: 'color 200ms var(--ease-out)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {f.whatsappFallback}
            </a>
          </div>

          <p className="font-body text-[12px] text-cream/70 text-center leading-relaxed">{f.note}</p>
        </motion.form>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Info — essential KPIs (20 pax · 7 días · 30 km · 48h)
// ---------------------------------------------------------------------------
function InfoSection() {
  const { t } = useLanguage()
  const info = t.catering.info

  return (
    <section className="relative bg-dark overflow-hidden">
      <div
        className="absolute top-[10%] right-[6%] w-[420px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(248,177,20,0.10) 0%, rgba(232,81,27,0.04) 45%, transparent 72%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24 flex flex-col gap-12">
        <motion.div
          className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
            <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">{info.tag}</span>
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
          </div>
          <h2 className="font-display text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] text-cream">{info.title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {info.cards.map((card, i) => (
            <motion.div
              key={i}
              className="relative bg-surface-dark rounded-lg p-6 md:p-7 border border-cream/10 hover:border-orange/40 hover:shadow-[0_16px_40px_-12px_rgba(232,81,27,0.25)] flex flex-col gap-2.5"
              style={{ transition: 'border-color 240ms var(--ease-out), box-shadow 240ms var(--ease-out), transform 240ms var(--ease-out)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[44px] md:text-[54px] leading-none text-yellow">{card.kpi}</span>
                <span className="font-body font-bold text-[12px] tracking-[0.12em] uppercase text-cream/55">{card.unit}</span>
              </div>
              <span className="font-body font-bold text-[14px] md:text-[15px] text-cream leading-snug">{card.label}</span>
              <span className="font-body text-[13px] md:text-[13px] text-cream/70 leading-[1.55]">{card.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <JellyWave fill="#f6eadf" height={140} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// MidCta — halfway conversion nudge with WhatsApp fallback
// ---------------------------------------------------------------------------
function MidCtaSection() {
  const { t } = useLanguage()
  const m = t.catering.midcta

  return (
    <section className="relative bg-cream py-20 md:py-24 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(248,177,20,0.10) 0%, rgba(232,81,27,0.04) 45%, transparent 72%)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-7 text-center bg-white/60 backdrop-blur-sm rounded-xl p-10 md:p-14 border border-dark/8 shadow-[0_20px_48px_-18px_rgba(50,14,16,0.18)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2 className="font-display text-[32px] md:text-[46px] lg:text-[54px] leading-[1.04] text-dark">
          {m.title}
        </h2>
        <p className="font-body text-[15px] md:text-[16px] text-dark/70 leading-relaxed max-w-xl">
          {m.sub}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="orange"
            href="#catering-form"
            className="group/cta text-[12px] md:text-[13px] tracking-[0.12em] px-7 md:px-8 py-3.5 md:py-4 gap-2 shadow-[0_10px_28px_-8px_rgba(232,81,27,0.45)]"
          >
            <MicroCtaContent label={m.primary} arrowSize={14} />
          </Button>
          <Button
            variant="outline-dark"
            href={WHATSAPP_HREF}
            external
            className="border-dark/15 hover:border-whatsapp hover:text-whatsapp-ink hover:bg-whatsapp/5 text-[12px] md:text-[13px] tracking-[0.12em] px-7 md:px-8 py-3.5 md:py-4 gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {m.whatsapp}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FAQ — expandable cards, FAQPage schema in page head
// ---------------------------------------------------------------------------
function FaqSection() {
  const { t } = useLanguage()
  const f = t.catering.faq
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="catering-faq" className="relative bg-cream overflow-hidden scroll-mt-[96px]">
      <div
        className="absolute top-[12%] left-[6%] w-[420px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,81,27,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col gap-12">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[3px] bg-orange rounded-full" />
            <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">{f.tag}</span>
          </div>
          <h2 className="font-display text-[38px] md:text-[54px] lg:text-[62px] leading-[1.04] text-dark">{f.title}</h2>
        </motion.div>

        <ul className="flex flex-col gap-3">
          {f.items.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.li
                key={i}
                className="bg-white rounded-md border border-dark/8 overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-ring"
                >
                  <span className="font-body font-bold text-[15px] md:text-[16px] text-dark leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-orange/40 flex items-center justify-center text-orange ${isOpen ? 'rotate-45 bg-orange text-white' : ''}`}
                    style={{ transition: 'transform 220ms var(--ease-out), background-color 220ms var(--ease-out), color 220ms var(--ease-out)' }}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </button>
                <div
                  className="grid"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 280ms var(--ease-out)' }}
                >
                  <div className="overflow-hidden">
                    <p className="font-body text-[14px] md:text-[15px] text-dark/72 leading-[1.75] px-6 pb-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>

      <JellyWave fill="#320e10" height={140} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Sticky mobile CTA — appears after user scrolls past hero
// ---------------------------------------------------------------------------
function StickyCta() {
  const { t } = useLanguage()
  const s = t.catering.sticky
  const [show, setShow] = useState(false)
  const [inFormSection, setInFormSection] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setShow(y > 600 && y < max - 600)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Hide sticky CTA when user reaches the form (avoid duplicate CTA).
    // Retry until the form node mounts — StickyCta may mount before FormSection.
    let observer: IntersectionObserver | null = null
    let rafId = 0
    const attach = () => {
      const formEl = document.getElementById('catering-form')
      if (!formEl) {
        rafId = requestAnimationFrame(attach)
        return
      }
      observer = new IntersectionObserver(
        ([entry]) => setInFormSection(entry.isIntersecting),
        { rootMargin: '0px 0px -20% 0px', threshold: 0 }
      )
      observer.observe(formEl)
    }
    attach()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      observer?.disconnect()
    }
  }, [])

  const visible = show && !inFormSection

  return (
    <div
      className={`md:hidden fixed left-3 right-3 bottom-3 z-40 flex gap-2 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[140%] opacity-0 pointer-events-none'}`}
      style={{ transition: 'transform 300ms var(--ease-out), opacity 300ms var(--ease-out)' }}
      aria-hidden={!visible}
      {...(!visible ? { inert: true } : {})}
    >
      <Button
        variant="orange"
        href="#catering-form"
        className="flex-1 text-[12px] tracking-[0.12em] px-4 py-3.5 gap-2 shadow-[0_10px_30px_-6px_rgba(232,81,27,0.55)]"
      >
        {s.label}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Button>
      <Button
        variant="whatsapp"
        href={WHATSAPP_HREF}
        external
        aria-label="WhatsApp"
        className="w-14 shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </Button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export function Catering() {
  const { t, lang } = useLanguage()
  const faqItems = t.catering.faq.items

  const faqJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }), [faqItems])

  const serviceJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Catering',
    provider: {
      '@type': 'Bakery',
      name: 'Beikit Bakery',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C/ Princesa, 10',
        addressLocality: 'Granollers',
        postalCode: '08401',
        addressCountry: 'ES',
      },
      telephone: '+34603919473',
      url: 'https://beikitbakery.com',
    },
    areaServed: { '@type': 'Place', name: 'Granollers y 30 km' },
    description: 'Catering dulce artesano para empresas, bodas y celebraciones desde 20 personas.',
  }), [])

  return (
    <>
      <Helmet>
        <html lang={lang} />
        {/* Not yet launched — reachable by direct URL but kept out of search engines */}
        <meta name="robots" content="noindex" />
        <title>Catering para empresas y eventos en Granollers — Beikit Bakery</title>
        <meta name="description" content="Catering dulce artesano en Granollers y 30 km. Cookies, cheesecakes y coffee breaks para empresas, bodas y celebraciones desde 20 personas. Presupuesto gratis en 48h." />
        <meta property="og:title" content="Catering Beikit — Coffee breaks, bodas y eventos corporativos" />
        <meta property="og:description" content="Repostería americana artesanal para tus eventos. Desde 8€/persona. Presupuesto en 48h. Facturamos a empresas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beikitbakery.com/catering" />
        <link rel="canonical" href="https://beikitbakery.com/catering" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <CateringHero />
      <ValoresSection />
      <ProductosSection />
      <PasosSection />
      <InfoSection />
      <MidCtaSection />
      <FaqSection />
      <FormSection />
      <StickyCta />
    </>
  )
}
