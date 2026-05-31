/**
 * Development集約
 */

import type { BilingualText, Period, ExternalLink } from '@/types';

export interface Development {
  id: string;
  period: Period;
  name: BilingualText;
  title: BilingualText;
  image?: string;
  repository?: string;
  links?: ExternalLink[];
}
