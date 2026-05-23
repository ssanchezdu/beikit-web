import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import es from './i18n.es'

export type Lang = 'es' | 'ca'
export type Translations = typeof es

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: es,
})

/* localStorage key for the user's last language pick. We hold this client-side
   instead of mirroring it in the URL because the route paths are language-
   agnostic and there's no SSR — a refresh would otherwise always reset to ES. */
const STORAGE_KEY = 'beikit-lang'

function isLang(v: unknown): v is Lang {
  return v === 'es' || v === 'ca'
}

function readStoredLang(): Lang {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    return isLang(raw) ? raw : 'es'
  } catch {
    return 'es'
  }
}

// Cache loaded language modules so we hit the network only once per language.
const cache: Partial<Record<Lang, Translations>> = { es }

async function loadLang(lang: Lang): Promise<Translations> {
  const cached = cache[lang]
  if (cached) return cached
  // Currently only 'ca' is dynamically loaded; if a new language is added,
  // extend this branch. The any-language switch is intentional, not generic.
  if (lang === 'ca') {
    const mod = await import('./i18n.ca')
    cache.ca = mod.default as Translations
    return cache.ca
  }
  return es
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const initial = readStoredLang()
  const [lang, setLangState] = useState<Lang>(initial)
  const [t, setT] = useState<Translations>(initial === 'es' ? es : es)

  /* Token monotonically increments per setLang call so an out-of-order
     promise resolution (es → ca → es with ca still loading) can detect
     it's stale and abort the setT/setLangState that would clobber state. */
  const reqRef = useRef(0)

  // Hydrate the non-ES translations on first render if the stored pick is CA.
  useEffect(() => {
    if (initial === 'es') return
    const token = ++reqRef.current
    loadLang(initial).then((loaded) => {
      if (token !== reqRef.current) return
      setT(loaded)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLang = useCallback((next: Lang) => {
    if (next === lang) return
    const token = ++reqRef.current
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage unavailable — non-fatal, language still applies for the
         current session. */
    }
    if (next === 'es') {
      setLangState('es')
      setT(es)
      return
    }
    loadLang(next).then((loaded) => {
      if (token !== reqRef.current) return
      setLangState(next)
      setT(loaded)
    })
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
