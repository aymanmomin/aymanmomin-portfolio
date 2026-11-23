export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  category: string
  kind?: string
  summary: string
  role?: string
  stack: string[]
  stackNote?: string
  inDevelopment?: boolean
  featured?: boolean
  links: ProjectLink[]
  linkNote?: string
}

// Only claims supported by the owner, the resume or the public repositories.
// A project with no links simply shows no buttons. Add a link here once it is confirmed public.
export const projects: Project[] = [
  {
    id: 'chalkup',
    title: 'ChalkUp',
    category: 'Full-stack application, product development',
    kind: 'University team project',
    summary:
      'A climbing performance and coaching platform that brings progress tracking, instructor matching and booking into one place for climbers and instructors.',
    role: 'My areas are performance analysis and instructor matching, booking and scheduling (each with a teammate), UI/UX design and mockups, and the frontend including the mobile experience. The mockups are complete and I am currently building the frontend. The team has worked on the initial infrastructure (authentication, database schema, Docker), and the backend features are next.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Clerk', 'Docker', 'Figma'],
    stackNote: 'Planned and in-progress stack. The project is still in development.',
    inDevelopment: true,
    featured: true,
    links: [],
    linkNote: 'The source code is in a private repository.',
  },
  {
    id: 'financial-reality',
    title: "The Independent Student's Financial Reality",
    category: 'Data visualization, analytics',
    kind: 'Individual academic project',
    summary:
      'An interactive visualization of about 2.5 years of my own financial records, built to understand how my income, spending and savings changed over time. The public dashboard masks the financial figures.',
    role: 'Individual project. I consolidated records from chequing, savings, investment and credit card accounts in Excel, cleaned and organized them with Python, explored them in Excel and Tableau, and built the interactive D3.js visualizations.',
    stack: ['Python', 'Excel', 'Tableau', 'D3.js'],
    featured: true,
    links: [
      {
        label: 'Open public dashboard',
        url: 'https://aymanmomin.github.io/CPSC-582-Individual-Project/working_dir/visualization/financial_story_dashboard.html',
      },
    ],
  },
  {
    id: 'settlerr',
    title: 'Settlerr',
    category: 'Web application, hackathon',
    kind: 'Hack the Change 2025, team of three',
    summary:
      'A platform that helps newcomers to Calgary connect with others, complete city onboarding tasks and join local events.',
    role: 'I built the initial React app and user-facing features such as login, profile customization, friend management and task uploads. The backend and AWS services were mostly built by teammates.',
    stack: ['React.js', 'JavaScript', 'FastAPI', 'AWS DynamoDB', 'AWS S3', 'face-api.js'],
    stackNote: 'React.js and JavaScript are my frontend work. The rest is the team stack described on Devpost.',
    featured: true,
    links: [{ label: 'View on Devpost', url: 'https://devpost.com/software/settlerr' }],
  },
  {
    id: 'salary-analysis',
    title: 'Canadian Data Science Salary Analysis',
    category: 'Data analysis',
    summary:
      'Compares data science salary ranges across Canadian provinces using public labour-market sources, with an interactive Streamlit dashboard.',
    stack: ['Python', 'Pandas', 'Matplotlib', 'Streamlit'],
    links: [
      { label: 'Live dashboard', url: 'https://data-science-salaries-canada.streamlit.app/' },
      { label: 'Source', url: 'https://github.com/aymanmomin/data-science-salaries-canada' },
    ],
  },
  {
    id: 'ego-network',
    title: 'Facebook Ego Network Analysis for Political Outreach',
    category: 'Network analysis',
    summary:
      'An academic network analysis of Facebook ego networks, exploring how graph structure can inform outreach strategy.',
    stack: ['Python', 'NetworkX', 'Pandas', 'scikit-learn'],
    links: [
      {
        label: 'Source',
        url: 'https://github.com/aymanmomin/facebook-ego-network-analysis-for-political-outreach-optimization',
      },
    ],
  },
  {
    id: 'degreemap',
    title: 'DegreeMap',
    category: 'Web application',
    kind: 'Team project',
    summary: 'A course progress and degree planning website built with a team for a university course.',
    stack: ['React.js', 'Node.js', 'SQLite'],
    links: [{ label: 'Source', url: 'https://github.com/aymanmomin/degree-map' }],
  },
  {
    id: 'homeseek',
    title: 'Homeseek',
    category: 'Web application',
    summary: 'A real estate web application built in React with a focus on human-computer interaction and usability.',
    stack: ['React.js'],
    links: [],
  },
  {
    id: 'nexus',
    title: 'Nexus Inventory Management',
    category: 'Desktop application',
    summary:
      'A desktop inventory app with local SQLite storage covering products, suppliers, purchases, sales and printable invoices. An educational project, not production software.',
    stack: ['Python', 'Tkinter', 'SQLite'],
    links: [],
  },
  {
    id: 'alberta-class-7',
    title: 'Alberta Class 7 Practice Test',
    category: 'Web application',
    summary:
      "Practice quizzes and test-style scenarios for preparing for Alberta's Class 7 learner's licence knowledge test. Not affiliated with the Government of Alberta.",
    stack: ['React.js'],
    links: [{ label: 'Live site', url: 'https://aymanmomin.github.io/alberta-class-7/' }],
  },
  {
    id: 'timeliness-dashboard',
    title: 'Understanding Timeliness Dashboard',
    category: 'Data visualization',
    summary: 'A Tableau dashboard built from Excel data.',
    stack: ['Excel', 'Tableau'],
    links: [
      {
        label: 'View on Tableau Public',
        url: 'https://public.tableau.com/views/UnderstandingTimeliness_17713620933600/Dashboard3?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
      },
    ],
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits Behavioral Analytics Tracker',
    category: 'Data analysis',
    summary: 'Python tooling for tracking and analyzing habit data, with a published web page.',
    stack: ['Python', 'Pandas', 'NumPy', 'XlsxWriter'],
    links: [
      { label: 'Live site', url: 'https://aymanmomin.github.io/atomic-habits-tracker/' },
      { label: 'Source', url: 'https://github.com/aymanmomin/atomic-habits-tracker' },
    ],
  },
]