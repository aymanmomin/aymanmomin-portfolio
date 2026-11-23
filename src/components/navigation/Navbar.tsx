import { useEffect, useState } from 'react'
import Container from '../layout/Container'
import { navItems } from '../../data/navigation'
import { personalLinks, personalName } from '../../data/personal'
import { useActiveSection } from '../../hooks/useActiveSection'
import { buttonClasses } from '../../lib/buttonClasses'

const sectionIds = navItems.map((item) => item.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight">
          {personalName}
        </a>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav aria-label="Primary">
          <ul
            id="primary-nav"
            className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col gap-1 border-b border-line bg-bg/95 p-5 backdrop-blur md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0`}
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                  className={
                    item.id === 'contact'
                      ? `${buttonClasses('secondary')} md:ml-2`
                      : `block rounded-full px-4 py-2 text-sm transition-colors duration-200 hover:text-fg ${
                          active === item.id ? 'text-fg' : 'text-muted'
                        }`
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
            {personalLinks.resume && (
              <li>
                <a
                  href={personalLinks.resume}
                  download
                  className={`${buttonClasses('primary')} md:ml-2`}
                >
                  Resume
                </a>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}