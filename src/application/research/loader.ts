/**
 * Research ローダー
 */

import { getCollection } from 'astro:content';
import { render } from 'astro:content';
import type { Research } from '@/domain';

function resolveImage(data: { image?: string; image_ja?: string; image_en?: string }) {
  const imageJa = data.image_ja || data.image;
  if (!imageJa) return undefined;
  return { ja: imageJa, en: data.image_en || imageJa };
}

export async function loadResearch(): Promise<Research[]> {
  const entries = await getCollection('research');

  const researches = entries.map((entry) => {
    const data = entry.data;

    const research: Research = {
      id: data.id,
      title: { ja: data.title_ja, en: data.title_en },
      summary: { ja: data.summary_ja, en: data.summary_en },
      image: resolveImage(data),
      status: data.status,
      period: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
    };

    return research;
  });

  return researches.sort(
    (a, b) => b.period.startDate.getTime() - a.period.startDate.getTime()
  );
}

export async function loadResearchWithContent() {
  const entries = await getCollection('research');

  const researches = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const data = entry.data;

      const research: Research = {
        id: data.id,
        title: { ja: data.title_ja, en: data.title_en },
        summary: { ja: data.summary_ja, en: data.summary_en },
        image: resolveImage(data),
        status: data.status,
        period: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
      };

      return { research, Content };
    })
  );

  return researches.sort(
    (a, b) => b.research.period.startDate.getTime() - a.research.period.startDate.getTime()
  );
}

export async function loadResearchById(id: string) {
  const entries = await getCollection('research');
  const entry = entries.find((e) => e.data.id === id);

  if (!entry) return null;

  const { Content } = await render(entry);
  const data = entry.data;

  const research: Research = {
    id: data.id,
    title: { ja: data.title_ja, en: data.title_en },
    summary: { ja: data.summary_ja, en: data.summary_en },
    image: resolveImage(data),
    status: data.status,
    period: {
      startDate: data.startDate,
      endDate: data.endDate,
    },
  };

  return { research, Content };
}
