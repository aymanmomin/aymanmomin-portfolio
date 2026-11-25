interface Level {
  id: string
  step: string
  name: string
  text: string
}

const levels: Level[] = [
  {
    id: 'free',
    step: 'Level 1',
    name: 'Free scan',
    text: 'The user gets their scores with a clear next step: buy business services, or follow the do-it-yourself fixes.',
  },
  {
    id: 'basic',
    step: 'Level 2',
    name: 'Paid basic service',
    text: 'The client connects their GA4 dashboard and Search Console and gets the same features in much more detail, plus monthly reports and quick highlights. The call to action stays unless the fix is a big one.',
  },
  {
    id: 'premium',
    step: 'Level 3',
    name: 'Premium',
    text: 'AI does all the background analysis from level 2, and the Ace team carries out the fixes without the client needing to do anything. The client gets a report, and the team asks for authorization only where needed.',
  },
]

// Each step sits a little further right, like a staircase. The motion is skipped for reduced-motion visitors.
const indent = ['ml-0', 'ml-3 sm:ml-10', 'ml-6 sm:ml-20']

export default function SeoStaircase() {
  return (
    <ol aria-label="Three levels of service" className="space-y-3">
      {levels.map((level, i) => (
        <li
          key={level.id}
          className={`stair-in rounded-card border border-line bg-surface-2 p-4 ${indent[i]}`}
          style={{ animationDelay: `${i * 180}ms` }}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-accent-strong">{level.step}</p>
          <p className="mt-1 font-display text-lg font-semibold text-fg">{level.name}</p>
          <p className="mt-1 text-sm">{level.text}</p>
        </li>
      ))}
    </ol>
  )
}