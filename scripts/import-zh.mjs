// 把 _legacy_hugo/Buddhism 101 下的 30 篇中文原稿，转成 Astro 内容文件（articles-zh 集合）。
// 文件名与英文版一一对应，方便双语地址对齐、互相跳转。
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const EN_DIR = path.join(ROOT, 'src/content/articles');
const ZH_SRC = path.join(ROOT, '_legacy_hugo/Buddhism 101');
const OUT = path.join(ROOT, 'src/content/articles-zh');

fs.mkdirSync(OUT, { recursive: true });

const readFront = (file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const front = m ? m[1] : '';
  const body = m ? raw.slice(m[0].length) : raw;
  const get = (key) => {
    const line = front.split(/\r?\n/).find((l) => l.trim().startsWith(`${key}:`));
    if (!line) return null;
    return line.slice(line.indexOf(':') + 1).trim().replace(/^["']|["']$/g, '');
  };
  return { get, body };
};

const enFiles = fs
  .readdirSync(EN_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const { get } = readFront(path.join(EN_DIR, f));
    return {
      file: f,
      chapter: Number(get('chapter')),
      section: get('section') || 'buddhism',
      category: get('category') || 'Foundations',
      cover: get('cover') || '/assets/misty-peaks-kyoto.jpg',
    };
  })
  .filter((x) => Number.isFinite(x.chapter))
  .sort((a, b) => a.chapter - b.chapter);

const zhDirs = fs
  .readdirSync(ZH_SRC)
  .filter((d) => /^\d{2}-/.test(d) && !d.startsWith('EN-'))
  .map((d) => ({ dir: d, num: Number(d.slice(0, 2)) }));

if (enFiles.length !== 30 || zhDirs.length !== 30) {
  console.log(`英文稿 ${enFiles.length} 篇，中文稿 ${zhDirs.length} 篇，数量对不上，先停下。`);
  process.exit(1);
}

let written = 0;
for (const en of enFiles) {
  const zh = zhDirs.find((z) => z.num === en.chapter);
  if (!zh) {
    console.log(`第 ${en.chapter} 章没找到中文稿`);
    continue;
  }
  const dirPath = path.join(ZH_SRC, zh.dir);
  const mdName = fs.readdirSync(dirPath).find((f) => f.endsWith('.md'));
  if (!mdName) {
    console.log(`第 ${en.chapter} 章目录里没有 md`);
    continue;
  }
  const raw = fs.readFileSync(path.join(dirPath, mdName), 'utf8');
  const lines = raw.split(/\r?\n/);

  let titleIdx = lines.findIndex((l) => /^#\s+/.test(l));
  if (titleIdx === -1) titleIdx = 0;
  let title = (lines[titleIdx] || '').replace(/^#\s+/, '').trim();
  title = title.replace(/^第\s*\d+\s*天\s*[：:]\s*/, '').replace(/^Day\s*\d+\s*[：:]\s*/i, '');
  const body = lines.slice(titleIdx + 1).join('\n').replace(/^\s*\n+/, '');

  // 简介取正文第一段，太长就截断
  const firstPara =
    body
      .split(/\r?\n/)
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('![')) || '';
  const description =
    firstPara.length > 88 ? `${firstPara.slice(0, 88).replace(/[，、。；]$/, '')}……` : firstPara;

  const chars = body.replace(/[\s#>*`\-•]/g, '').length;
  const readingTime = Math.max(4, Math.round(chars / 420));

  const front = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `chapter: ${en.chapter}`,
    `section: ${JSON.stringify(en.section)}`,
    `category: ${JSON.stringify(en.category)}`,
    `cover: ${JSON.stringify(en.cover)}`,
    `readingTime: ${readingTime}`,
    'draft: false',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(OUT, en.file), front + body.replace(/\s+$/, '') + '\n', 'utf8');
  written += 1;
  console.log(`${String(en.chapter).padStart(2, '0')}  ${title}  (${readingTime} 分钟)`);
}

console.log(`\n写入 ${written} 篇中文稿到 src/content/articles-zh/`);
