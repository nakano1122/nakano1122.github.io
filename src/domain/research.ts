/**
 * Research集約（研究テーマ単位）
 */

import type { BilingualText, Period } from '@/types';

export type ResearchStatus = 'ongoing' | 'completed';

export interface Research {
  id: string;
  title: BilingualText;
  summary: BilingualText;
  image?: BilingualText;
  status: ResearchStatus;
  period: Period;
}
