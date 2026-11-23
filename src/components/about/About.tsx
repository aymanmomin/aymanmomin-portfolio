import Section from '../layout/Section'
import Card from '../ui/Card'
import { aboutParagraphs, interests } from '../../data/about'
import { education } from '../../data/education'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-4 text-base leading-relaxed sm:text-lg">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h3 className="pt-2 font-display text-lg font-semibold text-fg">Interests</h3>
          <ul className="flex flex-wrap gap-2 text-sm">
            {interests.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-line bg-surface px-3 py-1 text-fg"
              >
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <Card>
          <h3 className="font-display text-lg font-semibold text-fg">Education</h3>
          <p className="mt-3 text-fg">{education.school}</p>
          <p className="text-sm">{education.degree}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="inline text-muted">Major: </dt>
              <dd className="inline text-fg">{education.major}</dd>
            </div>
            <div>
              <dt className="inline text-muted">Minor: </dt>
              <dd className="inline text-fg">{education.minor}</dd>
            </div>
            <div>
              <dt className="inline text-muted">Concentration: </dt>
              <dd className="inline text-fg">{education.concentration}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm">{education.period}</p>
          <p className="text-sm text-accent-strong">{education.status}</p>
          <h4 className="mt-5 text-sm font-semibold text-fg">Selected coursework</h4>
          <ul className="mt-2 space-y-1 text-sm">
            {education.coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  )
}