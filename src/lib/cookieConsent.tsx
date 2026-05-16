import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/*
  Cookie consent — "Basic" strategy: analytics scripts are never loaded until
  the user explicitly accepts. No Google Consent Mode pings before consent.
  The stored decision expires after 24 months (AEPD guideline), after which the
  banner is shown again.
*/

type ConsentValue = 'accepted' | 'rejected'
type ConsentState = ConsentValue | 'unknown'

const STORAGE_KEY = 'beikit-cookie-consent'
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 365 * 2 // ~24 months

interface Stored {
  value: ConsentValue
  ts: number
}

function readStored(): ConsentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'unknown'
    const parsed = JSON.parse(raw) as Partial<Stored>
    if (parsed.value !== 'accepted' && parsed.value !== 'rejected') return 'unknown'
    if (typeof parsed.ts !== 'number' || Date.now() - parsed.ts > MAX_AGE_MS) return 'unknown'
    return parsed.value
  } catch {
    return 'unknown'
  }
}

function writeStored(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, ts: Date.now() } satisfies Stored))
  } catch {
    /* localStorage unavailable (private mode / disabled) — non-fatal */
  }
}

// ── Analytics (Google Analytics 4) — only ever called after consent ─────────

let analyticsLoaded = false

function setGaDisabled(id: string, disabled: boolean) {
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = disabled
}

function loadAnalytics() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!id) return // not configured yet — consent infra is ready, this is a no-op
  setGaDisabled(id, false)
  if (analyticsLoaded) return
  analyticsLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['js', new Date()])
  window.dataLayer.push(['config', id])
}

function disableAnalytics() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (id) setGaDisabled(id, true)
  // Best-effort removal of GA cookies (_ga, _ga_*, _gid).
  const host = location.hostname
  for (const chunk of document.cookie.split(';')) {
    const name = chunk.split('=')[0].trim()
    if (!name.startsWith('_ga') && name !== '_gid') continue
    const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    document.cookie = `${name}=;${expire}`
    document.cookie = `${name}=;${expire};domain=${host}`
    document.cookie = `${name}=;${expire};domain=.${host}`
  }
}

// ── Context ─────────────────────────────────────────────────────────────────

interface CookieConsentContextType {
  consent: ConsentState
  bannerVisible: boolean
  accept: () => void
  reject: () => void
  reopen: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: 'unknown',
  bannerVisible: false,
  accept: () => {},
  reject: () => {},
  reopen: () => {},
})

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(readStored)
  const [bannerVisible, setBannerVisible] = useState(() => consent === 'unknown')

  // Apply the analytics side-effect whenever consent settles — including the
  // initial value restored from a previous visit. Both calls are idempotent.
  useEffect(() => {
    if (consent === 'accepted') loadAnalytics()
    else if (consent === 'rejected') disableAnalytics()
  }, [consent])

  const accept = useCallback(() => {
    writeStored('accepted')
    setConsent('accepted')
    setBannerVisible(false)
  }, [])

  const reject = useCallback(() => {
    writeStored('rejected')
    setConsent('rejected')
    setBannerVisible(false)
  }, [])

  const reopen = useCallback(() => setBannerVisible(true), [])

  return (
    <CookieConsentContext.Provider value={{ consent, bannerVisible, accept, reject, reopen }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCookieConsent = () => useContext(CookieConsentContext)
