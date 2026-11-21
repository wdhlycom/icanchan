/* 编辑时每次敲字，浏览器会来这个地址要一小段重绘后的正文。
   这个文件放在 src/tina/ 而不是 src/pages/，所以正常构建根本看不到它；
   只有 `npm run tina` 会在配置里临时把它挂成路由。 */
import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../lib/tina/islands';

export const prerender = false;
export const ALL: APIRoute = experimental_createIslandRoute(islands);
