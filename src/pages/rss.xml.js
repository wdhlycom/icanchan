import { getCollection } from 'astro:content';

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET(context) {
  const site = context.site ?? new URL('https://icanchan.com');
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.chapter - b.data.chapter,
  );
  const now = new Date().toUTCString();

  const items = articles
    .map((entry) => {
      const url = new URL(`/series/buddhism-101/${entry.id}/`, site).toString();
      return `    <item>
      <title>${esc(entry.data.title)}</title>
      <link>${esc(url)}</link>
      <guid>${esc(url)}</guid>
      <description>${esc(entry.data.description)}</description>
      <pubDate>${now}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Chan</title>
    <link>${esc(site.toString())}</link>
    <description>Chan is the Chinese source of Zen. Read at the source, with modern eyes.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
