import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  chapter: z.number(),
  section: z.string().default('buddhism'),
  category: z.string().default('Foundations'),
  cover: z.string().default('/assets/misty-peaks-kyoto.jpg'),
  readingTime: z.number().default(6),
  draft: z.boolean().default(false),
});

const essaySchema = articleSchema.extend({
  lang: z.string().default('en'),
  source: z.string().default('chansurf'),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: articleSchema,
});

const articlesZh = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles-zh' }),
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

export const collections = { articles, articlesZh, essays, essaysZh, essaysEs };
