import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useHoverCapable } from './useHoverCapable'

export function useCardHover() {
  const [hovered, setHovered] = useState(false)
  const hoverCapable = useHoverCapable()
  const reduceMotion = useReducedMotion()

  const bind = {
    ...(hoverCapable
      ? {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        }
      : {}),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  }

  return { hovered, reduceMotion: Boolean(reduceMotion), bind }
}
