/**
 * マークダウンファイルをパースして構造化されたデータを返すユーティリティ
 */

// ===========================================
// 型定義
// ===========================================

export interface ParsedProfile {
	name: string;
	department: string;
	grade: string;
	mail: string;
	github: string;
	atcoder?: string;
	atcoderRank?: string;
}

export interface ParsedSkill {
	name: string;
	date?: string;
}

export interface ParsedEducation {
	period: string;
	institution: string;
}

export interface ParsedLaboratory {
	name: string;
	siteUrl?: string;
	startMonth: string;
	finishMonth?: string;
}

export interface ParsedJobHistory {
	company: string;
	startMonth: string;
	finishMonth?: string;
	hpLink?: string;
	position: string;
}

export interface ParsedResearch {
	title: string;
	authors: string;
	conference: string;
	siteUrl?: string;
}

export interface ParsedAward {
	category: string;
	items: string[];
}

export interface ParsedProject {
	name: string;
	title: string;
	description: string;
	siteUrl?: string;
}

export interface ParsedPersonalData {
	profile: ParsedProfile;
	skills: ParsedSkill[];
	education: ParsedEducation[];
	laboratories: ParsedLaboratory[];
	jobHistory: ParsedJobHistory[];
	research: ParsedResearch[];
	awards: ParsedAward[];
	projects: ParsedProject[];
}

// ===========================================
// パーサー実装
// ===========================================

/**
 * personal.md をパースする（新形式対応）
 */
export function parsePersonalMarkdown(content: string): ParsedPersonalData {
	const lines = content.split('\n');
	const result: ParsedPersonalData = {
		profile: {
			name: '',
			department: '',
			grade: '',
			mail: '',
			github: '',
		},
		skills: [],
		education: [],
		laboratories: [],
		jobHistory: [],
		research: [],
		awards: [],
		projects: [],
	};

	let currentSection = '';
	let currentSubSection = '';
	let currentLab: Partial<ParsedLaboratory> = {};
	let currentJob: Partial<ParsedJobHistory> = {};
	let currentResearch: Partial<ParsedResearch> = {};
	let currentProject: Partial<ParsedProject> = {};
	let currentAwardCategory = '';
	let currentAwardItems: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		// セクション判定（# で始まる行）
		if (line.startsWith('# ') && !line.startsWith('## ')) {
			// 前のセクションのデータを保存
			saveCurrentData();

			const sectionName = line.replace('# ', '').trim();
			currentSection = sectionName.toLowerCase();
			currentSubSection = '';
			continue;
		}

		// サブセクション判定（## で始まる行）
		if (line.startsWith('## ') && !line.startsWith('### ')) {
			// 前のサブセクションのデータを保存
			saveCurrentSubData();

			const subSectionName = line.replace('## ', '').trim();

			if (currentSection === 'laboratory') {
				currentLab = { name: subSectionName };
			} else if (currentSection === 'job history') {
				currentJob = { company: subSectionName };
			} else if (currentSection === 'projects') {
				currentProject = { name: subSectionName };
			} else if (currentSection === 'awards') {
				// 前のカテゴリを保存
				if (currentAwardCategory && currentAwardItems.length > 0) {
					result.awards.push({
						category: currentAwardCategory,
						items: [...currentAwardItems],
					});
				}
				currentAwardCategory = subSectionName;
				currentAwardItems = [];
			}
			continue;
		}

		// プロファイルセクション
		if (currentSection === 'profile' && line.includes(':')) {
			const colonIndex = line.indexOf(':');
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();

			switch (key.toLowerCase()) {
				case 'name':
					result.profile.name = value;
					break;
				case 'department':
					result.profile.department = value;
					break;
				case 'grade':
					result.profile.grade = value;
					break;
				case 'mail':
					result.profile.mail = value;
					break;
				case 'github':
					result.profile.github = value;
					break;
				case 'atcoder':
				result.profile.atcoder = value;
				break;
			case 'atcoderrank':
				result.profile.atcoderRank = value;
				break;
			}
		}

		// スキルセクション
		if (currentSection === 'skills' && line.startsWith('- ')) {
			const skillText = line.substring(2).trim();
			const dateMatch = skillText.match(/\((\d{4}\/\d{2})\)/);
			if (dateMatch) {
				result.skills.push({
					name: skillText.replace(dateMatch[0], '').trim(),
					date: dateMatch[1],
				});
			} else {
				result.skills.push({ name: skillText });
			}
		}

		// 学歴セクション
		if (currentSection === 'education' && line.match(/^\d{4}\/\d{2}/)) {
			const colonIndex = line.indexOf(':');
			if (colonIndex !== -1) {
				const period = line.substring(0, colonIndex).trim();
				const institution = line.substring(colonIndex + 1).trim();
				result.education.push({ period, institution });
			}
		}

		// 研究室セクション
		if (currentSection === 'laboratory' && line.includes(':')) {
			const colonIndex = line.indexOf(':');
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();

			switch (key) {
				case 'site-url':
					currentLab.siteUrl = value;
					break;
				case 'start-month':
					currentLab.startMonth = value;
					break;
				case 'finish-month':
					currentLab.finishMonth = value || undefined;
					break;
			}
		}

		// 職歴セクション
		if (currentSection === 'job history' && line.includes(':')) {
			const colonIndex = line.indexOf(':');
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();

			switch (key) {
				case 'start-month':
					currentJob.startMonth = value;
					break;
				case 'finish-month':
					currentJob.finishMonth = value || undefined;
					break;
				case 'HP-link':
					currentJob.hpLink = value;
					break;
				case 'position':
					currentJob.position = value;
					break;
			}
		}

		// 研究セクション
		if (currentSection === 'research' && line.includes(':')) {
			const colonIndex = line.indexOf(':');
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();

			switch (key) {
				case 'title':
					// 前の研究を保存
					if (currentResearch.title) {
						result.research.push(currentResearch as ParsedResearch);
					}
					currentResearch = { title: value };
					break;
				case 'authors':
					currentResearch.authors = value;
					break;
				case 'conference':
					currentResearch.conference = value;
					break;
				case 'site-url':
					currentResearch.siteUrl = value;
					break;
			}
		}

		// 受賞セクション
		if (currentSection === 'awards' && line.startsWith('- ')) {
			currentAwardItems.push(line.substring(2).trim());
		}

		// プロジェクトセクション
		if (currentSection === 'projects' && line.includes(':')) {
			const colonIndex = line.indexOf(':');
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();

			switch (key) {
				case 'title':
					currentProject.title = value;
					break;
				case 'description':
					currentProject.description = value;
					break;
				case 'site-url':
					currentProject.siteUrl = value;
					break;
			}
		}
	}

	// 最後のデータを保存
	saveCurrentData();

	function saveCurrentSubData() {
		if (currentLab.name && currentLab.startMonth) {
			result.laboratories.push(currentLab as ParsedLaboratory);
			currentLab = {};
		}
		if (currentJob.company && currentJob.startMonth) {
			result.jobHistory.push(currentJob as ParsedJobHistory);
			currentJob = {};
		}
		if (currentProject.name && currentProject.title) {
			result.projects.push(currentProject as ParsedProject);
			currentProject = {};
		}
	}

	function saveCurrentData() {
		saveCurrentSubData();

		if (currentResearch.title) {
			result.research.push(currentResearch as ParsedResearch);
			currentResearch = {};
		}
		if (currentAwardCategory && currentAwardItems.length > 0) {
			result.awards.push({
				category: currentAwardCategory,
				items: [...currentAwardItems],
			});
			currentAwardCategory = '';
			currentAwardItems = [];
		}
	}

	return result;
}
