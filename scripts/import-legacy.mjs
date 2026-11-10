/**
 * 把两个旧项目里没搬过来的内容全部收进 canchan。
 *  - chansurf/src/data/content.ts: 六篇三语短文、四禅旅、四器物
 *  - _legacy_hugo/content/series/buddhism-101/: 两篇独立英文草稿
 * 只生成文件，不改任何旧项目原件。可重复运行。
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const CHANSURF = 'C:/Users/Holive Hu/Desktop/chansurf/src/data/content.ts';
const HUGO_DIR = path.join(ROOT, '_legacy_hugo/content/series/buddhism-101');

const y = (s) => JSON.stringify(String(s ?? ''));
const ensure = (d) => fs.mkdirSync(d, { recursive: true });

/* ---------- 1. 解析 chansurf 的 content.ts ---------- */
const raw = fs.readFileSync(CHANSURF, 'utf8');
const from = raw.indexOf('export const articles');
const to = raw.indexOf('export function getLocalized');
let code = raw.slice(from, to);
code = code
  .replace(/export const articles:\s*Article\[\]\s*=/, 'var articles =')
  .replace(/export const retreats:\s*Retreat\[\]\s*=/, 'var retreats =')
  .replace(/export const products:\s*Product\[\]\s*=/, 'var products =')
  .replace(/export interface [\s\S]*?\n}\n/g, '');
const { articles, retreats, products } = vm.runInNewContext(
  code + '\n;({ articles, retreats, products })',
  {},
);

const essaySchema = (title, description, chapter, category, cover, readingTime, lang, source) =>
  [
    '---',
    `title: ${y(title)}`,
    `description: ${y(description)}`,
    `chapter: ${chapter}`,
    `category: ${y(category)}`,
    `cover: ${y(cover)}`,
    `readingTime: ${readingTime}`,
    `lang: ${lang}`,
    `source: ${source}`,
    'draft: false',
    '---',
    '',
  ].join('\n');

const dirs = {
  en: path.join(ROOT, 'src/content/essays'),
  zh: path.join(ROOT, 'src/content/essays-zh'),
  es: path.join(ROOT, 'src/content/essays-es'),
};
Object.values(dirs).forEach(ensure);

const langs = ['en', 'es', 'zh'];
for (const a of articles) {
  const name = `${String(a.chapter).padStart(2, '0')}-${a.slug}.md`;
  const cover = `/assets/${a.slug}.jpg`;
  for (const lang of langs) {
    let body = a.body[lang].join('\n\n');
    if (lang === 'zh') {
      // 用户指定：中文里「你能禅吗」这种直译不成立
      body = body.replace(/你能禅吗/g, '你会参禅吗');
    }
    const fm = essaySchema(
      a.title[lang],
      a.subtitle[lang],
      a.chapter,
      a.category[lang],
      cover,
      a.readingTime,
      lang,
      'chansurf',
    );
    fs.writeFileSync(path.join(dirs[lang], name), fm + body + '\n', 'utf8');
  }
}

/* ---------- 2. 旧 Hugo 的两篇独立英文草稿 ---------- */
const legacy = [
  { file: 'what-is-buddhism.md', slug: 'what-is-buddhism', cover: '/assets/start-theory.jpg' },
  { file: 'four-noble-truths.md', slug: 'the-four-noble-truths', cover: '/assets/start-experience.jpg' },
];
legacy.forEach((item, i) => {
  const text = fs.readFileSync(path.join(HUGO_DIR, item.file), 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`frontmatter 解析失败: ${item.file}`);
  const meta = Object.fromEntries(
    m[1].split(/\r?\n/).filter((l) => l.includes(':')).map((l) => {
      const p = l.indexOf(':');
      return [l.slice(0, p).trim(), l.slice(p + 1).trim().replace(/^"|"$/g, '')];
    }),
  );
  let body = m[2]
    .replace(/\r\n/g, '\n')
    .replace(/^\s*#\s+[^\n]*\n/, '') // 标题已在 frontmatter
    .replace(/\[([^\]]+)\]\(\/[^)]*\)/g, '$1') // 旧站失效内链转成纯文字，内容一字不删
    .trim();
  const name = `${String(articles.length + i + 1).padStart(2, '0')}-${item.slug}.md`;
  const words = body.split(/\s+/).length;
  const fm = essaySchema(
    meta.title,
    meta.description,
    articles.length + i + 1,
    'Foundations',
    item.cover,
    Math.max(2, Math.round(words / 220)),
    'en',
    'hugo-draft',
  );
  fs.writeFileSync(path.join(dirs.en, name), fm + body + '\n', 'utf8');
});

/* ---------- 3. 禅旅 / 器物数据，三语原样保留 ---------- */
const dataDir = path.join(ROOT, 'src/data');
fs.writeFileSync(path.join(dataDir, 'retreats.json'), JSON.stringify(retreats, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2) + '\n', 'utf8');

console.log(`短章：en ${articles.length + legacy.length} / zh ${articles.length} / es ${articles.length}`);
console.log(`禅旅 ${retreats.length} 条、器物 ${products.length} 条 → src/data/*.json`);
