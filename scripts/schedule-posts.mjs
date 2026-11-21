/**
 * 给每篇文章写发布日期（publishDate）。
 *
 * 规则（2026-11-14 大师定）：
 *  - 每个系列各自排一条队，都从 2026-11-01 起，每 7 天出一篇（正好是每周日）。
 *  - 11-01、11-08 已经过去，上线时这两批就可见；之后每周多出一批。
 *  - 英文版跟对应的中文篇同一天发。
 *  - 西语只在库里存稿、不发页面，不排期。
 *
 * 重跑安全：已有 publishDate 的行会被覆盖，不会重复插入。
 * 用法：node scripts/schedule-posts.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/content');
const START = Date.UTC(2026, 10, 1); // 2026-11-01，周日
const WEEK = 7 * 24 * 60 * 60 * 1000;
const DRY = process.argv.includes('--dry');

const dateAt = (i) => new Date(START + i * WEEK).toISOString().slice(0, 10);

const readFm = (file) => {
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)([\s\S]*)$/);
  if (!m) return null;
  const f = {};
  for (const line of m[2].split(/\r?\n/)) {
    const x = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (x) f[x[1]] = x[2].trim().replace(/^["']|["']$/g, '');
  }
  return { txt, m, f, eol: txt.includes('\r\n') ? '\r\n' : '\n' };
};

const list = (dir) =>
  fs.readdirSync(path.join(ROOT, dir)).filter((x) => x.endsWith('.md')).map((fn) => {
    const r = readFm(path.join(ROOT, dir, fn));
    return { dir, fn, file: path.join(ROOT, dir, fn), ...r };
  });

// 每组的排队依据：跟站内列表页的顺序保持一致
const GROUP = {
  'articles-zh/buddhism-101': 'chapter',
  'articles-zh/glossary': 'chapter',
  'articles-zh/masters': 'filename',
  'articles-zh/platform-sutra': 'chapter',
  'articles-zh/stories': 'chapter',
  'essays-zh/buddhism': 'order',
  'essays-zh/buddhism-guide': 'order',
  'essays-zh/koans': 'order',
  'essays-zh/science-of-chan': 'order',
  'essays-zh/zen-life': 'filename',
};

const numFromFile = (fn) => {
  const m = fn.match(/^(\d+)-/) || fn.match(/-(?:[a-z]+-)?(\d+)-/) || fn.match(/-(\d+)\.md$/);
  return m ? Number(m[1]) : 9999;
};
const sortKey = (r, how) => {
  if (how === 'chapter') return Number(r.f.chapter || 9999);
  if (how === 'order') return Number(r.f.order || 9999);
  return numFromFile(r.fn);
};

const zhArticles = list('articles-zh');
const zhEssays = list('essays-zh');
const enArticles = list('articles');
const enEssays = list('essays');

const groupOf = (dir, r) => {
  if (dir === 'articles-zh') return `articles-zh/${r.f.series || 'buddhism-101'}`;
  return `essays-zh/${r.f.section || 'buddhism'}`;
};

// 中文：10 条队
const groups = {};
for (const r of [...zhArticles, ...zhEssays]) {
  const k = groupOf(r.dir, r);
  (groups[k] ||= []).push(r);
}

const dates = new Map(); // 绝对路径 -> 日期
const summary = [];
for (const [k, rows] of Object.entries(groups).sort()) {
  const how = GROUP[k] || 'filename';
  rows.sort((a, b) => sortKey(a, how) - sortKey(b, how) || a.fn.localeCompare(b.fn));
  rows.forEach((r, i) => dates.set(path.resolve(r.file), dateAt(i)));
  summary.push({ series: k, count: rows.length, how, first: rows[0].fn, last: rows[rows.length - 1].fn, end: dateAt(rows.length - 1) });
}

// 英文：跟对应的中文篇同一天
const zhByChapter = new Map(zhArticles.filter((r) => r.f.series === undefined || r.f.series === 'buddhism-101')
  .map((r) => [Number(r.f.chapter), path.resolve(r.file)]));
const zhByFn = new Map(zhEssays.map((r) => [r.fn, path.resolve(r.file)]));
let paired = 0, unpaired = [];
for (const r of enArticles) {
  const zh = zhByChapter.get(Number(r.f.chapter));
  if (zh && dates.has(zh)) { dates.set(path.resolve(r.file), dates.get(zh)); paired++; }
  else unpaired.push(r.file);
}
for (const r of enEssays) {
  const zh = zhByFn.get(r.fn);
  if (zh && dates.has(zh)) { dates.set(path.resolve(r.file), dates.get(zh)); paired++; }
  else unpaired.push(r.file);
}

// 写回 frontmatter
let written = 0;
for (const [file, date] of dates) {
  const r = readFm(file);
  if (!r) continue;
  let fm = r.m[2];
  if (/^publishDate:/m.test(fm)) fm = fm.replace(/^publishDate:.*$/m, `publishDate: "${date}"`);
  else fm += `${r.eol}publishDate: "${date}"`;
  const out = r.m[1] + fm + r.m[3] + r.m[4];
  if (!DRY && out !== r.txt) { fs.writeFileSync(file, out, 'utf8'); written++; }
}

console.log(DRY ? '=== 试排（未写文件）===' : '=== 已写入 ===');
console.log(`中文 ${zhArticles.length + zhEssays.length} 篇 / 英文配对 ${paired} 篇 / 共排期 ${dates.size} 篇 / 实际写入 ${written} 篇`);
if (unpaired.length) console.log('英文没配上中文的:', unpaired.map((x) => path.basename(x)).join(', '));
console.log('\n系列              篇数  排队依据   第一篇                    最后发布日期');
for (const s of summary) {
  console.log(`  ${s.series.padEnd(30)} ${String(s.count).padStart(3)}  ${s.how.padEnd(9)}  ${s.first.slice(0, 26).padEnd(27)} ${s.end}`);
}
console.log('\n前四周批次:');
for (let i = 0; i < 4; i++) {
  const n = summary.filter((s) => dateAt(i) <= s.end).length;
  console.log(`  ${dateAt(i)}  同时在 ${n} 个系列各出 1 篇`);
}
