import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { parsePersonalMarkdown, type ParsedPersonalData } from '../utils/markdownParser';

/**
 * personal.md から全てのデータを読み込む
 */
export async function loadPersonalData(): Promise<ParsedPersonalData> {
	const filePath = join(process.cwd(), 'src', 'contents', 'personal.md');
	const content = await readFile(filePath, 'utf-8');
	return parsePersonalMarkdown(content);
}

export type DetailEntry = CollectionEntry<'details'>;

/**
 * 全詳細コンテンツを読み込む
 */
export async function loadAllDetails(): Promise<DetailEntry[]> {
	return await getCollection('details');
}

/**
 * 指定ディレクトリのエントリを startDate 降順（新しい順）で取得
 */
export function getEntriesBySection(
	entries: DetailEntry[],
	section: string,
): DetailEntry[] {
	return entries
		.filter((e) => e.id.startsWith(`${section}/`))
		.sort((a, b) => {
			const dateA = (a.data as { startDate: Date }).startDate.getTime();
			const dateB = (b.data as { startDate: Date }).startDate.getTime();
			return dateB - dateA;
		});
}

/**
 * 期間を表示用にフォーマットする
 */
export function formatPeriod(startMonth: string, finishMonth?: string): string {
	const formatMonth = (month: string) => {
		const [year, m] = month.split('-');
		return `${year}/${m}`;
	};

	const start = formatMonth(startMonth);
	const end = finishMonth ? formatMonth(finishMonth) : '現在';
	return `${start} - ${end}`;
}
