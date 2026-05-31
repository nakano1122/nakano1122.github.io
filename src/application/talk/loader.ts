/**
 * Talk ローダー
 */

import type { Talk } from '@/domain';
import { getCollection } from 'astro:content';

export async function loadTalks(): Promise<Talk[]> {
  const entries = await getCollection('talks');

  const talks = entries.map((entry): Talk => ({
    date: entry.data.date,
    title: { ja: entry.data.title_ja, en: entry.data.title_en },
    event: entry.data.event,
    url: entry.data.url,
    type: entry.data.type,
  }));

  return talks.sort((a, b) => b.date.getTime() - a.date.getTime());
}
