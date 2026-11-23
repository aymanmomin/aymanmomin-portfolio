import Card from '../ui/Card'
import TagList from '../ui/TagList'
import ProjectLinks from './ProjectLinks'
import type { Project } from '../../data/projects'

interface FeaturedProjectCardProps {
  project: Project
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-accent-strong">{project.category}</span>
        {project.inDevelopment && (
          <span className="rounded-full border border-accent/50 px-2.5 py-0.5 text-accent-strong">
            In development
          </span>
        )}
      </div>
      <h4 className="mt-2 font-display text-2xl font-semibold text-fg">{project.title}</h4>
      {project.kind && <p className="mt-1 text-sm">{project.kind}</p>}
      <p className="mt-4 leading-relaxed">{project.summary}</p>
      {project.role && (
        <>
          <p className="mt-4 text-sm font-semibold text-fg">My role</p>
          <p className="mt-1 text-sm leading-relaxed">{project.role}</p>
        </>
      )}
      <TagList label={`Technologies for ${project.title}`} tags={project.stack} />
      {project.stackNote && <p className="mt-3 text-xs">{project.stackNote}</p>}
      <ProjectLinks links={project.links} note={project.linkNote} />
    </Card>
  )
}