/**
 * Research集約
 * @see docs/domain-model.md
 */

import type { BilingualText, Period, ExternalLink } from '@/types';

export interface Research {
  period: Period;
  title: BilingualText;
  authors: BilingualText;
  conference: string;
  award?: BilingualText;
  links?: ExternalLink[];
  content?: BilingualText;
}
