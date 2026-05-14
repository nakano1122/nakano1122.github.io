/**
 * 共有型定義
 * @see docs/domain-model.md
 */

export interface BilingualText {
  ja: string;
  en?: string;
}

export interface Period {
  startDate: Date;
  endDate?: Date;
}

export interface Email {
  user: string;
  domain: string;
}

export interface AtCoderProfile {
  url: string;
  rank: string;
}

export type ExternalLink = string;
