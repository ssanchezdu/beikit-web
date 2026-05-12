import { useEffect, useState } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

export function useHoverCapable(): boolean {
  const [capable, setCapable] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setCapable(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return capable
}
