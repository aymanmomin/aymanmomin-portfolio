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

  // Keeps the Gemini wording honest: the repo shows the Gemini code was committed by a teammate.
  it('describes Gemini as a contribution, not sole authorship', () => {
    const role = byId('settlerr')?.role ?? ''
    expect(role).toContain('contributed to the Gemini API integration')
    expect(role).not.toMatch(/implemented|built the (whole|entire|complete)/i)
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