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
    slug: 'practice',
    title: 'Practice',
    cn: '修心',
    kicker: 'Off the cushion',
    description:
      'The real practice happens standing, walking, eating, arguing. Methods you can carry into an ordinary Tuesday.',
    lead:
      'Not retreats you cannot attend. Not states you cannot reach. Small, repeatable ways of watching the mind while life is happening.',
    points: [
      'Watching the breath, without engineering it',
      'Eating, walking, talking',
      'What to do when an emotion lands',
      'Practice inside relationships',
      'Impermanence, faced rather than soothed',
    ],
    color: '#5f9a83',
    icon: '❋',
    cover: '/assets/curated-hero.jpg',
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
  {
    slug: 'journey',
    title: 'Journey',
    cn: '脉络',
    kicker: 'From the tree to Huineng',
    description:
      'From the Buddha under the bodhi tree to a Chinese patriarch who said the scriptures were a finger pointing at the moon.',
    lead:
      'History as the deep background, not decoration. How Buddhism travelled, split, met Daoism and Confucianism, and became Chan.',
    points: [
      'Who the Buddha was, and what he actually taught',
      'The first split, and the Mahayana turn',
      'When Buddhism met Daoism',
      'Bodhidharma’s wall: the birth of Chan',
      'Chan and Confucianism: leaving and entering the world',
    ],
    color: '#7d8a7a',
    icon: '↟',
    cover: '/assets/coastal-sanctuary-portugal.jpg',
  },
  {
    slug: 'demos',
    title: 'Demos',
    cn: '实验',
    kicker: 'Try it, do not take our word',
    description:
      'Small interactive experiments. Watch your own attention drift. See how a koan works when its context is restored.',
    lead:
      'The rational reader trusts a demonstration more than an essay. These are being built in plain JavaScript — no heavy framework, nothing to install.',
    points: [
      'Fix your gaze for thirty seconds and watch attention move',
      'Sudden and gradual, laid out on one timeline',
      'A koan taken apart, line by line',
    ],
    color: '#8a9a5b',
    icon: '◈',
    cover: '/assets/start-space.jpg',
  },
];

export const sectionBySlug = (slug: string) => sections.find((s) => s.slug === slug);
