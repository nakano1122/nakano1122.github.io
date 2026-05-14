/**
 * JobHistory ローダー
 */

import { getCollection } from 'astro:content';
import type { JobHistory, JobEntry } from './types';

export async function loadJobHistory(): Promise<JobHistory> {
  const entries = await getCollection('personal');
  const data = entries[0].data;

  const jobEntries: JobEntry[] = data.jobHistory.map((job) => ({
    company: { ja: job.company_ja, en: job.company_en },
    position: { ja: job.position_ja, en: job.position_en },
    period: {
      startDate: new Date(job.startMonth + '-01'),
      endDate: job.finishMonth ? new Date(job.finishMonth + '-01') : undefined,
    },
    website: job.hpLink,
  }));

  return { entries: jobEntries };
}
