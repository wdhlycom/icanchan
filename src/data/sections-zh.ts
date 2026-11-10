import { sections, type Section } from './sections';

interface SectionText {
  title: string;
  kicker: string;
  description: string;
  lead: string;
  points: string[];
}

/**
 * description 是唯一上页面的说明句；lead / points 留作日后写这一栏的素材，
 * 不渲染在页面上，免得同一个意思在标题区重复三四遍。
 */
export const sectionTextZh: Record<string, SectionText> = {
  buddhism: {
    title: '佛学基础',
    kicker: '入门',
    description: '学佛不只是摆个垫子打坐。',
    lead: '西方留下了打坐，丢掉了其余部分。这一栏把整个东西放回去：四圣谛、八正道，以及为什么只打坐只是一半。',
    points: [
      '四圣谛，去掉那层虔诚的雾',
      '戒、定、慧——三者如何互相支撑',
      '为什么「只管打坐」只算一半',
      '把佛学的主张当主张来读，而不是当安慰',
    ],
  },
  'science-of-chan': {
    title: '禅与科学',
    kicker: '讲证据',
    description: '禅就是心。站得住的和站不住的，都摆出来看。',
    lead: '无我、注意力、默认模式网络、呼吸练习下的杏仁核。这一栏把禅和实验室放在一起读，并在证据薄弱的地方直说。',
    points: [
      '无我与默认模式网络',
      '呼吸练习与前额叶—杏仁核的调节',
      '洞见：哪些可测量，哪些只是故事',
      '正念研究在哪里越界了',
    ],
  },
  practice: {
    title: '修心',
    kicker: '不在蒲团上',
    description: '修行不在蒲团上，在站着、走着、吃着、争着的时候。',
    lead: '不是去不了的闭关，也不是到不了的状态。只是些小小的、可以重复的办法，在生活进行时看着自己的心。',
    points: [
      '观呼吸，而不去改造它',
      '吃饭、走路、说话',
      '情绪来了怎么办',
      '关系里的修行',
      '无常：直面，而不是被安慰',
    ],
  },
  'platform-sutra': {
    title: '坛经',
    kicker: '一部经',
    description: '唯一被尊为「经」的中国文本，出自一个几乎不识字的樵夫。',
    lead: '无念、无相、无住。顿悟。这一栏读禅宗的核心文本，连同它之后的公案与争论。',
    points: [
      '慧能是谁，他为什么是一场革命',
      '那首著名的偈：本来无一物',
      '无念 · 无相 · 无住',
      '顿与渐',
      '公案不是谜语，是心智训练工具',
    ],
  },
  journey: {
    title: '源流',
    kicker: '来路',
    description: '从菩提树下佛陀，到指月的中国祖师。',
    lead: '历史是底子，不是装饰。佛学怎么传、怎么裂、怎么遇上道家与儒家，最后成为禅。',
    points: [
      '佛陀是谁，他到底教了什么',
      '第一次分裂，与大乘的转向',
      '佛学遇见道家的那一刻',
      '达摩面壁：禅的诞生',
      '禅与儒家：出世与入世怎么兼容',
    ],
  },
  demos: {
    title: '实验',
    kicker: '自己试',
    description: '注意力怎么漂走，公案妙在何处。',
    lead: '讲理的人更信演示，不太信文章。这些用最普通的网页技术做，不用装任何东西。',
    points: [
      '盯住一个点三十秒，看注意力怎么跑',
      '顿与渐，放在一条时间线上',
      '把一个公案拆开，一句一句看',
    ],
  },
};

export const localizeSection = (section: Section, locale: 'en' | 'zh') => {
  if (locale === 'en') return { ...section, cn: section.cn };
  const text = sectionTextZh[section.slug];
  if (!text) return section;
  return { ...section, ...text, cn: section.cn };
};

export const localizedSections = (locale: 'en' | 'zh') =>
  sections.map((section) => localizeSection(section, locale));
