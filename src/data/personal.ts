interface PersonalLinks {
  github: string | null
  linkedin: string | null
  resume: string | null
}

export const personalName = 'Ayman Momin'
export const personalTagline = 'Computer Science | Data & AI | Software Engineering'

// A null link hides its button. Resume stays null until a web-safe PDF is added to public/resume/.
export const personalLinks: PersonalLinks = {
  github: 'https://github.com/aymanmomin',
  linkedin: 'https://www.linkedin.com/in/aymanmomin/',
  resume: null,
}