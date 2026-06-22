import { useEffect, type RefObject } from 'react'

/**
 * useButtonMotion — the site-wide button feedback language.
 *
 * "Jelly Pop": a subtle squash-and-stretch driven by an *interruptible* spring
 * (Web Animations API, transform-only → composited, off the main thread). Hover
 * settles to a small scale with a gummy overshoot; press squashes; release
 * springs back. Values were tuned live in `/playground.html`.
 *
 * Honours `prefers-reduced-motion`: when set, the hook no-ops entirely and the
 * button's colour transitions (owned by the variant) carry the feedback.
 */

const REDUCE =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Tuned values — see the Jelly Pop tuner. `leaveDur` is deliberately shorter
   than the enter settle so the UI doesn't feel like it lags behind the cursor
   when sweeping across a row of buttons. */
const JP = { hover: 1.02, jelly: 0.04, bounce: 0.0255, press: 0.94, dur: 420, leaveDur: 260 }
const EASE = 'cubic-bezier(0.23,1,0.32,1)'

export function useButtonMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCE) return

    let hovering = false
    let current: Animation | null = null

    const play = (frames: Keyframe[], duration: number) => {
      const from = getComputedStyle(el).transform
      current?.cancel()
      current = el.animate(
        [{ transform: from === 'none' ? 'scale(1)' : from }, ...frames],
        { duration, easing: EASE, fill: 'forwards' },
      )
    }

    const { hover: h, jelly: j, bounce: b, press: p, dur, leaveDur } = JP
    const enter = (): Keyframe[] => [
      { transform: `scaleX(${h + b + j}) scaleY(${h + b - j})`, offset: 0.45 },
      { transform: `scaleX(${h - j * 0.5}) scaleY(${h + j * 0.5})`, offset: 0.74 },
      { transform: `scale(${h})`, offset: 1 },
    ]
    const leave = (): Keyframe[] => [
      { transform: `scaleX(${1 - j * 0.6}) scaleY(${1 + j * 0.6})`, offset: 0.5 },
      { transform: 'scale(1)', offset: 1 },
    ]
    const squash = (): Keyframe[] => [
      { transform: `scaleX(${p + j}) scaleY(${p - j})`, offset: 1 },
    ]

    const onEnter = () => { hovering = true; play(enter(), dur) }
    const onLeave = () => { hovering = false; play(leave(), leaveDur) }
    const onDown = () => play(squash(), Math.max(110, Math.round(dur * 0.35)))
    const onUp = () => play(hovering ? enter() : leave(), hovering ? dur : leaveDur)

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)

    return () => {
      current?.cancel()
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [ref])
}
