/**
 * Certification集約
 * @see docs/domain-model.md
 */

import type { BilingualText } from '@/types';

export interface Certification {
  date: Date;
  name: BilingualText;
}
