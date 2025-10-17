/**
 * マークダウンファイルをパースして構造化されたデータを返すユーティリティ
 */

import type {
	EducationItem,
	JobHistoryItem,
	Paper,
	DevelopmentInfo,
} from '../types';
import type { Laboratory } from '../types/personal';
import type { ResearchTheme } from '../types/research';

// パーサー専用の型（PersonalInfoとは異なる内部構造）
export interface ParsedPersonalInfo {
	name: string;
	department: string;
	grade: string;
	mail: string;
	github: string;
	atcoder?: string;
	skills: string[];
	education: EducationItem[];
	jobHistory: JobHistoryItem[];
	laboratories: Laboratory[];
}

// markdownから読み取った研究室情報（period計算前）
interface ParsedLaboratory {
	name?: string;
	siteUrl?: string;
	period?: string;
	startMonth?: string;
	finishMonth?: string;
}

// research.mdからパースされたデータ構造
export interface ParsedResearchInfo {
	themes: ResearchTheme[];
}

/**
 * personal.md をパースする
 */
export function parsePersonalMarkdown(content: string): ParsedPersonalInfo {
	const lines = content.split('\n');
	const result: ParsedPersonalInfo = {
		name: '',
		department: '',
		grade: '',
		mail: '',
		github: '',
		skills: [],
		education: [],
		jobHistory: [],
		laboratories: [],
	};

	let currentSection = '';
	let currentJob: Partial<JobHistoryItem> = {};
	let currentLab: ParsedLaboratory = {};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (line.startsWith('# Profile')) {
			currentSection = 'profile';
		} else if (line.startsWith('# Skills')) {
			currentSection = 'skills';
		} else if (line.startsWith('# Education')) {
			currentSection = 'education';
		} else if (line.startsWith('# Laboratory')) {
			currentSection = 'laboratory';
		} else if (line.startsWith('# Job History')) {
			currentSection = 'jobHistory';
		} else if (line.startsWith('### ') && currentSection === 'laboratory') {
			// 前の研究室データを保存
			if (currentLab.name) {
				const startMonth = currentLab.startMonth || '';
				const finishMonth = currentLab.finishMonth || '';
				currentLab.period = startMonth + (finishMonth ? ' - ' + finishMonth : ' - 現在');
				result.laboratories.push(currentLab as Laboratory);
			}
			currentLab = { name: line.replace('### ', '').trim() };
		} else if (line.startsWith('## ') && currentSection === 'jobHistory') {
			// 前のジョブデータを保存
			if (currentJob.company) {
				result.jobHistory.push(currentJob as JobHistoryItem);
			}
			currentJob = { company: line.replace('## ', '') };
		} else if (currentSection === 'profile' && line.includes(':')) {
			const [key, ...valueParts] = line.split(':');
			const value = valueParts.join(':').trim(); // URLにコロンが含まれる場合に対応
			if (key.trim() === 'name') result.name = value;
			else if (key.trim() === 'department') result.department = value;
			else if (key.trim() === 'grade') result.grade = value;
			else if (key.trim() === 'mail') result.mail = value;
			else if (key.trim() === 'GitHub') {
				// マークダウンリンク形式 [@username](url) または 単純なURL
				const match = value.match(/\[@.*?\]\((.*?)\)/);
				result.github = match ? match[1] : value;
			} else if (key.trim() === 'Atcoder') {
				result.atcoder = value;
			}
		} else if (currentSection === 'skills' && line.startsWith('- ')) {
			result.skills.push(line.substring(2));
		} else if (currentSection === 'education' && line.match(/^\d{4}\/\d{2}/)) {
			const [period, institution] = line.split(':').map((s) => s.trim());
			result.education.push({ period, institution });
		} else if (currentSection === 'jobHistory' && line.includes(':')) {
			const [key, ...valueParts] = line.split(':');
			const value = valueParts.join(':').trim(); // URLにコロンが含まれる場合に対応
			if (key.trim() === 'start-month') currentJob.startMonth = value;
			else if (key.trim() === 'finish-month') currentJob.finishMonth = value;
			else if (key.trim() === 'HP-link') currentJob.hpLink = value.replace(/['"]/g, '');
			else if (key.trim() === 'position') currentJob.position = value;
		} else if (currentSection === 'laboratory' && line.includes(':')) {
			const [key, ...valueParts] = line.split(':');
			const value = valueParts.join(':').trim(); // URLにコロンが含まれる場合に対応
			if (key.trim() === 'site-url') {
				currentLab.siteUrl = value;
			} else if (key.trim() === 'start-month') {
				(currentLab as any).startMonth = value;
			} else if (key.trim() === 'finish-month') {
				(currentLab as any).finishMonth = value;
			}
		}
	}

	// 最後のジョブデータを保存
	if (currentJob.company) {
		result.jobHistory.push(currentJob as JobHistoryItem);
	}

	// 最後の研究室データを保存
	if (currentLab.name) {
		const startMonth = (currentLab as any).startMonth || '';
		const finishMonth = (currentLab as any).finishMonth || '';
		currentLab.period = startMonth + (finishMonth ? ' - ' + finishMonth : ' - 現在');
		result.laboratories.push(currentLab as Laboratory);
	}

	return result;
}

/**
 * research.md をパースする
 */
export function parseResearchMarkdown(content: string): ParsedResearchInfo {
	const lines = content.split('\n');
	const themes: ResearchTheme[] = [];

	let currentSection = '';
	let currentTheme: Partial<ResearchTheme> | null = null;
	let currentPaper: Partial<Paper> = {};
	let abstractLines: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (line.startsWith('## Theme')) {
			currentSection = 'theme';
		} else if (line.startsWith('### ') && currentSection === 'theme') {
			// 前のテーマを保存
			if (currentTheme && currentTheme.title) {
				if (currentPaper.title) {
					currentTheme.papers!.push(currentPaper as Paper);
					currentPaper = {};
				}
				themes.push(currentTheme as ResearchTheme);
			}
			// 新しいテーマを開始
			currentTheme = {
				title: line.replace('### ', '').trim(),
				abstract: '',
				papers: [],
			};
			abstractLines = [];
		} else if (line.startsWith('#### abstract')) {
			currentSection = 'abstract';
		} else if (line.startsWith('#### papers')) {
			currentSection = 'papers';
			// abstract を結合
			if (abstractLines.length > 0 && currentTheme) {
				currentTheme.abstract = abstractLines.join('');
			}
		} else if (currentSection === 'abstract' && line && !line.startsWith('#')) {
			abstractLines.push(line);
		} else if (currentSection === 'papers' && line.startsWith('title:')) {
			// 前の論文データを保存
			if (currentPaper.title && currentTheme) {
				currentTheme.papers!.push(currentPaper as Paper);
			}
			currentPaper = { title: line.replace('title:', '').trim() };
		} else if (currentSection === 'papers' && line.startsWith('authors:')) {
			currentPaper.authors = line.replace('authors:', '').trim();
		} else if (currentSection === 'papers' && line.startsWith('conference:')) {
			currentPaper.conference = line.replace('conference:', '').trim();
		} else if (currentSection === 'papers' && line.startsWith('note:')) {
			currentPaper.note = line.replace('note:', '').trim();
		} else if (currentSection === 'papers' && line.startsWith('site-url:')) {
			const [, ...urlParts] = line.split(':');
			const url = urlParts.join(':').trim();
			if (url) {
				currentPaper.siteUrl = url;
			}
		}
	}

	// 最後のテーマを保存
	if (currentTheme && currentTheme.title) {
		if (currentPaper.title) {
			currentTheme.papers!.push(currentPaper as Paper);
		}
		themes.push(currentTheme as ResearchTheme);
	}

	return { themes };
}

