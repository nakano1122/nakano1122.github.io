/**
 * Profile ローダー
 */

import { getCollection } from 'astro:content';
import type { Profile } from '@/domain';

export async function loadProfile(): Promise<Profile> {
  const entries = await getCollection('personal');
  const data = entries[0].data;

  return {
    avatar: data.avatar,
    personalInfo: {
      name: data.profile.name,
      department: data.profile.department,
    },
    headline: data.profile.headline,
    bio: data.profile.bio,
    contact: data.contact,
    socialLinks: data.socialLinks,
    seo: data.seo,
  };
}
