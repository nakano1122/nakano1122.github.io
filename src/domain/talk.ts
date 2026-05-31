/**
 * Talk集約
 */

import type { BilingualText } from '@/types';

export type TalkType = 'presentation' | 'paper-reading';

export interface Talk {
  date: Date;
  title: BilingualText;
  event: string;
  url: string;
  type: TalkType;
}
