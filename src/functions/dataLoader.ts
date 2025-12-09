import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parsePersonalMarkdown, type ParsedPersonalData } from '../utils/markdownParser';

/**
 * personal.md から全てのデータを読み込む
 */
export async function loadPersonalData(): Promise<ParsedPersonalData> {
	const filePath = join(process.cwd(), 'src', 'contents', 'personal.md');
	const content = await readFile(filePath, 'utf-8');
	return parsePersonalMarkdown(content);
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
