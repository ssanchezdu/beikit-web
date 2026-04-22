import { JellyWave } from './JellyWave'

interface WaveTransitionProps {
  variant: 'hero-bottom' | 'dark-to-cream' | 'cream-to-dark'
}

export function WaveTransition({ variant }: WaveTransitionProps) {
  if (variant === 'hero-bottom') {
    return <JellyWave dual fill="#320e10" fillAccent="#e8511b" height={160} />
  }
  if (variant === 'dark-to-cream') {
    return <JellyWave fill="#f6eadf" height={140} />
  }
  if (variant === 'cream-to-dark') {
    return <JellyWave fill="#320e10" height={140} />
  }
  return null
}
