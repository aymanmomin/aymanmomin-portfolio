import type { ProjectLink } from '../../data/projects'
import { buttonClasses } from '../../lib/buttonClasses'

interface ProjectLinksProps {
  links: ProjectLink[]
  note?: string
  compact?: boolean
}

// Renders nothing when a project has no confirmed links, so there are never broken buttons.
export default function ProjectLinks({ links, note, compact = false }: ProjectLinksProps) {
  if (links.length === 0 && !note) return null

  return (
    <div className="mt-5">
      {links.length > 0 && (
        <ul className={compact ? 'flex flex-wrap gap-x-5 gap-y-2 text-sm' : 'flex flex-wrap gap-3'}>
          {links.map((link, index) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  compact
                    ? 'text-accent-strong underline-offset-4 hover:underline'
                    : buttonClasses(index === 0 ? 'primary' : 'secondary')
                }
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {note && <p className="mt-3 text-sm text-muted">{note}</p>}
    </div>
  )
}