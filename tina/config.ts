import { defineConfig } from 'tinacms';

/* 本地编辑模式：不连 Tina Cloud，内容直接读写本地 Markdown 文件。 */
const branch = '';

const common = [
  { type: 'string', name: 'title', label: '标题', isTitle: true, required: true },
  { type: 'string', name: 'description', label: '简介', ui: { component: 'textarea' } },
  { type: 'string', name: 'section', label: '归属板块' },
  { type: 'string', name: 'category', label: '分类' },
  { type: 'string', name: 'cover', label: '封面图路径' },
  { type: 'number', name: 'readingTime', label: '阅读时长（分钟）' },
  { type: 'boolean', name: 'draft', label: '草稿（不发布）' },
] as const;

const body = {
  type: 'rich-text',
  name: 'body',
  label: '正文',
  isBody: true,
} as const;

const zhArticleFields = [
  ...common,
  { type: 'number', name: 'chapter', label: '章号' },
  { type: 'string', name: 'series', label: '所属系列' },
  body,
];

const zhEssayFields = [
  ...common,
  { type: 'number', name: 'order', label: '序号' },
  { type: 'string', name: 'lang', label: '语言' },
  { type: 'string', name: 'source', label: '来源' },
  body,
];

const essayFields = [
  ...common,
  { type: 'string', name: 'lang', label: '语言' },
  { type: 'string', name: 'source', label: '来源' },
  body,
];

const zhArticleRouter = ({ document }: { document: any }) => {
  const f = document._sys.filename as string;
  if (f.startsWith('sutra-')) return `/zh/platform-sutra/${f}/`;
  if (f.startsWith('masters-')) return `/zh/series/masters/${f}/`;
  if (f.startsWith('stories-')) return `/zh/series/stories/${f}/`;
  if (f.startsWith('glossary-')) return `/zh/series/glossary/${f}/`;
  if (/^\d\d-/.test(f)) return `/zh/series/buddhism-101/${f}/`;
  return undefined;
};

const zhEssayRouter = ({ document }: { document: any }) => {
  const f = document._sys.filename as string;
  const koanFiles = ['03-the-mind-mirror', '04-the-sound-of-one-hand', '06-chan-in-daily-life'];
  if (f.startsWith('koan-') || koanFiles.includes(f)) return `/zh/koans/${f}/`;
  return `/zh/essays/${f}/`;
};

export default defineConfig({
  branch,
  clientId: null,
  token: null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'essaysZh',
        label: '中文短章（禅生活 · 公案 · 禅科学）',
        path: 'src/content/essays-zh',
        format: 'md',
        ui: { router: zhEssayRouter as any },
        fields: zhEssayFields as any,
      },
      {
        name: 'articlesZh',
        label: '中文长文（入门之路 · 坛经 · 专题）',
        path: 'src/content/articles-zh',
        format: 'md',
        ui: { router: zhArticleRouter as any },
        fields: zhArticleFields as any,
      },
      /* 英文和西语两套目前冻结，本地编辑用不上，先不出现在后台，
         免得一打开满眼英文。以后要改这两套，把下面三段放回来即可：
           { name: 'essays',    label: '英文短章',        path: 'src/content/essays',    format: 'md', fields: essayFields },
           { name: 'articles',  label: '英文长文（冻结）', path: 'src/content/articles',  format: 'md', fields: [...common, chapter, body] },
           { name: 'essaysEs',  label: '西语短章（冻结）', path: 'src/content/essays-es', format: 'md', fields: essayFields },
         这三套的正文原文件一个都没动，网站照常读取。 */
    ],
  },
});
