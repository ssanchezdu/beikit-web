import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../lib/i18n'

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

export function BottomNav() {
  const { t } = useLanguage()
  const n = t.nav
  const { pathname } = useLocation()

  const items = [
    { to: '/', label: n.inicio, icon: iconInicio, active: pathname === '/' },
    { to: '/#menu', label: n.carta, icon: iconCarta, active: false },
    { to: '/#delivery', label: n.pedir, icon: iconPedir, active: false },
  ]

  return (
    <nav
      aria-label="Navegación principal"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-cream border-t border-dark/10 pb-[env(safe-area-inset-bottom)]"
      style={{ boxShadow: '0 -4px 16px -6px rgba(50,14,16,0.10)' }}
    >
      <ul className="flex">
        {items.map((it) => (
          <li key={it.to} className="flex-1">
            <Link
              to={it.to}
              aria-current={it.active ? 'page' : undefined}
              className={`press focus-ring flex flex-col items-center justify-center gap-1 min-h-[56px] py-2 ${
                it.active ? 'text-orange' : 'text-dark/55'
              }`}
              style={{ transition: 'color 200ms var(--ease-out)' }}
            >
              {it.icon}
              <span className="font-body font-bold text-[10px] tracking-[0.06em] uppercase leading-none">
                {it.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
