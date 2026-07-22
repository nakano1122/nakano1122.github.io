/**
 * JobHistory ローダー
 */

import { getCollection } from 'astro:content';
import type { JobHistory, JobEntry } from '@/domain';

export async function loadJobHistory(): Promise<JobHistory> {
  const entries = await getCollection('personal');
  const data = entries[0].data;

  const jobEntries: JobEntry[] = data.jobHistory.map((job) => ({
    company: job.company,
    position: job.position,
    period: {
      startDate: new Date(job.startMonth + '-01'),
      endDate: job.finishMonth ? new Date(job.finishMonth + '-01') : undefined,
    },
    website: job.hpLink,
  }));

  return { entries: jobEntries };
}
