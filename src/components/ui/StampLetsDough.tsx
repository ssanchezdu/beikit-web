import { motion, useSpring } from 'framer-motion'

interface StampLetsDoughProps {
  className?: string
}

export function StampLetsDough({ className = 'w-24 h-24' }: StampLetsDoughProps) {
  const scale = useSpring(1, { stiffness: 260, damping: 16, mass: 1 })

  return (
    <div
      className={`relative select-none cursor-default ${className}`}
      onMouseEnter={() => scale.set(1.15)}
    >
      {/* Outer ring — spins */}
      <div className="stamp-ring absolute inset-0">
        <img
          src="/assets/svg/letsdough_circle.svg"
          className="w-full h-full"
          aria-hidden="true"
          alt=""
        />
      </div>
      {/* Center — spring bounce */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/assets/svg/letsdough_alone.svg"
          className="w-[55%] h-[55%] object-contain"
          aria-hidden="true"
          alt=""
        />
      </motion.div>
    </div>
  )
}
