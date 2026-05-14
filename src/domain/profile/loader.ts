/**
 * Profile ローダー
 */

import { getCollection } from 'astro:content';
import type { Profile } from './types';

export async function loadProfile(): Promise<Profile> {
  const entries = await getCollection('personal');
  const data = entries[0].data;

  return {
    avatar: data.avatar,
    personalInfo: {
      name: { ja: data.name_ja, en: data.name_en },
      department: { ja: data.department_ja, en: data.department_en },
    },
    contact: {
      email: data.email,
    },
    socialLinks: {
      github: data.github,
      zenn: data.zenn,
      atcoder: data.atcoder,
    },
    seo: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
    },
  };
}
