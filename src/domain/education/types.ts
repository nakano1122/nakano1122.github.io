/**
 * Education集約
 * @see docs/domain-model.md
 */

import type { BilingualText, Period } from '@/types';

export interface Laboratory {
  name: BilingualText;
  website?: string;
}

export interface Education {
  period: Period;
  institution: BilingualText;
  laboratory?: Laboratory;
  content?: BilingualText;
}
