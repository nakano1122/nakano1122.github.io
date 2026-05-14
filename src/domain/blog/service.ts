/**
 * BlogArticleService
 */

import type { BlogArticle, BlogPlatform } from './types';
import { fetchZennArticles } from '@/domain/infrastructure/api/zennClient';
import { mergeBlogArticles } from './converter';
import { noteArticles } from './data';

export async function loadAllBlogArticles(): Promise<BlogArticle[]> {
  const zennArticles = await fetchZennArticles();
  return mergeBlogArticles(zennArticles, noteArticles);
}

export async function loadBlogArticlesByPlatform(platform: BlogPlatform): Promise<BlogArticle[]> {
  const allArticles = await loadAllBlogArticles();
  return allArticles.filter((article) => article.platform === platform);
}
