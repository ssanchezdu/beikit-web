import { useEffect, useState } from 'react'

/*
  Scroll-spy: returns the id of the section currently anchored in the
  viewport, or `null` when the user sits above all of them (the hero).

  The anchor line is 1/3 from the top of the viewport — chosen so a user
  who has *just brought* a section into view already sees it highlighted,
  rather than waiting for the section to fill the screen. We walk `ids` in
  document order and keep the last one whose top has crossed the anchor;
  that gives the correct transition when scrolling either way.

  Scroll listener is rAF-throttled (one update per frame max) so the cost
  is a 2-element bounding-rect read at 60fps — negligible.

  Pass a stable, module-level array as `ids` so the effect doesn't re-bind
  every render.
*/
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return

    let raf = 0
    const update = () => {
      raf = 0
      const anchor = window.innerHeight / 3
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= anchor) current = id
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])

  return active
}
