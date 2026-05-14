/**
 * Zenn API クライアント
 */

import type { ZennApiArticle } from '../../blog/converter';

interface ZennApiResponse {
  articles: ZennApiArticle[];
}

const ZENN_API_BASE = 'https://zenn.dev/api';
const ZENN_USERNAME = 'cafkaf';

export async function fetchZennArticles(): Promise<ZennApiArticle[]> {
  const res = await fetch(`${ZENN_API_BASE}/articles?username=${ZENN_USERNAME}`);

  if (!res.ok) {
    throw new Error(`Zenn API error: ${res.status}`);
  }

  const data: ZennApiResponse = await res.json();
  return data.articles;
}
