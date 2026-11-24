import { SHOW_EMPTY_MEDIA_SLOTS } from './config'
import type { MediaSpec } from './types'

interface MediaSlotProps {
  media: MediaSpec
  className?: string
}

// Renders the real photo or video once a file path is set, otherwise a clearly marked placeholder.
export default function MediaSlot({ media, className = '' }: MediaSlotProps) {
  const caption = media.caption ? (
    <figcaption className="mt-2 text-xs text-muted">{media.caption}</figcaption>
  ) : null

  if (media.src) {
    return (
      <figure className={className}>
        {media.kind === 'video' ? (
          <video
            src={media.src}
            controls
            preload="metadata"
            aria-label={media.alt ?? media.label}
            className="w-full rounded-card border border-line"
          />
        ) : (
          <img
            src={media.src}
            alt={media.alt ?? media.label}
            loading="lazy"
            className="w-full rounded-card border border-line object-cover"
          />
        )}
        {caption}
      </figure>
    )
  }

  if (!SHOW_EMPTY_MEDIA_SLOTS) return null

  return (
    <figure className={className} data-media-slot={media.id}>
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-1 rounded-card border border-dashed border-line bg-surface p-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-accent-strong">{media.kind} slot</p>
        <p className="text-sm text-fg">{media.label}</p>
      </div>
      {caption}
    </figure>
  )
}