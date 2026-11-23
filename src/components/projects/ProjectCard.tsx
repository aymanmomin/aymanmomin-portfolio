import Card from '../ui/Card'
import TagList from '../ui/TagList'
import ProjectLinks from './ProjectLinks'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <p className="text-xs text-accent-strong">
        {project.category}
        {project.kind ? ` \u00B7 ${project.kind}` : ''}
      </p>
      <h4 className="mt-2 font-display text-lg font-semibold text-fg">{project.title}</h4>
      <p className="mt-2 text-sm leading-relaxed">{project.summary}</p>
      <TagList label={`Technologies for ${project.title}`} tags={project.stack} />
      <div className="mt-auto">
        <ProjectLinks links={project.links} compact />
      </div>
    </Card>
  )
}