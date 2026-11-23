import Section from '../layout/Section'
import Card from '../ui/Card'
import { experience, leadership } from '../../data/experience'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-4">
        {experience.map((entry) => (
          <li key={entry.id}>
            <Card>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-xl font-semibold text-fg">{entry.organization}</h3>
                <p className="text-sm text-accent-strong">{entry.period}</p>
              </div>
              <p className="mt-1 text-fg">
                {entry.role}
                {entry.location ? <span className="text-muted">{` \u00B7 ${entry.location}`}</span> : null}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-accent">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <ul aria-label={`Tools and skills at ${entry.organization}`} className="mt-4 flex flex-wrap gap-2">
                {entry.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-fg"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ol>

      <h3 className="mt-10 font-display text-lg font-semibold text-fg">Leadership and community</h3>
      <ul className="mt-3 space-y-1 text-sm">
        {leadership.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  )
}