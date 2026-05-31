/**
 * Award集約
 * @see docs/domain-model.md
 */

import type { BilingualText, ExternalLink } from '@/types';

export type AwardCategory = 'research' | 'development' | 'education';

export interface Award {
  date: Date;
  title: BilingualText;
  summary?: BilingualText;
  category: AwardCategory;
  links?: ExternalLink[];
  content?: BilingualText;
}
