import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-6 transition-colors duration-200 hover:border-accent/40 ${className}`}
    >
      {children}
    </div>
  )
}