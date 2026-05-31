/**
 * BlogArticleService
 */

import type { BlogArticle, BlogPlatform } from '@/domain';
import { getCollection } from 'astro:content';
import { fetchZennArticles } from '@/infrastructure/api/zenn-client';
import { mergeBlogArticles, type BlogCollectionEntry } from './converter';

export async function loadAllBlogArticles(): Promise<BlogArticle[]> {
  const zennArticles = await fetchZennArticles();
  const blogEntries = await getCollection('blogs');
  return mergeBlogArticles(zennArticles, blogEntries as BlogCollectionEntry[]);
}

export async function loadBlogArticlesByPlatform(platform: BlogPlatform): Promise<BlogArticle[]> {
  const allArticles = await loadAllBlogArticles();
  return allArticles.filter((article) => article.platform === platform);
}
