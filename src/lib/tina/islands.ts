/* 可编辑区块登记表。一个区块 = 一条记录，后台点文字时按名字找到这里重绘。 */
import type { IslandRegistry } from '@tinacms/astro/experimental';
import ZhEssayBody from '../../components/tina/ZhEssayBody.astro';
import { getZhArticle, getZhEssay } from './data';

const ARTICLE_WRAPPER = { tag: 'div', className: 'prose reading' };
const ESSAY_WRAPPER = { tag: 'div', className: 'prose reading' };
const KOAN_WRAPPER = { tag: 'div', className: 'prose koan-prose reading' };

type QueryResult = { data?: Record<string, unknown> };

const essayProps = (data: unknown) => ({
  data: (data as QueryResult)?.data?.essaysZh,
});
const articleProps = (data: unknown) => ({
  data: (data as QueryResult)?.data?.articlesZh,
});

export const islands: IslandRegistry = {
  zhEssay: {
    fetch: (_request, params) => getZhEssay(params.get('slug') ?? ''),
    component: ZhEssayBody,
    wrapper: ESSAY_WRAPPER,
    propsFromData: essayProps,
  },
  zhKoan: {
    fetch: (_request, params) => getZhEssay(params.get('slug') ?? ''),
    component: ZhEssayBody,
    wrapper: KOAN_WRAPPER,
    propsFromData: essayProps,
  },
  zhArticle: {
    fetch: (_request, params) => getZhArticle(params.get('slug') ?? ''),
    component: ZhEssayBody,
    wrapper: ARTICLE_WRAPPER,
    propsFromData: articleProps,
  },
};
