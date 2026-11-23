interface TagListProps {
  label: string
  tags: string[]
}

export default function TagList({ label, tags }: TagListProps) {
  return (
    <ul aria-label={label} className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-fg">
          {tag}
        </li>
      ))}
    </ul>
  )
}