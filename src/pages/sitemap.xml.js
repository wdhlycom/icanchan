import { getCollection } from 'astro:content';

const STATIC_PATHS = [
  '/start-here/',
  '/series/',
  '/series/buddhism-101/',
  '/buddhism/',
  '/science-of-chan/',
  '/practice/',
  '/platform-sutra/',
  '/journey/',
  '/demos/',
  '/about/',
  '/search/',
  '/essays/',
];

const pairFor = (path) => (path === '/' ? '/zh/' : `/zh${path}`);

export async function GET(context) {
  const site = context.site ?? new URL('https://icanchan.com');
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const essays = await getCollection('essays', ({ data }) => !data.draft);
  const lastmod = new Date().toISOString().slice(0, 10);

  const enPaths = [
    '/',
    ...STATIC_PATHS,
    ...articles.map((entry) => `/series/buddhism-101/${entry.id}/`),
    ...essays.map((entry) => `/essays/${entry.id}/`),
  ];

  const entry = (path) => {
    const loc = new URL(path, site).toString();
    const zh_loc = new URL(pairFor(path), site).toString();
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>`,
      `    <xhtml:link rel="alternate" hreflang="zh" href="${zh_loc}"/>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '  </url>',
      '  <url>',
      `    <loc>${zh_loc}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>`,
      `    <xhtml:link rel="alternate" hreflang="zh" href="${zh_loc}"/>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '  </url>',
    ].join('\n');
  };

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${enPaths.map(entry).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
