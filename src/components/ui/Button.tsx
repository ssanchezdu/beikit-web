interface ButtonProps {
  variant: 'primary' | 'secondary' | 'social'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variantClasses = {
  primary:   'bg-[#e8511b] text-white hover:bg-[#d0481a]',
  secondary: 'bg-[#320e10] text-[#f6eadf] hover:bg-[#4a1518]',
  social:    'bg-[#f8b114] text-[#320e10] hover:bg-[#e8a010]',
}

export function Button({ variant, children, onClick, href, className = '', type = 'button', disabled }: ButtonProps) {
  // transition: specific properties + custom ease-out curve
  // :active scale for press feedback — the interface listens to the user
  const base = `press focus-ring font-body font-bold uppercase tracking-[0.08em] px-8 py-[14px] rounded-[14px] inline-flex items-center gap-2 ${variantClasses[variant]} ${className}`
  const style = { transition: 'transform 160ms var(--ease-out), background-color 200ms var(--ease-out)' } as React.CSSProperties

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={base}
        style={style}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={base} style={style} disabled={disabled}>
      {children}
    </button>
  )
}
