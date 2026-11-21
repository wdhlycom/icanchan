/**
 * 三语言互链索引。
 *
 * 按文章 id 查到中 / 英 / 西三种译文各自的真实页面地址，供 BaseLayout 输出
 * hreflang 和文章的结构化说明。网址规则与 sitemap.xml.js 保持一致。
 *
 * 只收「这一轮真的会生成」的文章：线上是按发布日期逐篇放出的，
 * 若把还没到期的译文也标进互链，链接会指向线上不存在的页面。
 */
import { getCollection } from 'astro:content';
import { isPublished } from './publish.js';

/* 连载文章按 series 分流；短章里「公案」独立成栏，其余走 essays。 */
const zhArticlePath = (e) => {
  const s = e.data.series;
  if (s === 'platform-sutra') return `/zh/platform-sutra/${e.id}/`;
  if (s === 'buddhism-101') return `/zh/series/buddhism-101/${e.id}/`;
  return `/zh/series/${s}/${e.id}/`;
};
const enArticlePath = (e) => {
  const s = e.data.series;
  if (s === 'platform-sutra') return `/platform-sutra/${e.id}/`;
  if (s === 'buddhism-101') return `/series/buddhism-101/${e.id}/`;
  return `/series/${s}/${e.id}/`;
};
const esArticlePath = (e) => `/es/series/buddhism-101/${e.id}/`;
const zhEssayPath = (e) =>
  e.data.section === 'koans' ? `/zh/koans/${e.id}/` : `/zh/essays/${e.id}/`;
const enEssayPath = (e) =>
  e.data.section === 'koans' ? `/koans/${e.id}/` : `/essays/${e.id}/`;
const esEssayPath = (e) => `/es/essays/${e.id}/`;

/* 栏目页的三语地址。缺哪一语就不写，绝不硬补一个会 404 的地址。
   西语有首页、佛学基础、随笔、Origen 四个栏目页。 */
const SECTION_ALTS = {
  '/': { en: '/', zh: '/zh/', es: '/es/' },
  '/buddhism/': { en: '/buddhism/', zh: '/zh/buddhism/', es: '/es/buddhism/' },
  '/essays/': { en: '/essays/', zh: '/zh/essays/', es: '/es/essays/' },
  '/science-of-chan/': { en: '/science-of-chan/', zh: '/zh/science-of-chan/' },
  '/koans/': { en: '/koans/', zh: '/zh/koans/' },
  '/platform-sutra/': { en: '/platform-sutra/', zh: '/zh/platform-sutra/' },
  '/lineage/': { en: '/lineage/', zh: '/zh/lineage/', es: '/es/lineage/' },
  '/series/': { en: '/series/', zh: '/zh/series/' },
  '/series/buddhism-101/': { en: '/series/buddhism-101/', zh: '/zh/series/buddhism-101/' },
  '/series/masters/': { en: '/series/masters/', zh: '/zh/series/masters/' },
  '/series/stories/': { en: '/series/stories/', zh: '/zh/series/stories/' },
  '/series/glossary/': { en: '/series/glossary/', zh: '/zh/series/glossary/' },
  '/search/': { en: '/search/', zh: '/zh/search/' },
  '/about/': { en: '/about/', zh: '/zh/lineage/', es: '/es/lineage/' },
  '/origin/': { zh: '/zh/origin/' },
};

/** 剥掉语言前缀，得到不带语言标记的基准路径。 */
export function stripLocale(path) {
  if (path === '/zh' || path.startsWith('/zh/')) return path.slice(3) || '/';
  if (path === '/es' || path.startsWith('/es/')) return path.slice(3) || '/';
  return path;
}

let cache;

/** 构建一次，全站所有页面复用。 */
export async function getAlternateIndex() {
  if (!cache) cache = build();
  return cache;
}

async function build() {
  const [a, az, aes, e, ez, ees] = await Promise.all([
    getCollection('articles'),
    getCollection('articlesZh'),
    getCollection('articlesEs'),
    getCollection('essays'),
    getCollection('essaysZh'),
    getCollection('essaysEs'),
  ]);

  const bySlug = new Map();
  const put = (lang, path, entry) => {
    const m = path.match(/\/([^/]+)\/$/);
    if (!m) return;
    const rec = bySlug.get(m[1]) ?? {};
    rec[lang] = { path, data: entry.data };
    bySlug.set(m[1], rec);
  };
  const ready = (x) => !x.data.draft && isPublished(x.data);

  a.filter(ready).forEach((x) => put('en', enArticlePath(x), x));
  az.filter(ready).forEach((x) => put('zh', zhArticlePath(x), x));
  aes.filter(ready).forEach((x) => put('es', esArticlePath(x), x));
  e.filter(ready).forEach((x) => put('en', enEssayPath(x), x));
  ez.filter(ready).forEach((x) => put('zh', zhEssayPath(x), x));
  ees.filter(ready).forEach((x) => put('es', esEssayPath(x), x));

  return { bySlug, sections: SECTION_ALTS };
}

/**
 * 查当前页面的三语地址。
 * 返回 { rel, en, zh, es, isArticle, data }；缺哪语就为 undefined，调用方不该硬补。
 */
export function lookupAlternates(index, path, locale) {
  const rel = stripLocale(path);
  const section = index.sections[rel];
  if (section)
    return { ...section, rel, found: true, isArticle: false, data: undefined };

  const m = path.match(/\/([^/]+)\/$/);
  if (!m) return { rel, found: false, isArticle: false, data: undefined };
  const rec = index.bySlug.get(m[1]);
  if (!rec) return { rel, found: false, isArticle: false, data: undefined };

  const langKey = locale === 'zh' ? 'zh' : locale === 'es' ? 'es' : 'en';
  return {
    rel,
    en: rec.en?.path,
    zh: rec.zh?.path,
    es: rec.es?.path,
    found: true,
    isArticle: true,
    data: rec[langKey]?.data ?? rec.en?.data ?? rec.zh?.data ?? rec.es?.data,
  };
}
