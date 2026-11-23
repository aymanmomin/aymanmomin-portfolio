import { describe, expect, it } from 'vitest'
import { skillCategories, skillLevels } from './skills'

describe('skills data', () => {
  it('uses only defined levels', () => {
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        expect(Object.keys(skillLevels)).toContain(skill.level)
      }
    }
  })

  it('has no duplicate skills within a category', () => {
    for (const category of skillCategories) {
      const names = category.skills.map((skill) => skill.name)
      expect(new Set(names).size).toBe(names.length)
    }
  })

  it('has unique category ids', () => {
    const ids = skillCategories.map((category) => category.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})