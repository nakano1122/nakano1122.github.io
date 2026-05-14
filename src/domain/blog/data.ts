/**
 * Note記事データ（手動管理）
 */

export interface NoteArticleInput {
  title: string;
  url: string;
  publishedAt: string;
}

export const noteArticles: NoteArticleInput[] = [
  {
    title: '「仕様通りに作ったのに違う」がなぜ起きるのか | DDDのユビキタス言語という考え方',
    url: 'https://note.com/niti_technology/n/n4617ba43f718',
    publishedAt: '2026-05-12',
  },
  {
    title: 'LLMに意図を伝える技術 | DDDでコーディングエージェントの選択肢を限定する',
    url: 'https://note.com/niti_technology/n/n3200ba76c54d',
    publishedAt: '2026-05-14',
  },
];
