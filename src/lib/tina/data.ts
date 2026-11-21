/* 只在 `npm run tina` 的编辑环境里用到：从 Tina 本地服务取一篇中文短章，
   并带上可视化编辑需要的表单标记。正常构建不会加载这个文件。 */
import { requestWithMetadata } from '@tinacms/astro';
import client from '../../../tina/__generated__/client';

export const getZhEssay = (slug: string) =>
  requestWithMetadata(
    client.queries.essaysZh({ relativePath: `${slug}.md` }),
    { priority: 'primary' },
  );

export const getZhArticle = (slug: string) =>
  requestWithMetadata(
    client.queries.articlesZh({ relativePath: `${slug}.md` }),
    { priority: 'primary' },
  );
