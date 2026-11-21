/**
 * 把 Google Fonts 与霞鹜文楷的字体下载到 public/fonts/，并生成 src/styles/fonts.css。
 *
 * 为什么自托管：Google Fonts 在中国大陆不可达，访客会一路回落到系统宋体/黑体，中文气质全丢。
 * 自托管后站点不再依赖任何外部字体服务，Vercel 与国内直连拿到的是同一套字形。
 *
 * 用法：node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const OUT_DIR = 'public/fonts';
const CSS_OUT = 'src/styles/fonts.css';

/** 需要自托管的字体源：Google Fonts 的 css2 接口 + 霞鹜文楷的 npm 包 CSS */
const SOURCES = [
  {
    // 西文标题——只保留 latin / latin-ext，丢掉 cyrillic、vietnamese 等用不上的分片
    css: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap',
    dir: 'cormorant',
    keep: /^latin(-ext)?$/,
  },
  {
    css: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
    dir: 'inter',
    keep: /^latin(-ext)?$/,
  },
  {
    // 标题：站酷小薇，清瘦宋体，古书气
    css: 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap',
    dir: 'xiaowei',
  },
  {
    // 正文：霞鹜文楷（楷体），古书手写气
    css: 'https://unpkg.com/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-regular.css',
    dir: 'wenkai',
  },
  {
    css: 'https://unpkg.com/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-bold.css',
    dir: 'wenkai',
  },
];

const fetchText = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
};

/**
 * 拆出 [{ subset, block, url }]。
 * Google 用注释标注分片（latin / cyrillic …）；霞鹜文楷的 CSS 没有标注，subset 为 undefined。
 */
const parseFaces = (css, base) => {
  const faces = [];
  const re = /(?:\/\*\s*([^*]+?)\s*\*\/\s*)?@font-face\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const [, comment, block] = m;
    const url = block.match(/url\((['"]?)([^'")]+\.woff2)\1\)/)?.[2];
    if (!url) continue;
    faces.push({
      subset: comment && /^[a-z-]+$/.test(comment) ? comment : undefined,
      block,
      url: new URL(url, base).href,
    });
  }
  return faces;
};

const flatName = (url) => decodeURIComponent(url.split('/').pop()).replace(/[^a-z0-9.-]/gi, '-');

const lines = [
  '/* 自动生成，勿手改：node scripts/fetch-fonts.mjs */',
  '/* 字体全部自托管在 public/fonts/，不依赖 Google Fonts 或任何外部 CDN。 */',
];

for (const source of SOURCES) {
  const faces = parseFaces(await fetchText(source.css), source.css);
  if (!faces.length) throw new Error(`没解析到 @font-face：${source.css}`);

  const dir = path.join(OUT_DIR, source.dir);
  await mkdir(dir, { recursive: true });

  let kept = 0;
  for (const face of faces) {
    if (source.keep && face.subset && !source.keep.test(face.subset)) continue;

    const name = flatName(face.url);
    const res = await fetch(face.url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${res.status} ${face.url}`);
    await writeFile(path.join(dir, name), Buffer.from(await res.arrayBuffer()));

    const localBlock = face.block
      .replace(/url\((['"]?)[^'")]+\.woff2\1\)/, `url('/fonts/${source.dir}/${name}')`)
      .trim();
    lines.push('@font-face {', localBlock.replace(/^\s+/gm, '  '), '}');
    kept += 1;
  }

  console.log(`${source.dir}: 保留 ${kept} / 共 ${faces.length} 个分片`);
}

lines.push('');
await writeFile(CSS_OUT, lines.join('\n'));
console.log(`写入 ${CSS_OUT}，字体在 ${OUT_DIR}/`);
