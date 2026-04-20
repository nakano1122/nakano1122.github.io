interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  path: string;
  emoji: string;
  published_at: string;
  liked_count: number;
}

interface ZennApiResponse {
  articles: ZennArticle[];
}

export async function loadZennArticles(): Promise<ZennArticle[]> {
  const res = await fetch('https://zenn.dev/api/articles?username=cafkaf');
  const data: ZennApiResponse = await res.json();
  return data.articles.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export type { ZennArticle };
