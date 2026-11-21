export interface Section {
  slug: string;
  title: string;
  cn: string;
  kicker: string;
  description: string;
  lead: string;
  points: string[];
  color: string;
  icon: string;
  cover: string;
}

export const sections: Section[] = [
  {
    slug: 'buddhism',
    title: 'Buddhism',
    cn: '基础',
    kicker: 'Where to begin',
    description:
      'Buddhism is not meditation with a cushion. It is three trainings — ethics, concentration, wisdom — and Chan is one school inside that whole architecture.',
    lead:
      'The West kept the sitting and dropped the rest. This section puts the whole thing back: the Four Noble Truths, the Eightfold Path, and why meditation alone is half a practice.',
    points: [
      'The Four Noble Truths, without the pious fog',
      'Ethics, concentration, wisdom — and how they hold each other up',
      'Why "just meditate" is only half the training',
      'How to read Buddhist claims as claims, not consolation',
    ],
    color: '#c98a6b',
    icon: '☸',
    cover: '/assets/misty-peaks-kyoto.jpg',
  },
  {
    slug: 'science-of-chan',
    title: 'Science of Chan',
    cn: '科学',
    kicker: 'Evidence, not belief',
    description:
      'Chan made claims about the mind fifteen hundred years before neuroscience could test them. Some hold up. Some do not. We look at both.',
    lead:
      'No-self, attention, the default mode network, the amygdala under breath practice. This section reads Chan next to the lab, and says plainly where the evidence is thin.',
    points: [
      'No-self (anattā) and the default mode network',
      'Breath practice and prefrontal–amygdala regulation',
      'Insight: what is measurable and what is story',
      'Where mindfulness research overreaches',
    ],
    color: '#6f93b8',
    icon: '⌬',
    cover: '/assets/alpine-stillness-swiss.jpg',
  },
  {
    slug: 'platform-sutra',
    title: 'Platform Sutra',
    cn: '坛经',
    kicker: 'The only Chinese Sutra',
    description:
      'The one Chinese text ever honoured with the title "Sutra" — spoken by Huineng, a woodcutter who could barely read.',
    lead:
      'No-thought, no-form, no-abiding. Sudden awakening. This section reads the core text of Chan, with the koans and the arguments that followed it.',
    points: [
      'Who Huineng was, and why he was a revolution',
      'The famous verse: no tree, no mirror',
      'No-thought · no-form · no-abiding',
      'Sudden versus gradual',
      'Koans are not riddles — they are cognitive tools',
    ],
    color: '#b08a4f',
    icon: '卷',
    cover: '/assets/desert-zen-morocco.jpg',
  },
];

export const sectionBySlug = (slug: string) => sections.find((s) => s.slug === slug);
