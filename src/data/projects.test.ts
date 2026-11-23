import { describe, expect, it } from 'vitest'
import { projects } from './projects'

const byId = (id: string) => projects.find((project) => project.id === id)

describe('projects data', () => {
  it('has unique ids and exactly three featured projects', () => {
    const ids = projects.map((project) => project.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(projects.filter((project) => project.featured)).toHaveLength(3)
  })

  it('only uses https links', () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.url.startsWith('https://')).toBe(true)
      }
    }
  })

  it('marks ChalkUp as in development and nothing else', () => {
    expect(byId('chalkup')?.inDevelopment).toBe(true)
    expect(projects.filter((project) => project.inDevelopment)).toHaveLength(1)
  })

  // Remove this guard once the owner confirms what they did on Gemini.
  it('does not claim Gemini work on Settlerr', () => {
    expect(JSON.stringify(byId('settlerr')).toLowerCase()).not.toContain('gemini')
  })

  it('lists DegreeMap with SQLite, matching the repository', () => {
    const stack = byId('degreemap')?.stack ?? []
    expect(stack).toContain('SQLite')
    expect(stack).not.toContain('PostgreSQL')
  })

  it('does not quote salary figures', () => {
    expect(JSON.stringify(projects)).not.toContain('$')
  })
})