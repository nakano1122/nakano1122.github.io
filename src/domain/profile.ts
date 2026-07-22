/**
 * Profile集約
 * @see docs/domain-model.md
 */

import type { BilingualText, Email, AtCoderProfile } from '@/types';

export type ProfileText = BilingualText & { en: string };

export interface PersonalInfo {
  name: ProfileText;
  department: ProfileText;
}

export interface Contact {
  email: Email;
}

export interface SocialLinks {
  github: string;
  zenn?: string;
  atcoder?: AtCoderProfile;
}

export interface SEO {
  title: ProfileText;
  description: ProfileText;
  keywords: ProfileText;
}

export interface Profile {
  avatar?: string;
  personalInfo: PersonalInfo;
  headline: ProfileText;
  bio: ProfileText;
  contact: Contact;
  socialLinks: SocialLinks;
  seo: SEO;
}
