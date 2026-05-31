/**
 * BlogArticle集約
 * @see docs/domain-model.md
 */

export type BlogPlatform = 'zenn' | 'note';

export interface BlogArticle {
  title: string;
  url: string;
  publishedAt: Date;
  platform: BlogPlatform;
}
