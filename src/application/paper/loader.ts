/**
 * Paper ローダー
 */

import { getCollection } from 'astro:content';
import type { Paper } from '@/domain';

export async function loadPapers(): Promise<Paper[]> {
  const entries = await getCollection('papers');

  const papers = entries.map((entry) => {
    const data = entry.data;

    const paper: Paper = {
      id: entry.id,
      date: data.date,
      title: { ja: data.title_ja, en: data.title_en },
      authors: { ja: data.authors_ja, en: data.authors_en },
      conference: data.conference,
      researchId: data.researchId,
      award: data.award_ja ? { ja: data.award_ja, en: data.award_en } : undefined,
      externalUrl: data.externalUrl,
    };

    return paper;
  });

  return papers.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function loadPapersByResearchId(researchId: string): Promise<Paper[]> {
  const papers = await loadPapers();
  return papers.filter((paper) => paper.researchId === researchId);
}
