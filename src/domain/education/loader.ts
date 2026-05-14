/**
 * Education ローダー
 */

import { getCollection, render } from 'astro:content';
import type { Education } from './types';

export async function loadEducation(): Promise<Education[]> {
  const entries = await getCollection('education');

  const educations = entries.map((entry) => {
    const data = entry.data;

    const education: Education = {
      period: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
      institution: { ja: data.institution_ja, en: data.institution_en },
      laboratory: data.laboratory
        ? {
            name: { ja: data.laboratory.name_ja, en: data.laboratory.name_en },
            website: data.laboratory.siteUrl,
          }
        : undefined,
    };

    return education;
  });

  return educations.sort((a, b) => b.period.startDate.getTime() - a.period.startDate.getTime());
}

export async function loadEducationWithContent() {
  const entries = await getCollection('education');

  const educations = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const data = entry.data;

      const education: Education = {
        period: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        institution: { ja: data.institution_ja, en: data.institution_en },
        laboratory: data.laboratory
          ? {
              name: { ja: data.laboratory.name_ja, en: data.laboratory.name_en },
              website: data.laboratory.siteUrl,
            }
          : undefined,
      };

      return { education, Content };
    })
  );

  return educations.sort(
    (a, b) => b.education.period.startDate.getTime() - a.education.period.startDate.getTime()
  );
}
