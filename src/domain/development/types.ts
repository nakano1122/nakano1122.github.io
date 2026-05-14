/**
 * Development集約
 * @see docs/domain-model.md
 */

import type { BilingualText, Period, ExternalLink } from '@/types';

export interface Development {
  period: Period;
  name: BilingualText;
  title: BilingualText;
  repository?: string;
  links?: ExternalLink[];
  content?: BilingualText;
}
