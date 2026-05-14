/**
 * ブログ記事コンバーター
 */

import type { BlogArticle } from './types';
import type { NoteArticleInput } from './data';

export interface ZennApiArticle {
  id: number;
  title: string;
  slug: string;
  path: string;
  emoji: string;
  published_at: string;
  liked_count: number;
}

export function convertZennToBlogArticle(article: ZennApiArticle): BlogArticle {
  return {
    title: article.title,
    url: `https://zenn.dev${article.path}`,
    publishedAt: new Date(article.published_at),
    platform: 'zenn',
  };
}

export function convertNoteToBlogArticle(article: NoteArticleInput): BlogArticle {
  return {
    title: article.title,
    url: article.url,
    publishedAt: new Date(article.publishedAt),
    platform: 'note',
  };
}

export function mergeBlogArticles(
  zennArticles: ZennApiArticle[],
  noteArticles: NoteArticleInput[]
): BlogArticle[] {
  const zennConverted = zennArticles.map(convertZennToBlogArticle);
  const noteConverted = noteArticles.map(convertNoteToBlogArticle);

  return [...zennConverted, ...noteConverted].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}
