import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { JellyWave } from '../ui/JellyWave'
import { Button } from '../ui/Button'
import { EASE_ENTRANCE } from '../../lib/motion'

type InstagramPost = {
  id: string
  caption: string
  src: string
  permalink: string
  timestamp: string
}

type IGCard = { src: string; href: string; caption: string; rotate: number }

const EASE = EASE_ENTRANCE
/* Icons at two sizes: large for CTAs, small for card captions */
const igIcon = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const ttIcon = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
  </svg>
)

/* Card rotations — applied to the first and second slot regardless of source (live vs fallback). */
const IG_ROTATIONS = [-3, 2.5] as const

const IG_FALLBACK: IGCard[] = [
  { src: '/tt-video-7641997539968945430.jpg', href: 'https://www.instagram.com/reel/DYkNAIoIyT3/', caption: 'Ver reel en Instagram', rotate: IG_ROTATIONS[0] },
  { src: '/tt-video-7626799052440505622.jpg', href: 'https://www.instagram.com/reel/DW6wMOQiJdF/', caption: 'Ver reel en Instagram', rotate: IG_ROTATIONS[1] },
]

const TT_POSTS = [
  { src: '/tt-video-7634215210190163203.jpg', href: 'https://www.tiktok.com/@beikit_bakery/video/7634215210190163203', caption: 'Ver en TikTok', rotate: -2 },
  { src: '/tt-video-7631268682877947158.jpg', href: 'https://www.tiktok.com/@beikit_bakery/video/7631268682877947158', caption: 'Ver en TikTok', rotate: 3 },
]

function PostCard({ src, href, caption, rotate, iconSmall, iconHover, delay }: {
  src: string; href: string; caption: string; rotate: number; iconSmall: React.ReactNode; iconHover: React.ReactNode; delay: number
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group focus-ring block relative"
      initial={{ opacity: 0, y: 40, rotate: rotate * 2 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate,
        transition: { duration: 0.6, delay, ease: EASE },
      }}
      whileHover={{
        y: -8,
        scale: 1.05,
        rotate: 0,
        transition: { type: 'spring', duration: 0.45, bounce: 0.18 },
      }}
      whileFocus={{
        y: -8,
        scale: 1.05,
        rotate: 0,
        transition: { type: 'spring', duration: 0.45, bounce: 0.18 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className="bg-cream rounded-lg p-2.5 pb-3.5 shadow-[0_8px_32px_-6px_rgba(50,14,16,0.20),0_2px_8px_-2px_rgba(50,14,16,0.08)] group-hover:shadow-[0_16px_48px_-8px_rgba(50,14,16,0.28),0_4px_12px_-2px_rgba(50,14,16,0.10)] group-focus-visible:shadow-[0_16px_48px_-8px_rgba(50,14,16,0.28),0_4px_12px_-2px_rgba(50,14,16,0.10)]"
        style={{ transition: 'box-shadow 350ms var(--ease-out)' }}
      >
        <div className="relative overflow-hidden rounded-md aspect-square">
          <img
            src={src}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
            style={{ transition: 'transform 350ms var(--ease-out)' }}
          />
          <div
            className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 group-focus-visible:bg-dark/40 flex items-center justify-center rounded-md"
            style={{ transition: 'background-color 250ms var(--ease-out)' }}
            aria-hidden="true"
          >
            <div
              className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-dark opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
              style={{ transition: 'opacity 220ms var(--ease-out), transform 280ms cubic-bezier(0.34,1.45,0.64,1)' }}
            >
              {iconHover}
            </div>
          </div>
        </div>
        <div className="mt-2 px-1 flex items-center gap-2">
          <span className="text-dark/40 flex-shrink-0">{iconSmall}</span>
          <span className="font-body text-[12px] text-dark/60 leading-tight truncate">{caption}</span>
        </div>
      </div>
    </motion.a>
  )
}

/* CTA button — shared style, consistent dimensions */
function SocialCTA({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="dark"
      href={href}
      external
      className="hover-lift text-[13px] md:text-[14px] tracking-[0.12em] min-h-[48px] px-6 md:px-8 py-3 gap-3 shadow-[0_8px_24px_-6px_rgba(50,14,16,0.35)] hover:shadow-[0_12px_32px_-6px_rgba(50,14,16,0.45)]"
    >
      {icon}
      {label}
    </Button>
  )
}

function useInstagramPosts(): IGCard[] {
  const [cards, setCards] = useState<IGCard[]>(IG_FALLBACK)

  useEffect(() => {
    let cancelled = false
    fetch('/instagram-posts.json', { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : null))
      .then((posts: InstagramPost[] | null) => {
        if (cancelled || !Array.isArray(posts) || posts.length < 2) return
        setCards(
          posts.slice(0, 2).map((p, i) => ({
            src: p.src,
            href: p.permalink,
            caption: p.caption || 'Ver en Instagram',
            rotate: IG_ROTATIONS[i],
          })),
        )
      })
      .catch(() => {
        /* Network/parse error — keep fallback. */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return cards
}

export function RRSSSection() {
  const { t } = useLanguage()
  const r = t.rrss
  const igCards = useInstagramPosts()

  return (
    <section className="bg-yellow relative overflow-hidden">

      {/* Warm golden glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 py-12 sm:py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-10">

          {/* ── Headline — "Spoiler:" big, subtitle smaller ──── */}
          <div className="flex flex-col items-center text-center">
            <motion.span
              className="font-body font-bold text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] uppercase leading-none tracking-[-0.03em] text-dark mb-2 md:mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {r.eyebrow}
            </motion.span>
            <motion.p
              className="font-display text-[18px] sm:text-[22px] md:text-[32px] lg:text-[40px] leading-[1.1] text-dark/80"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            >
              {r.headline}
            </motion.p>
          </div>

          {/* ── Two platform columns ─────────────────────────── */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">

            {/* ── Instagram ────────────────────────────────── */}
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <SocialCTA
                href="https://www.instagram.com/beikit_bakery/"
                icon={igIcon(22)}
                label="@beikit_bakery"
              />
              <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
                {igCards.map((post, i) => (
                  <PostCard key={i} {...post} iconSmall={igIcon(14)} iconHover={igIcon(20)} delay={0.2 + i * 0.1} />
                ))}
              </div>
            </motion.div>

            {/* ── TikTok ───────────────────────────────────── */}
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <SocialCTA
                href="https://www.tiktok.com/@beikit_bakery"
                icon={ttIcon(22)}
                label="@beikit_bakery"
              />
              <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
                {TT_POSTS.map((post, i) => (
                  <PostCard key={i} {...post} iconSmall={ttIcon(14)} iconHover={ttIcon(20)} delay={0.3 + i * 0.1} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Jelly wave → dark Footer */}
      <JellyWave fill="#320e10" height={140} />
    </section>
  )
}
