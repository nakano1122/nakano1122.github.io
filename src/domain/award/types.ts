/**
 * Award集約
 * @see docs/domain-model.md
 */

import type { BilingualText, ExternalLink } from '@/types';

export interface Award {
  date: Date;
  title: BilingualText;
  summary?: BilingualText;
  links?: ExternalLink[];
  content?: BilingualText;
}
