export type Locale = 'en' | 'zh';

export const locales: Locale[] = ['en', 'zh'];

export const langTag: Record<Locale, string> = { en: 'en', zh: 'zh' };

export const ui = {
  en: {
    nav: [
      { href: '/start-here/', label: 'Start Here' },
      { href: '/buddhism/', label: 'Buddhism' },
      { href: '/science-of-chan/', label: 'Science' },
      { href: '/practice/', label: 'Practice' },
      { href: '/platform-sutra/', label: 'Sutra' },
      { href: '/journey/', label: 'Journey' },
      { href: '/demos/', label: 'Demos' },
      { href: '/about/', label: 'About' },
    ],
    searchPlaceholder: 'Search',
    themeToDark: 'Switch to dark',
    themeToLight: 'Switch to light',
    langOther: '中文',
    langOtherHref: '/zh/',
    home: 'Home',
    about: 'About',
    backToTop: 'Back to top',
    footerNav: 'Footer',
    chapter: 'Chapter',
    minRead: 'min read',
    previous: 'Previous',
    next: 'Next',
    searchTitle: 'Search',
    searchKicker: 'Look something up',
    searchLead: 'Runs entirely in your browser on a static index. No account, nothing sent anywhere.',
  },
  zh: {
    nav: [
      { href: '/start-here/', label: '入门' },
      { href: '/buddhism/', label: '佛学基础' },
      { href: '/science-of-chan/', label: '禅与科学' },
      { href: '/practice/', label: '修心' },
      { href: '/platform-sutra/', label: '坛经' },
      { href: '/journey/', label: '源流' },
      { href: '/demos/', label: '实验' },
      { href: '/about/', label: '关于' },
    ],
    searchPlaceholder: '搜索',
    themeToDark: '切换到深色',
    themeToLight: '切换到浅色',
    langOther: 'EN',
    langOtherHref: '/',
    home: '首页',
    about: '关于',
    backToTop: '回到顶部',
    footerNav: '页脚',
    chapter: '第',
    minRead: '分钟',
    previous: '上一篇',
    next: '下一篇',
    searchTitle: '搜索',
    searchKicker: '站内检索',
    searchLead: '搜索在自己的浏览器里完成，不用登录，也不上传任何内容。',
  },
} as const;

export const categoryZh: Record<string, string> = {
  Foundations: '基础',
  History: '历史',
  'Platform Sutra': '坛经',
  'Chan & Dao': '禅与道',
  Practice: '修行',
  Review: '回顾',
};

export const t = (locale: Locale) => ui[locale];
