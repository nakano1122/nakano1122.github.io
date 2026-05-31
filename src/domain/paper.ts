/**
 * Paper集約（論文単位）
 */

import type { BilingualText } from '@/types';

export interface Paper {
  id: string;
  date: Date;
  title: BilingualText;
  authors: BilingualText;
  conference: string;
  researchId: string;
  award?: BilingualText;
  externalUrl?: string;
}
