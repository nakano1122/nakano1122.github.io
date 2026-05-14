/**
 * テーマ状態管理
 */

export type Theme = 'light' | 'dark';

export function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function toggleTheme(): Theme {
  const current = document.documentElement.getAttribute('data-theme') as Theme;
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function initTheme(): void {
  applyTheme(getPreferredTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}
