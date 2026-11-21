/**
 * 发布日期只决定「这篇文章这次打包要不要生成」，页面上从不显示日期。
 *
 * - 本地构建：全部文章都生成，方便编辑时看完整效果。
 * - 线上（Vercel）或 SCHEDULE=1：只生成到期文章，逐篇显现。
 * - 没写发布日期的文章照常显示（向后兼容）。
 *
 * 写成 .js 是为了让 .astro 页面和 rss/sitemap 这类 .js 端点都能引用。
 */
const scheduleOn = typeof __SCHEDULE_ON__ !== 'undefined' ? __SCHEDULE_ON__ : false;

/** 用北京时间算「今天」，避免 UTC 比国内晚一天、把周日的新文章拖到周一。 */
const today = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);

export function isPublished(data) {
  if (!scheduleOn) return true;
  if (!data.publishDate) return true;
  return data.publishDate <= today;
}

export { scheduleOn, today };
