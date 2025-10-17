import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
	parsePersonalMarkdown,
	parseResearchMarkdown,
	parseDevelopmentMarkdown,
} from '../utils/markdownParser';
import { getCategoryDisplayName } from '../constants/fieldNames';
import type {
	PersonalInfo,
	DevelopmentExperience,
	ResearchHistory,
	TechEvent,
	TechStack,
} from '../types';

/**
 * markdownファイルを読み込む共通関数
 */
async function loadMarkdownContent(filename: string): Promise<string> {
	const filePath = join(process.cwd(), 'src', 'contents', filename);
	return await readFile(filePath, 'utf-8');
}

/**
 * personal.md から個人情報を読み込む
 */
export async function loadPersonalInfo(): Promise<PersonalInfo> {
	const content = await loadMarkdownContent('personal.md');
	const parsed = parsePersonalMarkdown(content);

	return {
		name: parsed.name,
		affiliation: {
			university: parsed.department.split(/大学|学部/)[0] + '大学',
			faculty: parsed.department.includes('学部')
				? parsed.department.split('大学')[1] || parsed.department
				: parsed.department,
		},
		year: parsed.grade,
		contact: {
			email: parsed.mail,
			github: {
				username: '@' + parsed.github.split('/').pop(),
				url: parsed.github,
			},
			atcoder: parsed.atcoder,
		},
		education: parsed.education,
		internships: parsed.jobHistory.map((job) => ({
			company: job.company,
			period: job.startMonth + (job.finishMonth ? ' - ' + job.finishMonth : ' - 現在'),
			position: job.position,
			hpLink: job.hpLink,
		})),
		laboratories: parsed.laboratories,
	};
}

/**
 * development.md から開発経験を読み込む
 */
export async function loadDevelopmentExperience(): Promise<DevelopmentExperience> {
	const content = await loadMarkdownContent('development.md');
	const parsed = parseDevelopmentMarkdown(content);

	// 受賞歴をTechEventに変換
	const events: TechEvent[] = parsed.awards.map((award) => ({
		name: award.event,
		award: award.award,
		date: award.date,
	}));

	// Tech Stackを表示用の名前に変換
	const techStack: TechStack = {};
	for (const [category, techs] of Object.entries(parsed.techStack)) {
		const displayName = getCategoryDisplayName(category);
		techStack[displayName] = techs;
	}

	return {
		events,
		awards: parsed.awards,
		techStack,
	};
}

/**
 * research.md から研究履歴を読み込む
 */
export async function loadResearchHistory(): Promise<ResearchHistory> {
	const content = await loadMarkdownContent('research.md');
	const parsed = parseResearchMarkdown(content);

	// 全テーマから論文を集約
	const allPapers = parsed.themes.flatMap((theme) => theme.papers);

	return {
		themes: parsed.themes,
		papers: allPapers,
		researchContent: parsed.themes[0]?.abstract || '',
	};
}