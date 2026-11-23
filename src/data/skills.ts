export type SkillLevel = 'experienced' | 'working' | 'project'

export const skillLevels: Record<SkillLevel, { label: string; symbol: string }> = {
  experienced: { label: 'Experienced with', symbol: '\u25CF' },
  working: { label: 'Working knowledge', symbol: '\u25D0' },
  project: { label: 'Project experience', symbol: '\u25CB' },
}

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

// Levels are my own judgement from resume and project evidence. Edit freely.
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming languages',
    skills: [
      { name: 'Python', level: 'experienced' },
      { name: 'SQL', level: 'experienced' },
      { name: 'Java', level: 'working' },
      { name: 'C++', level: 'working' },
      { name: 'R', level: 'working' },
      { name: 'JavaScript', level: 'working' },
    ],
  },
  {
    id: 'web',
    title: 'Web and frontend',
    skills: [
      { name: 'React.js', level: 'experienced' },
      { name: 'HTML and CSS', level: 'working' },
      { name: 'Node.js', level: 'working' },
      { name: 'REST APIs', level: 'working' },
      { name: 'D3.js', level: 'working' },
      { name: 'FastAPI', level: 'project' },
    ],
  },
  {
    id: 'data',
    title: 'Data and analytics',
    skills: [
      { name: 'Pandas', level: 'experienced' },
      { name: 'NumPy', level: 'experienced' },
      { name: 'Tableau', level: 'experienced' },
      { name: 'Excel', level: 'experienced' },
      { name: 'Data cleaning', level: 'experienced' },
      { name: 'Data visualization', level: 'experienced' },
      { name: 'Exploratory data analysis', level: 'experienced' },
      { name: 'Matplotlib', level: 'working' },
      { name: 'Power BI', level: 'working' },
      { name: 'NetworkX', level: 'working' },
      { name: 'Streamlit', level: 'project' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 'working' },
      { name: 'SQLite', level: 'working' },
      { name: 'AWS DynamoDB', level: 'project' },
    ],
  },
  {
    id: 'ai',
    title: 'AI and machine learning',
    skills: [
      { name: 'scikit-learn', level: 'project' },
      { name: 'YOLOv8', level: 'project' },
      { name: 'OpenCV', level: 'project' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools and platforms',
    skills: [
      { name: 'Git', level: 'experienced' },
      { name: 'GitHub', level: 'working' },
      { name: 'Figma', level: 'working' },
      { name: 'Docker', level: 'project' },
      { name: 'AWS S3', level: 'project' },
      { name: 'Raspberry Pi', level: 'project' },
      { name: 'Arduino', level: 'project' },
    ],
  },
]