/**
 * JobHistory集約
 * @see docs/domain-model.md
 */

import type { BilingualText, Period } from '@/types';

export interface JobEntry {
  company: BilingualText;
  position: BilingualText;
  period: Period;
  website?: string;
}

export interface JobHistory {
  entries: JobEntry[];
}
