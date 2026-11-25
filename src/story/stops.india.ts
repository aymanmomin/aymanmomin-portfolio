import type { Stop } from './types'

export const indiaStops: Stop[] = [
  {
    id: 'tech-guy',
    number: 1,
    act: 'india',
    period: 'Grades 5 to 10, about 2015 to 2020',
    headline: "The school's go-to tech person",
    stat: { value: '5', label: 'sports and arts events with medals' },
    media: { id: 'stop-1-photo', kind: 'photo', label: 'Photo: school years, medals or sports day' },
    express: {
      paragraphs: [
        'At school I was the go-to tech person, and at home I helped my dad with Excel dashboards and data analysis. I also won medals in swimming, shot put, karate and running. In Grade 8 I learned Java and loved it, right up until object-oriented programming.',
      ],
      popup: {
        title: 'Awards and recognition',
        paragraphs: ['A few of the awards from those years.'],
        bullets: ['3rd rank in school for the 10th boards', 'Star Child award', 'Academic award', 'Best Pupil award'],
      },
    },
  },
  {
    id: 'lockdown',
    number: 2,
    act: 'india',
    period: 'March to May 2020',
    headline: 'The lockdown pivot',
    stat: { value: 'About 3 months', label: 'to teach myself Python and web development' },
    media: { id: 'stop-2-photo', kind: 'photo', label: 'Photo: my setup or an early project from 2020' },
    express: {
      paragraphs: [
        'After my board exams, lockdown hit and the days suddenly opened up. I used that time to teach myself Python and web development from scratch. Those skills are what I built my first business on.',
      ],
      popup: {
        title: 'Learning on my own',
        paragraphs: [
          'Between March and May 2020 I taught myself Python and web development.',
          'By the end of 2020 I had started the web development agency described in the next stop.',
        ],
      },
    },
  },
  {
    id: 'agency',
    number: 3,
    act: 'india',
    period: 'End of 2020 to 2022',
    headline: 'A web agency, alongside the IB',
    special: 'currency',
    stat: { value: '\u20B950,000 to \u20B93 lakh+', label: 'a year, from solo to a hired team' },
    media: { id: 'stop-3-photo', kind: 'photo', label: 'Photo or screenshot: an agency project' },
    express: {
      paragraphs: [
        'At the end of 2020 I started a web development agency while doing the IB Diploma, mostly online. In early 2021 I built a Python app for a client called Nexus, and the services grew into digital marketing, SEO, websites, desktop apps and web apps. By mid-2021 I was hiring other freelancers and developers.',
      ],
      popup: {
        title: 'The agency, in more detail',
        paragraphs: [
          'I ran the agency alongside the IB Diploma (April 2020 to July 2022), which was mostly online.',
          'It started solo and part-time. Once I hired other freelancers and developers in mid-2021, the income moved up. The conversions on this page are my own estimates.',
        ],
        bullets: ['Digital marketing', 'SEO', 'Websites', 'Desktop apps', 'Web apps'],
      },
    },
  },
  {
    id: 'leading',
    number: 4,
    act: 'india',
    period: '2021 to 2022',
    headline: 'Leading while still in school',
    stat: { value: '52', label: 'experts featured in 100+ videos I edited' },
    media: { id: 'stop-4-photo', kind: 'photo', label: 'Photo: IT Club or Podar MUN' },
    express: {
      paragraphs: [
        'I joined the school IT Club in April 2021 and became its President within a few months, then led it for about a year until I left. I was also Head of IT for Podar MUN, with 100+ participants, and a video editor on the school team. From May to August 2021 I edited 100+ short videos featuring 52 experts, including Gary Vee, Patrick Bet-David and Ranveer Allahbadia.',
      ],
      popup: {
        title: 'Leading and editing, 2021',
        paragraphs: ['The roles, in order.'],
        bullets: [
          'School IT Club: joined in April 2021, became President within a few months, led it for about a year until I left',
          'Head of IT, Podar MUN (100+ participants)',
          'Video editor on the school team',
          'Edited 100+ short videos featuring 52 experts, May to August 2021',
        ],
      },
    },
  },
  {
    id: 'finding-data',
    number: 5,
    act: 'india',
    period: '2021 to 2022',
    headline: 'Finding data',
    stat: { value: '3 years', label: 'as a volunteer data lead and analyst' },
    media: { id: 'stop-5-photo', kind: 'photo', label: 'Photo: working with data (no private data shown)' },
    express: {
      paragraphs: [
        'I was working with data well before I knew it was a career: from March 2021 I volunteered as a regional data lead and analyst for Aga Khan Education Services. Around the end of 2021 I realized data science could be my path, got into investing and finance, and in early 2022 started offering data analysis services. Finance is still the domain I most want to work in.',
      ],
      popup: {
        title: 'Aga Khan Education Services',
        paragraphs: ['Volunteer role, March 2021 to February 2024.'],
        bullets: [
          'Led data initiatives for regional education programs',
          'Analyzed and maintained datasets to find trends that informed decisions',
          'Built interactive dashboards for real-time visualization',
          'Worked across teams to streamline data collection',
        ],
      },
    },
  },
  {
    id: 'first-day',
    number: 6,
    act: 'india',
    period: 'April to May 2022',
    headline: 'The first day at school',
    stat: { value: '1st', label: 'day inside my school was my final IB exam' },
    media: { id: 'stop-6-photo', kind: 'photo', label: 'Photo: my school, or exam day' },
    express: {
      paragraphs: [
        'I spent most of high school behind a screen. When lockdown ended in spring 2022, the first time I physically walked into my school was the day of my final IB exam.',
      ],
      popup: {
        title: 'The IB, mostly online',
        paragraphs: [
          'I did the IB Diploma between April 2020 and July 2022, mostly online.',
          'My final exam, in April or May 2022, was the first day I was physically in the building.',
        ],
      },
    },
  },
  {
    id: 'atlas',
    number: 7,
    act: 'india',
    period: 'August 2022 to 2023',
    headline: 'Atlas, AI Unplugged and the people I met',
    stat: { value: '500+', label: 'Bangalore properties cleaned for an ML pipeline' },
    media: { id: 'stop-7-photo', kind: 'photo', label: 'Photo: Atlas campus or an AI Unplugged episode' },
    express: {
      paragraphs: [
        'I chose to stay in India for a year of a BSc (Hons) in AI/ML at Atlas SkillTech University and Data Science with INSOFE, and I hosted and produced AI Unplugged, a show with 10 speakers and 1k+ viewers. At events and tech talks I met Tim Cook, Piyush Bansal and Karan Johar. In February 2023 I also did my first data analyst internship, cleaning and standardizing 500+ Bangalore properties for an ML pipeline at PropAll.',
      ],
      popup: {
        title: 'AI Unplugged, PropAll and the people I met',
        paragraphs: ['The details behind the stop.'],
        bullets: [
          'AI Unplugged: hosted and produced, March to May 2023, 10 speakers, 1k+ viewers',
          'PropAll: remote data analyst internship, February to March 2023. Scraped, cleaned and standardized 500+ Bangalore properties for an ML pipeline',
          'Met Tim Cook, Piyush Bansal and Karan Johar through events and tech talks',
        ],
        media: [
          { id: 'stop-7-tim-cook', kind: 'photo', label: 'Photo with Tim Cook' },
          { id: 'stop-7-piyush-bansal', kind: 'photo', label: 'Photo with Piyush Bansal' },
          { id: 'stop-7-karan-johar', kind: 'photo', label: 'Photo with Karan Johar' },
        ],
      },
    },
  },
]