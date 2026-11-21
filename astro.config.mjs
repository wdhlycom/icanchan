import { defineConfig } from 'astro/config';
import remarkEmphasis from './src/plugins/remark-emphasis.mjs';
import remarkCjkFriendly from 'remark-cjk-friendly';

/* 只有 `npm run tina` 会挂上 Tina。平时的 build / preview 和线上部署完全不受影响。 */
const tinaMode = process.env.TINA_DEV === '1';

/* 文章按发布日期逐篇出现。本地构建默认看全站，线上（Vercel）只生成到期文章；
   本地想模拟线上效果用 SCHEDULE=1 npm run build。 */
const scheduleOn = process.env.VERCEL === '1' || process.env.SCHEDULE === '1';
console.log(`[排期] ${scheduleOn ? '按发布日期生成（未到期的不出现）' : '本地看全站（所有文章都出现）'}`);

const viteBase = {
  // 工作区在 Z: 网络盘上，原生 fs 事件监听会报 UNKNOWN: watch 并让 dev server 崩掉；
  // 用轮询代替（只影响本地 dev，构建不受影响）。
  server: { watch: { usePolling: true, interval: 300 } },
  define: { __SCHEDULE_ON__: JSON.stringify(scheduleOn) },
};

/* 编辑时才把「重绘正文」的那个地址挂成路由；正常构建里它不存在。 */
const tinaIslandRoute = {
  name: 'local-tina-island',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      injectRoute({
        pattern: '/tina-island/[name]',
        entrypoint: './src/tina/island-route.ts',
      });
      console.log('[tina] 正文重绘路由已挂载');
    },
  },
};

const tinaBits = tinaMode
  ? {
      adapter: (await import('@astrojs/node')).default({ mode: 'standalone' }),
      integrations: [
        (await import('@tinacms/astro/integration')).default(),
        tinaIslandRoute,
      ],
      vite: {
        ...viteBase,
        plugins: [(await import('@tinacms/astro/vite')).tinaAdminDevRedirect()],
      },
    }
  : { vite: viteBase };

export default defineConfig({
  site: 'https://icanchan.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
    // 正文强调：==赭金== / ++朱砂++，加粗走 remark 原生的 ** 语法；
    // remark-cjk-friendly 修中文紧邻标点时 ** 不渲染成粗体的问题
    remarkPlugins: [remarkEmphasis, remarkCjkFriendly],
  },
  ...tinaBits,
});
