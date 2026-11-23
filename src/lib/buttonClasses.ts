export type ButtonVariant = 'primary' | 'secondary'

const base =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-bg hover:bg-accent-strong',
  secondary: 'border border-line text-fg hover:border-accent hover:text-accent-strong',
}

export function buttonClasses(variant: ButtonVariant = 'primary'): string {
  return `${base} ${variants[variant]}`
}