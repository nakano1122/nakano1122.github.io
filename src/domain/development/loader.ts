/**
 * Development ローダー
 */

import { getCollection, render } from 'astro:content';
import type { Development } from './types';

export async function loadDevelopment(): Promise<Development[]> {
  const entries = await getCollection('development');

  const developments = entries.map((entry) => {
    const data = entry.data;

    const development: Development = {
      period: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
      name: { ja: data.name_ja, en: data.name_en },
      title: { ja: data.title_ja, en: data.title_en },
      repository: data.repository,
      links: data.links,
    };

    return development;
  });

  return developments.sort(
    (a, b) => b.period.startDate.getTime() - a.period.startDate.getTime()
  );
}

export async function loadDevelopmentWithContent() {
  const entries = await getCollection('development');

  const developments = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const data = entry.data;

      const development: Development = {
        period: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        name: { ja: data.name_ja, en: data.name_en },
        title: { ja: data.title_ja, en: data.title_en },
        repository: data.repository,
        links: data.links,
      };

      return { development, Content };
    })
  );

  return developments.sort(
    (a, b) => b.development.period.startDate.getTime() - a.development.period.startDate.getTime()
  );
}
