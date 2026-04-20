import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * personal.md からプロフィールデータを読み込む
 */
export async function loadPersonalData() {
	const entries = await getCollection('personal');
	return entries[0].data;
}

export type PersonalData = Awaited<ReturnType<typeof loadPersonalData>>;

/**
 * 研究エントリを startDate 降順で取得
 */
export async function loadResearch(): Promise<CollectionEntry<'research'>[]> {
	const entries = await getCollection('research');
	return entries.sort(
		(a, b) => b.data.startDate.getTime() - a.data.startDate.getTime(),
	);
}

/**
 * 開発イベントエントリを startDate 降順で取得
 */
export async function loadDevelopment(): Promise<
	CollectionEntry<'development'>[]
> {
	const entries = await getCollection('development');
	return entries.sort(
		(a, b) => b.data.startDate.getTime() - a.data.startDate.getTime(),
	);
}

/**
 * 受賞エントリを date 降順で取得
 */
export async function loadAwards(): Promise<CollectionEntry<'awards'>[]> {
	const entries = await getCollection('awards');
	return entries.sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);
}

/**
 * 学歴エントリを startDate 降順で取得
 */
export async function loadEducation(): Promise<CollectionEntry<'education'>[]> {
	const entries = await getCollection('education');
	return entries.sort(
		(a, b) => b.data.startDate.getTime() - a.data.startDate.getTime(),
	);
}

/**
 * 資格エントリを date 降順で取得
 */
export async function loadCertifications(): Promise<CollectionEntry<'certifications'>[]> {
	const entries = await getCollection('certifications');
	return entries.sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);
}

/**
 * Date を "YYYY/MM" 形式にフォーマットする
 */
export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${year}/${month}`;
}

/**
 * 期間を表示用にフォーマットする（日英対応）
 */
export function formatPeriodBilingual(startMonth: string, finishMonth?: string): { ja: string; en: string } {
	const formatMonth = (month: string) => {
		const [year, m] = month.split('-');
		return `${year}/${m}`;
	};

	const start = formatMonth(startMonth);
	const endJa = finishMonth ? formatMonth(finishMonth) : '現在';
	const endEn = finishMonth ? formatMonth(finishMonth) : 'Present';
	return {
		ja: `${start} - ${endJa}`,
		en: `${start} - ${endEn}`,
	};
}

/**
 * 期間を表示用にフォーマットする
 */
export function formatPeriod(startMonth: string, finishMonth?: string): string {
	return formatPeriodBilingual(startMonth, finishMonth).ja;
}
