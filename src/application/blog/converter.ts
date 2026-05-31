/**
 * ブログ記事コンバーター
 */

import type { BlogArticle } from '@/domain';

export interface ZennApiArticle {
  id: number;
  title: string;
  slug: string;
  path: string;
  emoji: string;
  published_at: string;
  liked_count: number;
}

export interface BlogCollectionEntry {
  data: {
    date: Date;
    title: string;
    url: string;
    platform: 'note';
  };
}

export function convertZennToBlogArticle(article: ZennApiArticle): BlogArticle {
  return {
    title: article.title,
    url: `https://zenn.dev${article.path}`,
    publishedAt: new Date(article.published_at),
    platform: 'zenn',
  };
}

export function convertCollectionToBlogArticle(entry: BlogCollectionEntry): BlogArticle {
  return {
    title: entry.data.title,
    url: entry.data.url,
    publishedAt: entry.data.date,
    platform: entry.data.platform,
  };
}

export function mergeBlogArticles(
  zennArticles: ZennApiArticle[],
  collectionEntries: BlogCollectionEntry[]
): BlogArticle[] {
  const zennConverted = zennArticles.map(convertZennToBlogArticle);
  const collectionConverted = collectionEntries.map(convertCollectionToBlogArticle);

  return [...zennConverted, ...collectionConverted].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}
