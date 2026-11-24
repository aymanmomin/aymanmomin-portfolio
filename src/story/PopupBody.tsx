import { SHOW_EMPTY_MEDIA_SLOTS } from './config'
import MediaSlot from './MediaSlot'
import SeoStaircase from './SeoStaircase'
import type { PopupContent } from './types'

interface PopupBodyProps {
  content: PopupContent
}

export default function PopupBody({ content }: PopupBodyProps) {
  return (
    <>
      {content.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {content.bullets && content.bullets.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 marker:text-accent">
          {content.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {content.diagram === 'seo-staircase' && <SeoStaircase />}

      {content.media?.map((media) => <MediaSlot key={media.id} media={media} />)}

      {SHOW_EMPTY_MEDIA_SLOTS && content.todo && content.todo.length > 0 && (
        <div className="rounded-card border border-dashed border-line p-4 text-sm">
          <p className="font-medium text-accent-strong">To add</p>
          <ul className="mt-1 list-disc pl-5">
            {content.todo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {content.links && content.links.length > 0 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {content.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-strong underline-offset-4 hover:underline"
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}