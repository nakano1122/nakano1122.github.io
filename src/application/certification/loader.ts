/**
 * Certification ローダー
 */

import { getCollection } from 'astro:content';
import type { Certification } from '@/domain';

export async function loadCertifications(): Promise<Certification[]> {
  const entries = await getCollection('certifications');

  const certifications = entries.map((entry) => {
    const data = entry.data;

    const certification: Certification = {
      date: data.date,
      name: { ja: data.name_ja, en: data.name_en },
    };

    return certification;
  });

  return certifications.sort((a, b) => b.date.getTime() - a.date.getTime());
}
