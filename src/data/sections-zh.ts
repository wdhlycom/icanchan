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
    title: '禅科学',
    kicker: '用今天的语言重讲',
    description: '禅说的那些关于「心」的话，用今天的语言重讲一遍。对得上的、对不上的，都照实说。',
    lead: '无我、注意力、默认模式网络、呼吸练习下的杏仁核。这一栏不用信仰的语言讲禅，用实验室、概率和可证伪性来讲，并在证据薄弱的地方直说。',
    points: [
      '无我，与默认模式网络',
      '呼吸练习前额叶—杏仁核的调节',
      '洞见：哪些可测量，哪些只是故事',
      '正念研究在哪里越界了',
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
