export const locales = ['ja', 'en'] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
	return locales.includes(value as Locale);
}

export function getAlternateLocale(locale: Locale): Locale {
	return locale === 'ja' ? 'en' : 'ja';
}

export function localizePath(locale: Locale, path = '/'): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const pathWithoutLocale = normalizedPath.replace(/^\/(?:ja|en)(?=\/|$)/, '') || '/';
	return pathWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathWithoutLocale}`;
}

export function alternateLocalePath(locale: Locale, path = '/'): string {
	return localizePath(getAlternateLocale(locale), path);
}
