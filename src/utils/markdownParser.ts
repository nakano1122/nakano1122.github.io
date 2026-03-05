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

export interface ParsedPersonalData {
	profile: ParsedProfile;
	skills: ParsedSkill[];
	education: ParsedEducation[];
	laboratories: ParsedLaboratory[];
	jobHistory: ParsedJobHistory[];
}

// ===========================================
// パーサー実装
// ===========================================

/**
 * personal.md をパースする
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
	};

	let currentSection = '';
	let currentLab: Partial<ParsedLaboratory> = {};
	let currentJob: Partial<ParsedJobHistory> = {};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		// セクション判定（# で始まる行）
		if (line.startsWith('# ') && !line.startsWith('## ')) {
			// 前のセクションのデータを保存
			saveCurrentSubData();

			const sectionName = line.replace('# ', '').trim();
			currentSection = sectionName.toLowerCase();
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

	}

	// 最後のデータを保存
	saveCurrentSubData();

	function saveCurrentSubData() {
		if (currentLab.name && currentLab.startMonth) {
			result.laboratories.push(currentLab as ParsedLaboratory);
			currentLab = {};
		}
		if (currentJob.company && currentJob.startMonth) {
			result.jobHistory.push(currentJob as ParsedJobHistory);
			currentJob = {};
		}
	}

	return result;
}
