import { createContext, useCallback, useContext, useState } from 'react'
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

// Cache loaded language modules so we hit the network only once per language.
const cache: Partial<Record<Lang, Translations>> = { es }

async function loadLang(lang: Lang): Promise<Translations> {
  const cached = cache[lang]
  if (cached) return cached
  const mod = await import('./i18n.ca')
  cache[lang] = mod.default as Translations
  return cache[lang]!
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')
  const [t, setT] = useState<Translations>(es)

  const setLang = useCallback((next: Lang) => {
    if (next === lang) return
    if (next === 'es') {
      setLangState('es')
      setT(es)
      return
    }
    loadLang(next).then((loaded) => {
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
