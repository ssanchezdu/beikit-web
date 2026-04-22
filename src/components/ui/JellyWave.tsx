/**
 * JellyWave — kremkanel-style spring-physics wave with enhanced jelly + waviness.
 *
 * Architecture (from kremkanel source):
 *   - Each control point is an independent spring:
 *       velocity += (targetY + amplitude - y) * spring * dt
 *       velocity *= friction
 *       y += velocity
 *   - SVG path uses smooth cubic bezier S-commands through all points
 *   - rAF only runs while in-view; wave is still otherwise
 *
 * Enhancements over base kremkanel (3 points):
 *   - 7 control points → multiple organic undulations
 *   - Each point has a DIFFERENT spring/friction → staggered bounce timing
 *   - Lower friction (0.78-0.84) → more oscillation cycles before settling
 *   - Higher amplitudes → deeper wave troughs and crests
 *   - Alternating +/- amplitude → wave shape, not just one hump
 */

import { useRef, useEffect, useCallback } from 'react'

// ── Spring point ────────────────────────────────────────────────────────────

interface SpringPoint {
  x:         number
  y:         number
  velocity:  number
  amplitude: number
  spring:    number
  friction:  number
}

function pt(amp: number, spring: number, friction: number): SpringPoint {
  return { x: 0, y: 0, velocity: 0, amplitude: amp, spring, friction }
}

// ── SVG path from control points (smooth cubic bezier S-commands) ───────────

