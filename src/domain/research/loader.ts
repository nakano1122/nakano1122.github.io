/**
 * Research ローダー
 */

import { getCollection } from 'astro:content';
import { render } from 'astro:content';
import type { Research } from './types';

export async function loadResearch(): Promise<Research[]> {
  const entries = await getCollection('research');

  const researches = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const data = entry.data;

      const research: Research = {
        period: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        title: { ja: data.title_ja, en: data.title_en },
        authors: { ja: data.authors_ja, en: data.authors_en },
        conference: data.conference,
        award: data.award_ja ? { ja: data.award_ja, en: data.award_en } : undefined,
        links: data.links,
        content: entry.body ? { ja: entry.body } : undefined,
      };

      return { research, Content };
    })
  );

  return researches
    .sort((a, b) => b.research.period.startDate.getTime() - a.research.period.startDate.getTime())
    .map((r) => r.research);
}

export async function loadResearchWithContent() {
  const entries = await getCollection('research');

  const researches = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const data = entry.data;

      const research: Research = {
        period: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        title: { ja: data.title_ja, en: data.title_en },
        authors: { ja: data.authors_ja, en: data.authors_en },
        conference: data.conference,
        award: data.award_ja ? { ja: data.award_ja, en: data.award_en } : undefined,
        links: data.links,
      };

      return { research, Content };
    })
  );

  return researches.sort(
    (a, b) => b.research.period.startDate.getTime() - a.research.period.startDate.getTime()
  );
}
