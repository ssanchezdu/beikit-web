import { Link } from 'react-router-dom'
import { useLanguage } from '../../lib/i18n'
import { useCookieConsent } from '../../lib/cookieConsent'

export function Footer() {
  const { t } = useLanguage()
  const f = t.footer
  const l = t.legal
  const { reopen } = useCookieConsent()

  const colorTransition = { transition: 'color 200ms var(--ease-out)' } as React.CSSProperties
  const socialTransition = {
    transition:
      'transform 160ms var(--ease-out), border-color 200ms var(--ease-out), color 200ms var(--ease-out), box-shadow 200ms var(--ease-out)',
  } as React.CSSProperties

  return (
    <footer className="bg-dark relative">
      {/* Footer body */}
      <div className="relative z-10 px-6 md:px-12 pt-10 sm:pt-16 pb-8 sm:pb-10">
        <div className="max-w-5xl mx-auto">

          {/* Top section — logo + grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-x-10 items-start pb-8 sm:pb-10 border-b border-cream/10">

            {/* Brand col */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-5 items-start">
              <img
                src="/assets/svg/logo_beikit.svg"
                className="h-10 w-auto brightness-0 invert block -ml-1"
                width="120"
                height="40"
                loading="lazy"
                alt="Beikit Bakery"
              />
              <p className="font-body text-[12px] text-cream/55 tracking-[0.1em] uppercase leading-relaxed">
                American Bakery · Granollers, Spain
              </p>

              {/* Social — warmer hover */}
              <div className="flex gap-3 mt-1">
                <a
                  href="https://www.instagram.com/beikit_bakery/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="press focus-ring-dark w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream/40 hover:border-orange hover:text-orange hover:shadow-[0_0_16px_-4px_rgba(232,81,27,0.3)]"
                  style={socialTransition}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@beikit_bakery"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="press focus-ring-dark w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream/40 hover:border-orange hover:text-orange hover:shadow-[0_0_16px_-4px_rgba(232,81,27,0.3)]"
                  style={socialTransition}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact col */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <h3 className="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-orange">
                {f.title}
              </h3>
              <div className="flex flex-col gap-1.5">
                <span className="font-body text-[11px] text-cream/60 uppercase tracking-[0.1em]">{f.phonelabel}</span>
                <a href={`tel:${f.phone}`} className="focus-ring-dark font-body text-[15px] text-cream/70 hover:text-orange" style={colorTransition}>
                  {f.phone}
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-body text-[11px] text-cream/60 uppercase tracking-[0.1em]">{f.addrlabel}</span>
                <address className="not-italic font-body text-[15px] text-cream/70 leading-snug whitespace-pre-line">
                  {f.address}
                </address>
              </div>
            </div>

            {/* Hours col */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <h3 className="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-orange">
                {f.hourslabel}
              </h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-body text-[13px] leading-[1.4]">
                {f.hoursDays.map((d) => {
                  const closed = d.slots.length === 0
                  return (
                    <div key={d.day} className="contents">
                      <dt className={`font-bold tracking-[0.14em] uppercase text-[11px] pt-[2px] ${closed ? 'text-cream/60' : 'text-cream/70'}`}>
                        {d.day}
                      </dt>
                      <dd className={`tabular-nums ${closed ? 'text-cream/60 italic' : 'text-cream/75'}`}>
                        {closed ? f.hoursClosed : d.slots.join(' · ')}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>

            {/* Order col */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <h3 className="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-orange">
                {f.ordersLabel}
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://glovoapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring-dark rounded-[2px] font-body text-[14px] text-cream/70 hover:text-orange flex items-center gap-2.5"
                  style={colorTransition}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_6px_rgba(232,81,27,0.4)]" />
                  Glovo
                </a>
                <a
                  href="https://ubereats.com"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring-dark rounded-[2px] font-body text-[14px] text-cream/70 hover:text-orange flex items-center gap-2.5"
                  style={colorTransition}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_6px_rgba(232,81,27,0.4)]" />
                  Uber Eats
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-[12px] text-cream/60">{l.copyright}</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link to="/aviso-legal" className="focus-ring-dark rounded-[2px] font-body text-[11px] text-cream/60 hover:text-cream/90" style={colorTransition}>
                {l.avisoLegal}
              </Link>
              <span className="text-cream/10">·</span>
              <Link to="/privacidad" className="focus-ring-dark rounded-[2px] font-body text-[11px] text-cream/60 hover:text-cream/90" style={colorTransition}>
                {l.privacidad}
              </Link>
              <span className="text-cream/10">·</span>
              <Link to="/cookies" className="focus-ring-dark rounded-[2px] font-body text-[11px] text-cream/60 hover:text-cream/90" style={colorTransition}>
                {l.cookies}
              </Link>
              <span className="text-cream/10">·</span>
              <button
                type="button"
                onClick={reopen}
                className="focus-ring-dark rounded-[2px] font-body text-[11px] text-cream/60 hover:text-cream/90"
                style={colorTransition}
              >
                {l.gestionarCookies}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
