/**
 * 把旧 Hugo 站的 30 章英文稿转成 Astro 内容文件。
 * 源：_legacy_hugo/content/series/Journey of Buddhism/EN-*.md（无 front matter）
 * 目标：src/content/articles/NN-slug.md（带 front matter）
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.join('_legacy_hugo', 'content', 'series', 'Journey of Buddhism');
const OUT = path.join('src', 'content', 'articles');

const COVERS = [
  'misty-peaks-kyoto',
  'alpine-stillness-swiss',
  'desert-zen-morocco',
  'coastal-sanctuary-portugal',
  'the-sound-of-one-hand',
  'the-mind-mirror',
  'what-is-chan',
  'the-rational-path',
  'immediate-awakening',
  'chan-in-daily-life',
  'curated-hero',
  'escapes-hero',
  'start-experience',
  'start-space',
  'start-theory',
];

const SECTION_BY_CHAPTER = (n) => {
  if (n <= 7) return 'buddhism';
  if (n <= 13) return 'journey';
  if (n <= 18) return 'platform-sutra';
  if (n <= 21) return 'journey';
  if (n <= 26) return 'practice';
  if (n <= 28) return 'science-of-chan';
  return 'journey';
};

const CATEGORY_BY_CHAPTER = (n) => {
  if (n <= 7) return 'Foundations';
  if (n <= 13) return 'History';
  if (n <= 18) return 'Platform Sutra';
  if (n <= 21) return 'Chan & Dao';
  if (n <= 28) return 'Practice';
  return 'Review';
};

fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(SRC)
  .filter((f) => /^EN-\d+-.+\.md$/.test(f))
  .sort((a, b) => Number(a.match(/^EN-(\d+)/)[1]) - Number(b.match(/^EN-(\d+)/)[1]));

let totalWords = 0;
const written = [];

for (const file of files) {
  const chapter = Number(file.match(/^EN-(\d+)/)[1]);
  const slug = file
    .replace(/^EN-\d+-/, '')
    .replace(/\.md$/, '')
    .toLowerCase();

  const raw = fs.readFileSync(path.join(SRC, file), 'utf8').replace(/\r\n/g, '\n');
  const lines = raw.split('\n');

  const titleLine = lines.find((l) => /^#\s+/.test(l)) || `# Chapter ${chapter}`;
  const title = titleLine.replace(/^#\s+/, '').replace(/^Day\s+\d+:\s*/i, '').trim();

  const subLine = lines.find((l) => /^\*[^*]+\*\s*$/.test(l.trim()));
  const description = subLine ? subLine.trim().replace(/^\*|\*$/g, '').trim() : '';

  const dividerIndex = lines.findIndex((l) => l.trim() === '---');
  const body = (dividerIndex >= 0 ? lines.slice(dividerIndex + 1) : lines.slice(3))
    .join('\n')
    .trim();

  const words = body.split(/\s+/).filter(Boolean).length;
  totalWords += words;
  const readingTime = Math.max(3, Math.min(14, Math.round(words / 220)));

  const cover = `/assets/${COVERS[(chapter - 1) % COVERS.length]}.jpg`;
  const outName = `${String(chapter).padStart(2, '0')}-${slug}.md`;

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `chapter: ${chapter}`,
    `section: ${JSON.stringify(SECTION_BY_CHAPTER(chapter))}`,
    `category: ${JSON.stringify(CATEGORY_BY_CHAPTER(chapter))}`,
    `cover: ${JSON.stringify(cover)}`,
    `readingTime: ${readingTime}`,
    'draft: false',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(OUT, outName), frontmatter + '\n' + body + '\n', 'utf8');
  written.push({ outName, chapter, words, readingTime });
}

console.log(`已转换 ${written.length} 篇，总词数 ${totalWords}`);
console.log(`平均 ${Math.round(totalWords / written.length)} 词/篇`);
for (const w of written) {
  console.log(`  ${w.outName}  ${w.words}w  ${w.readingTime}min`);
}
