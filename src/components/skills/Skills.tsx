import Section from '../layout/Section'
import Card from '../ui/Card'
import { skillCategories, skillLevels } from '../../data/skills'
import type { SkillLevel } from '../../data/skills'

const levelOrder: SkillLevel[] = ['experienced', 'working', 'project']

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <p className="max-w-2xl">
        Grouped by area. The labels describe how I have used each tool, not a rating.
      </p>
      <ul aria-label="Legend" className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {levelOrder.map((level) => (
          <li key={level}>
            <span aria-hidden="true" className="mr-1.5 text-accent-strong">
              {skillLevels[level].symbol}
            </span>
            {skillLevels[level].label}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <Card key={category.id}>
            <h3 className="font-display text-lg font-semibold text-fg">{category.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-fg"
                >
                  <span aria-hidden="true" className="mr-1.5 text-accent-strong">
                    {skillLevels[skill.level].symbol}
                  </span>
                  <span>{skill.name}</span>
                  <span className="sr-only"> ({skillLevels[skill.level].label})</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}