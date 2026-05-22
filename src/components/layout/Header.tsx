import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../../lib/i18n'

export function Header() {
  const { t, lang, setLang } = useLanguage()
  const n = t.nav

  const navigate = useNavigate()
  const location = useLocation()

  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastScrollY.current

        if (delta < -4) {
          setVisible(true)
        } else if (delta > 6 && y > 80) {
          setVisible(false)
        }

        setScrolled(y > 16)
        lastScrollY.current = y
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-cream"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        boxShadow: scrolled
          ? '0 4px 16px -4px rgba(50,14,16,0.04)'
          : 'none',
        transition: 'transform 480ms var(--ease-out), box-shadow 360ms var(--ease-out)',
      }}
    >
      {/* h-[72px] = 9×8 | px-6 = 24px (3×8) | md:px-10 = 40px (5×8) */}
      <div className="h-[72px] mx-auto flex items-center justify-between px-6 md:px-10">

        {/* LEFT — Slogan */}
        <div className="flex items-center w-[96px] md:w-[120px]">
          <span className="hidden md:block font-body font-bold text-[10px] tracking-[0.28em] uppercase text-dark leading-none">
            {n.tagLeft}
          </span>
        </div>

        {/* CENTER — Logo */}
        <div className="flex items-center justify-center">
          <a
            href="/"
            onClick={goHome}
            className="focus-ring rounded-[6px]"
            aria-label="Beikit Bakery — Inicio"
          >
            <img
              src="/assets/svg/logo_beikit.svg"
              className="h-7 md:h-8 w-auto"
              width="96"
              height="32"
              alt="Beikit Bakery"
            />
          </a>
        </div>

        {/* RIGHT — Language selector (min 44×44 touch targets per WCAG) */}
        <div className="flex items-center justify-end w-[96px] md:w-[120px]">
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Idioma"
          >
            <button
              type="button"
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
              aria-label="Español"
              className={`focus-ring font-body font-bold text-[13px] min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[8px] leading-none ${
                lang === 'es'
                  ? 'text-dark bg-dark/[0.06]'
                  : 'text-dark/55 hover:text-dark/80 hover:bg-dark/[0.03]'
              }`}
              style={{ transition: 'color 240ms var(--ease-out), background-color 240ms var(--ease-out)' }}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang('ca')}
              aria-pressed={lang === 'ca'}
              aria-label="Català"
              className={`focus-ring font-body font-bold text-[13px] min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[8px] leading-none ${
                lang === 'ca'
                  ? 'text-dark bg-dark/[0.06]'
                  : 'text-dark/55 hover:text-dark/80 hover:bg-dark/[0.03]'
              }`}
              style={{ transition: 'color 240ms var(--ease-out), background-color 240ms var(--ease-out)' }}
            >
              CAT
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
