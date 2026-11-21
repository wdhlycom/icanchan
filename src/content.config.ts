import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  section: z.string().default('buddhism'),
  category: z.string().default('Foundations'),
  cover: z.string().default('/assets/misty-peaks-kyoto.jpg'),
  readingTime: z.number().default(6),
  draft: z.boolean().default(false),
  // 只在打包时决定这篇要不要生成；页面上不显示日期。格式 YYYY-MM-DD。
  publishDate: z.string().optional(),
});

/* 连载文章有 chapter 顺序；短章（essays）无编号，散落各板块 */
const articleSchema = baseSchema.extend({
  chapter: z.number(),
  series: z.string().default('buddhism-101'),
});

const essaySchema = baseSchema.extend({
  lang: z.string().default('en'),
  source: z.string().default('chansurf'),
  order: z.number().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: articleSchema,
});

const articlesZh = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles-zh' }),
  schema: articleSchema,
});

/* 西语佛学基础 30 篇，底本为英文 articles */
const articlesEs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles-es' }),
  schema: articleSchema,
});

/* 从两个旧项目补齐的短章：英 / 中 / 西各一份，西语只存稿暂不发布 */
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: essaySchema,
});

const essaysZh = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays-zh' }),
  schema: essaySchema,
});

const essaysEs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays-es' }),
  schema: essaySchema,
});

export const collections = { articles, articlesZh, articlesEs, essays, essaysZh, essaysEs };
