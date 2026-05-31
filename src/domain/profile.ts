/**
 * Profile集約
 * @see docs/domain-model.md
 */

import type { BilingualText, Email, AtCoderProfile } from '@/types';

export interface PersonalInfo {
  name: BilingualText;
  department: BilingualText;
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
  title?: string;
  description?: string;
  keywords?: string;
}

export interface Profile {
  avatar?: string;
  personalInfo: PersonalInfo;
  contact: Contact;
  socialLinks: SocialLinks;
  seo: SEO;
}
