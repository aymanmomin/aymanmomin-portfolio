import type { Stop } from './types'

export const crossingStops: Stop[] = [
  {
    id: 'two-weeks',
    number: 8,
    act: 'crossing',
    period: 'Spring 2023',
    headline: 'Two weeks to decide',
    stat: { value: '2 weeks', label: 'to decide to move to Canada' },
    media: { id: 'stop-8-photo', kind: 'photo', label: 'Photo: the move, the airport or a last day in India' },
    express: {
      paragraphs: [
        'In spring 2023 I decided to move to Canada, and I made the decision in about two weeks. I was accepted at UCalgary, Waterloo, McMaster and UAlberta. I chose UCalgary for my cousins, my friends, the climate and a scholarship.',
      ],
      popup: {
        title: 'Why Calgary',
        paragraphs: ['I was accepted at the University of Calgary, Waterloo, McMaster and the University of Alberta. Four things decided it.'],
        bullets: ['Cousins nearby', 'Friends', 'The climate', 'A scholarship'],
      },
    },
  },
]

export const canadaStops: Stop[] = [
  {
    id: 'from-scratch',
    number: 9,
    act: 'canada',
    period: 'September 2023 onward',
    headline: 'Starting from scratch',
    stat: { value: '1+ year', label: 'as Team Lead at A&W' },
    media: { id: 'stop-9-photo', kind: 'photo', label: 'Photo: first year at UCalgary' },
    express: {
      paragraphs: [
        "In September 2023 I transferred to UCalgary, taking first-, second- and third-year courses all at once, and I knew nobody on campus. As an introvert, it took about a year to make friends. Alongside classes I worked part-time (The Source, StyleDemocracy, and A&W, where I've been Team Lead since September 2025) and built a network through the Data Science and AI Club, mentoring and orientation leading.",
      ],
      popup: {
        title: 'Work and community in Calgary',
        paragraphs: ['It took about a year to feel settled. This is what filled that time.'],
        bullets: [
          'The Source: October to December 2023',
          'StyleDemocracy: March to May 2024',
          'A&W: April 2024 to now, Team Lead since September 2025',
          'True North Security: event management contract in Calgary',
          'Data Science and AI Club, mentoring and orientation leading',
        ],
      },
    },
  },
  {
    id: 'real-work',
    number: 10,
    act: 'canada',
    period: '2025 to 2026',
    headline: 'Real work in Canada',
    stat: { value: '+10%', label: 'model accuracy at Lemmer Spray Systems' },
    media: { id: 'stop-10-photo', kind: 'photo', label: 'Screenshot: the AI SEO platform' },
    express: {
      paragraphs: [
        'In January 2025 I migrated Google Analytics from UA to GA4 for Ace SEO Consulting, a Calgary marketing company, with automated dashboards that saved 10+ hours a month. I have freelanced for them regularly since early 2025, and from late 2025 to summer 2026 I built their AI-powered SEO platform. In July 2025 I did a micro-placement at Lemmer Spray Systems, where I improved a surface-detection model by 10% and built a robotic arm, and in summer 2026 I was an undergraduate research assistant at the University of Calgary.',
      ],
      popup: {
        title: 'AI-powered SEO and AEO platform',
        paragraphs: [
          'Built for Ace SEO Consulting, part-time, from late 2025 to summer 2026. A client enters their website URL and the platform fetches all publicly available information, then scores the site on SEO, AEO (answer-engine optimization), website content and local reach.',
          'There are three levels of service.',
        ],
        diagram: 'seo-staircase',
        media: [
          { id: 'stop-10-seo-scan', kind: 'photo', label: 'Screenshot: the scan results' },
          { id: 'stop-10-seo-report', kind: 'photo', label: 'Screenshot: the report view' },
        ],
        todo: ['My role on the project', 'Tech stack'],
      },
    },
  },
  {
    id: 'whats-next',
    number: 11,
    act: 'canada',
    period: '2025 to 2027',
    headline: "Failing successfully, and what's next",
    stat: { value: 'Feb 2027', label: 'graduation, and a first industry role next' },
    media: { id: 'stop-11-photo', kind: 'photo', label: 'Photo: me today' },
    express: {
      paragraphs: [
        "I tried for internships in Canada and didn't land one, but I learned how much more competitive the market is than India's. I graduate in February 2027 and I'm looking for a first industry role, in data first, ideally in finance, and then in software. Wherever I've been, I've ended up teaching and leading, and I want to keep doing that at work.",
      ],
      popup: {
        title: 'Outside of work',
        paragraphs: [
          'I speak English, Hindi and Gujarati, plus elementary French. Outside of work I play chess, do public speaking and follow personal finance.',
        ],
      },
    },
  },
]