function drawPath(pts: SpringPoint[], w: number, h: number): string {
  let d = `M ${w} ${h} H -1 V ${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i += 2) {
    const cp = pts[i]
    const ep = pts[i + 1]
    if (ep) {
      d += ` S ${cp.x.toFixed(1)} ${cp.y.toFixed(1)} ${ep.x.toFixed(1)} ${ep.y.toFixed(1)}`
    }
  }
  d += ` V ${h}`
  return d
}

// ── Distribute x-positions + scale amplitudes by viewport ───────────────────

function layoutPoints(pts: SpringPoint[], w: number, vScale: number, amps: number[]) {
  const n = pts.length
  for (let i = 0; i < n; i++) {
    pts[i].x = (i / (n - 1)) * w
    pts[i].amplitude = amps[i] * vScale
  }
}

// ── Component ───────────────────────────────────────────────────────────────

interface JellyWaveProps {
  fill:        string
  fillAccent?: string
  dual?:       boolean
  height?:     number
  className?:  string
  style?:      React.CSSProperties
}

export function JellyWave({
  fill,
  fillAccent = '#e8511b',
  dual       = false,
  height     = 140,
  className  = '',
  style,
}: JellyWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef       = useRef<SVGSVGElement>(null)
  const path1Ref     = useRef<SVGPathElement>(null)
  const path2Ref     = useRef<SVGPathElement>(null)

  const getProgress = useCallback(() => {
    if (!containerRef.current) return 0
    const r = containerRef.current.getBoundingClientRect()
    const vh = window.innerHeight
    return Math.max(0, Math.min(1, 1 - (r.top + r.height) / (vh + r.height)))
  }, [])

  useEffect(() => {
    const H = height
    const FRAME_DUR = 1000 / 60

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── 7 points: edges anchored (amp=0), inner points alternate +/- for waviness
    //    Each point has DIFFERENT spring/friction for staggered jelly bounce
    //
    //    Amplitude pattern:  0  +45  -30  +55  -30  +45  0
    //    This creates ~3 humps of organic wave

    const mainAmps   = [0, 45, -30, 55, -30, 45, 0]
    const accentAmps = [0, 35, -20, 40, -20, 35, 0]

    const mainPts: SpringPoint[] = [
      pt(0,    0.015, 0.84),  // left edge — anchored
      pt(45,   0.045, 0.80),  // bouncy, moderate spring
      pt(-30,  0.065, 0.82),  // faster spring, inverted
      pt(55,   0.035, 0.78),  // slowest spring, biggest amp → most jelly
      pt(-30,  0.055, 0.81),
      pt(45,   0.048, 0.80),
      pt(0,    0.015, 0.84),  // right edge — anchored
    ]

    const accentPts: SpringPoint[] = [
      pt(0,    0.012, 0.83),
      pt(35,   0.038, 0.79),
      pt(-20,  0.055, 0.81),
      pt(40,   0.030, 0.77),  // even bouncier than main
      pt(-20,  0.050, 0.80),
      pt(35,   0.042, 0.79),
      pt(0,    0.012, 0.83),
    ]

    type Layer = { pts: SpringPoint[]; amps: number[]; ref: React.RefObject<SVGPathElement | null> }
    const layers: Layer[] = []
    if (dual) layers.push({ pts: accentPts, amps: accentAmps, ref: path1Ref })
    layers.push({ pts: mainPts, amps: mainAmps, ref: path2Ref })

    // Initial layout
    const vScale = Math.min(1, window.innerWidth / 1440)
    const svgW   = window.innerWidth
    const svgH   = H

    layers.forEach(l => layoutPoints(l.pts, svgW, vScale, l.amps))

    // Start with all points at bottom (hidden)
    const initialY = svgH
    layers.forEach(l => l.pts.forEach(p => { p.y = initialY }))

    // State
    const state = {
      active:  false,
      rafId:   0,
      targetY: initialY,
      svgW,
      svgH,
      layers,
    }

    if (svgRef.current) {
      svgRef.current.setAttribute('width', `${svgW}px`)
      svgRef.current.setAttribute('height', `${svgH}px`)
      svgRef.current.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`)
    }

    const render = () => {
      state.layers.forEach(l => {
        if (l.ref.current) {
          l.ref.current.setAttribute('d', drawPath(l.pts, state.svgW, state.svgH))
        }
      })
    }

    // ── rAF tick (kremkanel spring formula) ──────────────────────────────────
    let lastTime = 0

    const tick = (time: number) => {
      if (!state.active) return

      const dt = lastTime ? Math.min(time - lastTime, 64) : FRAME_DUR
      lastTime = time
      const s = Math.min(1, dt / FRAME_DUR)

      let totalEnergy = 0

      state.layers.forEach(layer => {
        layer.pts.forEach(p => {
          const force = (state.targetY + p.amplitude - p.y) * (p.spring * s)
          p.velocity += force
          p.velocity *= p.friction
          p.y += p.velocity
          totalEnergy += Math.abs(p.velocity) + Math.abs(state.targetY + p.amplitude - p.y) * p.spring
        })
      })

      render()

      // Stop rAF when all springs have settled
      if (totalEnergy < 0.01) {
        state.active = false
        return
      }

      state.rafId = requestAnimationFrame(tick)
    }

    // ── Scroll target ───────────────────────────────────────────────────────
    const baseMin  = svgH * 0.12
    const ampRange = svgH * 0.76

    const updateTarget = () => {
      const progress = getProgress()
      state.targetY = svgH - baseMin - progress * ampRange
    }

    const onScroll = () => {
      updateTarget()
      if (!state.active) {
        state.active = true
        lastTime = 0
        state.rafId = requestAnimationFrame(tick)
      }
    }

    // ── IntersectionObserver ─────────────────────────────────────────────────
    const io = new IntersectionObserver(
      entries => {
        const vis = entries.some(e => e.isIntersecting)
        if (vis) {
          updateTarget()
          if (!state.active) {
            state.active = true
            lastTime = 0
            state.rafId = requestAnimationFrame(tick)
          }
        } else {
          state.active = false
          cancelAnimationFrame(state.rafId)
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    )
    if (containerRef.current) io.observe(containerRef.current)

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth
      const sc = Math.min(1, w / 1440)
      state.svgW = w
      state.layers.forEach(l => layoutPoints(l.pts, w, sc, l.amps))
      if (svgRef.current) {
        svgRef.current.setAttribute('width', `${w}px`)
        svgRef.current.setAttribute('viewBox', `0 0 ${w} ${state.svgH}`)
      }
      updateTarget()
      render()
    }

    // ── Init ────────────────────────────────────────────────────────────────
    if (reduced) {
      updateTarget()
      state.layers.forEach(l => l.pts.forEach(p => { p.y = state.targetY + p.amplitude }))
      render()
    } else {
      updateTarget()
      render()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })
    }

    return () => {
      state.active = false
      cancelAnimationFrame(state.rafId)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [dual, height, getProgress])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height, overflow: 'hidden', ...style }}
      className={className}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%' }}
        aria-hidden="true"
      >
        {dual && <path ref={path1Ref} fill={fillAccent} />}
        <path ref={path2Ref} fill={fill} />
      </svg>
    </div>
  )
}
