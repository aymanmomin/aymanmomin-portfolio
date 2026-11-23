import Section from '../layout/Section'
import FeaturedProjectCard from './FeaturedProjectCard'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

const featured = projects.filter((project) => project.featured)
const others = projects.filter((project) => !project.featured)

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <p className="max-w-2xl">
        Three projects in more detail, followed by smaller ones. Each card says whether it was a
        team or individual project.
      </p>

      <h3 className="mt-10 font-display text-xl font-semibold text-fg">Featured</h3>
      <ul className="mt-4 space-y-4">
        {featured.map((project) => (
          <li key={project.id}>
            <FeaturedProjectCard project={project} />
          </li>
        ))}
      </ul>

      <h3 className="mt-14 font-display text-xl font-semibold text-fg">More projects</h3>
      <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  )
}