import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { JellyWave } from '../ui/JellyWave'

function OptionIcon({ name }: { name: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'store') {
    return (
      <svg {...common}>
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M4 9v11h16V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  }

  // delivery — truck
  return (
    <svg {...common}>
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}

export function DeliverySection() {
  const { t } = useLanguage()
  const d = t.delivery

  return (
    <section id="delivery" className="relative bg-[#f6eadf] overflow-hidden">

      {/* Warm ambient glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,81,27,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-20 flex flex-col gap-10 sm:gap-14">

        {/* Title block */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-[#e8511b] flex items-center gap-3">
            <span className="block w-8 h-[2px] bg-[#e8511b] rounded-full" />
            {d.eyebrow}
          </span>
          <h2 className="font-body font-bold leading-[0.95] tracking-[-0.02em] text-[#320e10]">
            <span className="block text-[36px] sm:text-[44px] md:text-[68px] lg:text-[82px]">
              {d.title.line1Pre.replace(/\s+$/, '')}
              {/*
                Logo wordmark. Sized so its ink-bottom (italic swirl tips at SVG y≈170)
                sits on the text baseline of "Tu" and ",".
                vertical-align: baseline on an empty inline-block puts the box bottom
                at the parent baseline, which equals the SVG bottom edge.
                SVG viewBox 568x170, aspect ratio 568/170 = 3.341.
                Height 0.82em matches "Tu" cap-to-baseline (~0.732em) plus a little
                headroom for the ascenders on b/k/t; width = 0.82 × 3.341 ≈ 2.74em.
              */}
              <span
                aria-hidden="true"
                translate="no"
                className="inline-block select-none align-baseline mx-[0.12em]"
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
              <span className="sr-only">{d.title.brand}</span>
              {d.title.line1Post}
            </span>
            <span className="block text-[36px] sm:text-[44px] md:text-[68px] lg:text-[82px]">
              {d.title.line2}
            </span>
          </h2>
          <p className="font-body text-[15px] text-[#320e10]/55 max-w-xl leading-relaxed">
            {d.subtitle}
          </p>
        </motion.div>

        {/* Options — three parallel modes (no timeline) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {d.options.map((opt, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="absolute inset-[-6px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,81,27,0.10) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 w-14 h-14 rounded-full border-2 border-[#e8511b] flex items-center justify-center bg-[#f6eadf] text-[#e8511b] flex-shrink-0">
                    <OptionIcon name={opt.icon} />
                  </div>
                </div>
                <span className="font-body font-bold text-[10px] tracking-[0.24em] uppercase text-[#e8511b]">
                  {opt.label}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-[24px] md:text-[26px] leading-[1.1] text-[#320e10]">
                  {opt.title}
                </h3>
                <p className="font-body text-[14px] text-[#320e10]/55 leading-relaxed">
                  {opt.body}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto pt-2">
                {opt.ctas.map((cta, j) => (
                  <a
                    key={j}
                    href={cta.href}
                    {...(cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="press focus-ring group inline-flex items-center gap-2 font-body font-bold text-[11px] tracking-[0.16em] uppercase text-[#320e10] hover:text-[#e8511b] border-b border-[#320e10]/25 hover:border-[#e8511b] pb-1"
                    style={{ transition: 'color 200ms var(--ease-out), border-color 200ms var(--ease-out)' }}
                  >
                    {cta.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ transition: 'transform 200ms var(--ease-out)' }}
                      className="group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* JellyWave → dark Footer */}
      <JellyWave fill="#320e10" height={140} />
    </section>
  )
}
