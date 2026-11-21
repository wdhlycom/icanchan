import { isPublished } from '../../lib/publish';
import { getCollection } from 'astro:content';

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* 中文系列文章按 series 分流 URL */
const zhSeriesPath = (entry) => {
  const s = entry.data.series;
  if (s === 'platform-sutra') return `/zh/platform-sutra/${entry.id}/`;
  if (s === 'buddhism-101') return `/zh/series/buddhism-101/${entry.id}/`;
  return `/zh/series/${s}/${entry.id}/`;
};

export async function GET(context) {
  const site = context.site ?? new URL('https://icanchan.com');
  const articles = await getCollection('articlesZh', ({ data }) => !data.draft && isPublished(data));
  const essays = await getCollection('essaysZh', ({ data }) => !data.draft && isPublished(data));
  const now = new Date().toUTCString();

  const items = [
    ...articles.map((entry) => ({
      title: entry.data.title,
      url: zhSeriesPath(entry),
      description: entry.data.description,
      date: entry.data.publishDate,
    })),
    ...essays.map((entry) => ({
      title: entry.data.title,
      url: entry.data.section === 'koans' ? `/zh/koans/${entry.id}/` : `/zh/essays/${entry.id}/`,
      description: entry.data.description,
      date: entry.data.publishDate,
    })),
  ]
    .map((it) => {
      const url = new URL(it.url, site).toString();
      /* pubDate 用每篇自己的发布日期；缺省才退回构建时刻，避免阅读器把全部旧文当新文 */
      const pubDate = it.date ? new Date(it.date).toUTCString() : now;
      return `    <item>
      <title>${esc(it.title)}</title>
      <link>${esc(url)}</link>
      <guid>${esc(url)}</guid>
      <description>${esc(it.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Chan · 中文</title>
    <link>${esc(new URL('/zh/', site).toString())}</link>
    <description>禅是 Zen 的中国源头。用今天的眼光读它，不借信仰。</description>
    <language>zh</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
