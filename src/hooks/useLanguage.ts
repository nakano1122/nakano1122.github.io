/**
 * 言語状態管理
 */

export type Language = 'ja' | 'en';

export function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') return 'ja';

  const stored = localStorage.getItem('lang');
  if (stored === 'ja' || stored === 'en') return stored;
  return 'ja';
}

export function applyLanguage(lang: Language): void {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);
}

export function toggleLanguage(): Language {
  const current = document.documentElement.getAttribute('data-lang') as Language;
  const next: Language = current === 'ja' ? 'en' : 'ja';
  applyLanguage(next);
  return next;
}

export function initLanguage(): void {
  applyLanguage(getPreferredLanguage());
}