/**
 * development.md をパースする
 */
export function parseDevelopmentMarkdown(content: string): DevelopmentInfo {
	const lines = content.split('\n');
	const result: DevelopmentInfo = {
		awards: [],
		techStack: {},
	};

	let currentSection = '';

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (line.startsWith('## Award')) {
			currentSection = 'award';
		} else if (line.startsWith('## Tech Stack') || line.startsWith('## Tech icons')) {
			currentSection = 'techIcons';
		} else if (line.startsWith('## Individuals')) {
			currentSection = 'individuals';
		} else if (currentSection === 'award' && line.startsWith('- ')) {
			const match = line.match(/- (.+?)\((.+?)\): (.+)/);
			if (match) {
				result.awards.push({
					event: match[1],
					date: match[2],
					award: match[3],
				});
			}
		} else if (currentSection === 'techIcons' && line.includes(':')) {
			const [category, techs] = line.split(':').map((s) => s.trim());
			result.techStack[category] = techs
				.split(',')
				.map((t) => t.trim())
				.filter((t) => t);
		}
	}

	return result;
}

/**
 * personal.md専用のパーサー（構造化データを返す）
 */
export async function parsePersonalInfo(filePath: string) {
	const { readFile } = await import('fs/promises');
	const absolutePath = filePath.startsWith('/')
		? `/Users/nakano/programming/nakano1122.github.io${filePath}`
		: filePath;

	const content = await readFile(absolutePath, 'utf-8');
	const result = parsePersonalMarkdown(content);

	return result;
}

/**
 * マークダウンファイルを読み込んでHTMLに変換する
 */
export async function parseMarkdown(filePath: string): Promise<string> {
	const { readFile } = await import('fs/promises');
	const absolutePath = filePath.startsWith('/')
		? `/Users/nakano/programming/nakano1122.github.io${filePath}`
		: filePath;

	const content = await readFile(absolutePath, 'utf-8');
	const lines = content.split('\n');
	let html = '';
	let inList = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();

		if (!trimmed) {
			if (inList) {
				html += '</ul>\n';
				inList = false;
			}
			continue;
		}

		// h1
		if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
			if (inList) {
				html += '</ul>\n';
				inList = false;
			}
			html += `<h1>${trimmed.substring(2)}</h1>\n`;
		}
		// h2
		else if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
			if (inList) {
				html += '</ul>\n';
				inList = false;
			}
			html += `<h2>${trimmed.substring(3)}</h2>\n`;
		}
		// h3
		else if (trimmed.startsWith('### ')) {
			if (inList) {
				html += '</ul>\n';
				inList = false;
			}
			html += `<h3>${trimmed.substring(4)}</h3>\n`;
		}
		// リスト
		else if (trimmed.startsWith('- ')) {
			if (!inList) {
				html += '<ul>\n';
				inList = true;
			}
			let listContent = trimmed.substring(2);
			// リンク [text](url)
			listContent = listContent.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
			html += `<li>${listContent}</li>\n`;
		}
		// key: value形式
		else if (trimmed.includes(':')) {
			if (inList) {
				html += '</ul>\n';
				inList = false;
			}
			const [key, ...valueParts] = trimmed.split(':');
			let value = valueParts.join(':').trim();

			// リンク処理
			if (value.startsWith('http')) {
				value = `<a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>`;
			} else {
				value = value.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
			}

			html += `<div class="info-item"><span class="info-label">${key.trim()}:</span> <span class="info-value">${value}</span></div>\n`;
		}
		// 通常のテキスト
		else {
			if (inList) {
				html += '</ul>\n';
				inList = false;
			}
			let text = trimmed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
			html += `<p>${text}</p>\n`;
		}
	}

	if (inList) {
		html += '</ul>\n';
	}

	return html;
}
