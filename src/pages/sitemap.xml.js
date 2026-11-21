import { isPublished } from '../lib/publish';
import { getCollection } from 'astro:content';

/* 中文站静态页（主版本） */
const ZH_STATIC = [
  '/zh/',
  '/zh/buddhism/',
  '/zh/science-of-chan/',
  '/zh/essays/',
  '/zh/koans/',
  '/zh/platform-sutra/',
  '/zh/lineage/',
  '/zh/origin/',
  '/zh/series/',
  '/zh/series/buddhism-101/',
  '/zh/series/masters/',
  '/zh/series/stories/',
  '/zh/series/glossary/',
  '/zh/search/',
];

/* 英文站静态页（冻结，仍收录） */
const EN_STATIC = [
  '/',
  '/start-here/',
  '/buddhism/',
  '/science-of-chan/',
  '/platform-sutra/',
  '/lineage/',
  '/journey/',
  '/series/',
  '/series/buddhism-101/',
  '/series/masters/',
  '/series/stories/',
  '/series/glossary/',
  '/demos/',
  '/about/',
  '/search/',
  '/essays/',
  '/koans/',
];

/* 西语站静态页：/es/about/ 是不收录的跳转页，只写真页 /es/lineage/ */
const ES_STATIC = ['/es/', '/es/buddhism/', '/es/essays/', '/es/lineage/'];

/* 中文系列文章按 series 分流 URL：坛经逐品走 /zh/platform-sutra/，其余走 /zh/series/<系列>/ */
const zhSeriesPath = (entry) => {
  const s = entry.data.series;
  if (s === 'platform-sutra') return `/zh/platform-sutra/${entry.id}/`;
  if (s === 'buddhism-101') return `/zh/series/buddhism-101/${entry.id}/`;
  return `/zh/series/${s}/${entry.id}/`;
};

export async function GET(context) {
  const site = context.site ?? new URL('https://icanchan.com');
  const articlesZh = await getCollection('articlesZh', ({ data }) => !data.draft && isPublished(data));
  const essaysZh = await getCollection('essaysZh', ({ data }) => !data.draft && isPublished(data));
  const articlesEn = await getCollection('articles', ({ data }) => !data.draft && isPublished(data));
  const essaysEn = await getCollection('essays', ({ data }) => !data.draft && isPublished(data));
  const articlesEs = await getCollection('articlesEs', ({ data }) => !data.draft && isPublished(data));
  const essaysEs = await getCollection('essaysEs', ({ data }) => !data.draft && isPublished(data));

  /* lastmod 说的是「这一页最后改过是哪天」，不是「今天重新生成了一遍」。
     文章有真实发表日期，就用它；栏目页没有可靠的改动日期，宁可不写，
     也不要每回构建都把全站几百页说成今天更新过。 */
  const today = new Date().toISOString().slice(0, 10);
  const ymd = (value) => {
    if (!value) return undefined;
    const s = String(value).trim().slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return undefined;
    /* 本地全量构建会列出还没到期的文章；没上线的页不该顶着一个将来的更新日期。 */
    return s <= today ? s : undefined;
  };
  const staticPaths = (paths) => paths.map((path) => ({ path }));
  const articlePaths = (entries, pathOf) =>
    entries.map((entry) => ({ path: pathOf(entry), lastmod: ymd(entry.data.publishDate) }));

  const zhPaths = [
    ...staticPaths(ZH_STATIC),
    ...articlePaths(articlesZh, zhSeriesPath),
    ...articlePaths(essaysZh, (entry) =>
      entry.data.section === 'koans' ? `/zh/koans/${entry.id}/` : `/zh/essays/${entry.id}/`,
    ),
  ];

  /* 英文系列文章按 series 分流：101 与坛经各有栏目，其余走 /series/<系列>/ */
  const enSeriesPath = (entry) => {
    const s = entry.data.series;
    if (s === 'platform-sutra') return `/platform-sutra/${entry.id}/`;
    if (s === 'buddhism-101') return `/series/buddhism-101/${entry.id}/`;
    return `/series/${s}/${entry.id}/`;
  };

  const enPaths = [
    ...staticPaths(EN_STATIC),
    ...articlePaths(articlesEn, enSeriesPath),
    ...articlePaths(essaysEn, (entry) =>
      entry.data.section === 'koans' ? `/koans/${entry.id}/` : `/essays/${entry.id}/`,
    ),
  ];

  const esPaths = [
    ...staticPaths(ES_STATIC),
    ...articlePaths(articlesEs, (entry) => `/es/series/buddhism-101/${entry.id}/`),
    ...articlePaths(essaysEs, (entry) => `/es/essays/${entry.id}/`),
  ];

  const url = ({ path, lastmod }) => {
    const loc = new URL(path, site).toString();
    const modified = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${loc}</loc>${modified}\n  </url>`;
  };

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...zhPaths, ...enPaths, ...esPaths].map(url).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
