import { personalLinks } from '../data/personal'
import { buttonClasses } from '../lib/buttonClasses'
import EmailButton from './EmailButton'

export default function ContactActions() {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      <li>
        <EmailButton />
      </li>
      {personalLinks.linkedin && (
        <li>
          <a
            href={personalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('secondary')}
          >
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      )}
      {personalLinks.github && (
        <li>
          <a
            href={personalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('secondary')}
          >
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      )}
    </ul>
  )
}