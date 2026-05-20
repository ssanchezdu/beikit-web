import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '../lib/cookieConsent'
import { useLanguage } from '../lib/i18n'
import { Button } from './ui/Button'

/*
  Non-blocking cookie consent banner (AEPD-compliant): "Aceptar" and "Rechazar"
  share equal visual weight, no pre-selected option, and a link to the full
  Cookies policy. Sits above the mobile bottom nav.
*/
export function CookieBanner() {
  const { bannerVisible, accept, reject } = useCookieConsent()
  const { t } = useLanguage()
  const c = t.cookieBanner

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          role="region"
          aria-label={c.ariaLabel}
          className="fixed inset-x-0 bottom-[64px] md:bottom-0 z-[60] bg-cream border-t border-dark/12"
          style={{ boxShadow: '0 -8px 28px -10px rgba(50,14,16,0.18)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <p className="font-body text-[13px] md:text-[14px] leading-[1.6] text-dark/80 flex-1">
              {c.text}{' '}
              <Link
                to="/cookies"
                className="focus-ring rounded-[2px] font-bold text-dark underline underline-offset-2 hover:text-orange"
                style={{ transition: 'color 200ms var(--ease-out)' }}
              >
                {c.settings}
              </Link>
              .
            </p>

            {/* Equal-weight actions — same size; neither suppressed (AEPD) */}
            <div className="flex gap-3 shrink-0">
              <Button variant="outline-dark" onClick={reject} className="border-dark hover:bg-dark/[0.05] text-[12px] tracking-[0.1em] px-5 py-3">
                {c.reject}
              </Button>
              <Button variant="dark" onClick={accept} className="text-[12px] tracking-[0.1em] px-5 py-3">
                {c.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
