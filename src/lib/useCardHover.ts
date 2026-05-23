import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useHoverCapable } from './useHoverCapable'

/*
  Card "hover" state that works on both pointer types.

  • Hover-capable devices (mouse): the classic mouseenter/mouseleave pair.
  • Touch devices: a tap on the card body toggles a sticky "active" state so
    the inverted-color treatment is actually reachable on iPhone — otherwise
    the entire hover animation is invisible on the device most users browse
    from. Taps that land on the CTA (`<a>`/`<button>`) bypass the toggle so
    the link opens on the first tap; taps outside the card or any scroll
    clear the state.

  Why this matters: the media query `(hover: hover) and (pointer: fine)` is
  `false` on real touch devices, so the old mouse-only bindings never fired
  there. DevTools' mobile viewport keeps the underlying mouse pointer fine,
  which is why the bug only surfaced on hardware.

  `ref` is returned separately (not nested in `bind`) so that consumers can
  attach it directly with `<article ref={ref} ...>` instead of going through
  `bind.ref`, which the React Compiler's ref-rules treat as a ref access
  during render.
*/

interface CardHoverBind {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus: () => void
  onBlur: () => void
  onPointerUp?: (e: ReactPointerEvent) => void
}

export function useCardHover() {
  const [hovered, setHovered] = useState(false)
  const hoverCapable = useHoverCapable()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)

  // Touch-only: dismiss the active state when the user taps outside this
  // card or scrolls away. Listener is only mounted while this card is
  // actually active, so the cost is paid by at most one card at a time.
  useEffect(() => {
    if (hoverCapable || !hovered) return

    const onOutside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setHovered(false)
    }
    const onScroll = () => setHovered(false)

    document.addEventListener('pointerdown', onOutside, true)
    // capture so we also catch scrolls inside nested containers
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('pointerdown', onOutside, true)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [hoverCapable, hovered])

  const bind: CardHoverBind = hoverCapable
    ? {
        onFocus: () => setHovered(true),
        onBlur: () => setHovered(false),
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }
    : {
        onFocus: () => setHovered(true),
        onBlur: () => setHovered(false),
        // Toggle on tap. Skip when the user tapped the CTA so a direct tap
        // on the button opens the link instead of just previewing the card.
        onPointerUp: (e: ReactPointerEvent) => {
          if (e.pointerType === 'mouse') return
          const target = e.target as HTMLElement
          if (target.closest('a, button')) return
          setHovered((prev) => !prev)
        },
      }

  return { hovered, reduceMotion: Boolean(reduceMotion), ref, bind }
}
