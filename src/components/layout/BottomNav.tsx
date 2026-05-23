import type { MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { useActiveSection } from '../../lib/useActiveSection'

/* Stable reference — keeps useActiveSection's effect from re-binding. */
const SECTIONS = ['menu', 'delivery'] as const

const svgProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const iconInicio = (
  <svg {...svgProps}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
)

const iconCarta = (
  <svg {...svgProps}>
    <line x1="8" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="20" y2="12" />
    <line x1="8" y1="18" x2="20" y2="18" />
    <circle cx="4" cy="6" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

const iconPedir = (
  <svg {...svgProps}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

/**
 * Brief haptic pulse for tap feedback — Saffer's "selection" pattern
 * (very short, tactile). No-op on browsers without the Vibration API
 * (notably iOS Safari), so visual feedback always remains the source of truth.
 */
function tapHaptic() {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate(10)
  }
}

export function BottomNav() {
  const { t } = useLanguage()
  const n = t.nav
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  /* Off-route (legal pages) leaves every item inactive — no false "you are
     here" while the user is on /privacidad etc. */
  const onHome = pathname === '/'
  const activeSection = useActiveSection(SECTIONS)

  /*
    Why an imperative click handler instead of a plain <Link>:

    ScrollManager (App.tsx) only re-scrolls when [pathname, hash] change.
    From Home with URL "/" tapping "Inicio" produces no URL change, so the
    effect never fires and the page stays put. The same trap hits any nav
    target tapped twice in a row ("/#menu" → "/#menu" is a no-op for the
    router). That's the "a veces sí, a veces no" the user observed.

    Mirroring Header.goHome: scroll imperatively when already on Home,
    delegate to react-router only when we need to change route.
  */
  function handleClick(targetId: string | null) {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      // Let modifier-clicks (cmd/ctrl/middle) keep their native open-in-new-tab.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      tapHaptic()

      const href = targetId ? `/#${targetId}` : '/'

      if (pathname !== '/') {
        // Off-route — navigate so ScrollManager picks up the hash on mount.
        navigate(href)
        return
      }

      // Already on Home: scroll imperatively every time. Keep the URL in
      // sync via replaceState so back/forward stays coherent without
      // triggering ScrollManager (which would race with our smooth scroll).
      if (targetId) {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      window.history.replaceState(null, '', href)
    }
  }

  const items = [
    { id: null,       href: '/',          label: n.inicio, icon: iconInicio, active: onHome && activeSection === null },
    { id: 'menu',     href: '/#menu',     label: n.carta,  icon: iconCarta,  active: onHome && activeSection === 'menu' },
    { id: 'delivery', href: '/#delivery', label: n.pedir,  icon: iconPedir,  active: onHome && activeSection === 'delivery' },
  ]

  return (
    <nav
      aria-label="Navegación principal"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-cream border-t border-dark/10 pb-[env(safe-area-inset-bottom)]"
      style={{ boxShadow: '0 -4px 16px -6px rgba(50,14,16,0.10)' }}
    >
      <ul className="flex">
        {items.map((it) => {
          /* Active items skip the orange/10 press flash + the press-color
             override — they're already orange, so the flash would just
             double-up emphasis. Inactive items keep both for tap feedback. */
          const pressClasses = it.active
            ? 'active:scale-[0.96]'
            : 'active:scale-[0.96] active:bg-orange/10 active:text-orange'

          return (
            <li key={it.href} className="relative flex-1">
              <a
                href={it.href}
                onClick={handleClick(it.id)}
                aria-current={it.active ? 'page' : undefined}
                className={`focus-ring relative flex flex-col items-center justify-center gap-1 min-h-[56px] py-2 ${pressClasses} ${
                  it.active ? 'text-orange' : 'text-dark/55'
                }`}
                style={{
                  /* Asymmetric tempo: color crossfade is the calm
                     scroll-driven signal (220ms); transform + bg are the
                     snappy press-driven signals (120/150ms). */
                  transition:
                    'color 220ms var(--ease-out), background-color 150ms var(--ease-out), transform 120ms var(--ease-out)',
                  transformOrigin: 'center',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              >
                {/* Active-section pill — a single Framer-tracked element
                    whose layoutId makes it slide between tabs (spring,
                    interruptible) rather than fade-swap. The 3px bar sits
                    on the nav's top border so the active tab visually
                    "owns" that segment of the divider. MotionConfig in
                    App.tsx gates this to a snap when prefers-reduced-motion
                    is on. */}
                {it.active && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    aria-hidden="true"
                    className="absolute -top-px left-0 right-0 mx-auto h-[3px] w-7 rounded-b-full bg-orange pointer-events-none"
                    initial={{ opacity: 0, scaleX: 0.4 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      layout: { type: 'spring', stiffness: 380, damping: 30, mass: 0.7 },
                      opacity: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
                      scaleX: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
                    }}
                  />
                )}

                {/* Icon — subtle 4% lift when the section is active, so
                    state change has a tactile beat beyond color alone.
                    Reduced motion drops the transform. */}
                <span
                  className="inline-flex"
                  style={{
                    transform: it.active && !reduceMotion ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 220ms var(--ease-out)',
                  }}
                >
                  {it.icon}
                </span>
                <span className="font-body font-bold text-[10px] tracking-[0.06em] uppercase leading-none">
                  {it.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
