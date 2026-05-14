/**
 * Award ローダー
 */

import { getCollection, render } from 'astro:content';
import type { Award } from './types';

export async function loadAwards(): Promise<Award[]> {
  const entries = await getCollection('awards');

  const awards = entries.map((entry) => {
    const data = entry.data;

    const award: Award = {
      date: data.date,
      title: { ja: data.title_ja, en: data.title_en },
      summary: data.summary_ja ? { ja: data.summary_ja, en: data.summary_en } : undefined,
      links: data.links,
    };

    return award;
  });

  return awards.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function loadAwardsWithContent() {
  const entries = await getCollection('awards');

  const awards = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const data = entry.data;

      const award: Award = {
        date: data.date,
        title: { ja: data.title_ja, en: data.title_en },
        summary: data.summary_ja ? { ja: data.summary_ja, en: data.summary_en } : undefined,
        links: data.links,
      };

      return { award, Content };
    })
  );

  return awards.sort((a, b) => b.award.date.getTime() - a.award.date.getTime());
}
