export interface ExperienceEntry {
  id: string
  organization: string
  role: string
  period: string
  location?: string
  highlights: string[]
  tools: string[]
}

// Only statements supported by the resume or confirmed by the owner. No unverified metrics.
export const experience: ExperienceEntry[] = [
  {
    id: 'lemmer',
    organization: 'Lemmer Spray Systems',
    role: 'AI and Machine Learning Student (Micro-placement)',
    period: 'July to August 2025',
    highlights: [
      'Worked on a surface-detection system using computer vision and object detection.',
      'Worked on a robotic arm as part of the project.',
      'Documented the codebase and development process so future updates are easier.',
      'Coordinated with cross-functional teammates on project timelines.',
    ],
    tools: ['Python', 'YOLOv8', 'OpenCV', 'Raspberry Pi', 'Arduino', 'Git'],
  },
  {
    id: 'propall',
    organization: 'PropAll',
    role: 'Data Analyst Intern',
    period: 'February to March 2023',
    location: 'Remote',
    highlights: [
      'Collected and standardized more than 500 Bangalore property records with Python, preparing them for machine learning use.',
      'Analyzed the data for trends and built dashboards for real-time interpretation.',
      'Worked with feedback from the CTO.',
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Excel', 'Google Sheets'],
  },
  {
    id: 'aw',
    organization: 'A&W',
    role: 'Front Staff, then Team Lead from September 2025',
    period: 'April 2024 to present',
    location: 'Part-time',
    highlights: [
      'Lead a front-line team during daily operations, with customer service and cash handling.',
      'Act as manager and make operational decisions when the supervisor is unavailable.',
      'Train and mentor new employees.',
    ],
    tools: ['Leadership', 'Communication', 'Time management'],
  },
  {
    id: 'agakhan',
    organization: 'Aga Khan Education Services',
    role: 'Regional Level Data Lead and Analyst (Volunteer)',
    period: 'March 2021 to February 2024',
    highlights: [
      'Led data initiatives for regional education programs.',
      'Analyzed and maintained datasets to identify trends that informed decisions.',
      'Built interactive dashboards for real-time visualization.',
      'Worked across teams to streamline data collection.',
    ],
    tools: ['Excel', 'Google Workspace', 'R', 'SQL (PostgreSQL)'],
  },
]

export const leadership: string[] = [
  'Data Science and AI Club, Executive Member',
  'International Student Mentor and Science Student Mentor',
  'Orientation Leader, Fall 2024',
  'Stars for Code, Programming Head and Instructor',
]