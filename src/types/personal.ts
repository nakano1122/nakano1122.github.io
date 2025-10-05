/**
 * 個人情報関連の型定義
 */

export interface PersonalInfo {
	name: string;
	affiliation: {
		university: string;
		faculty: string;
	};
	year: string;
	contact: {
		email: string;
		github: {
			username: string;
			url: string;
		};
		atcoder?: string;
	};
	education?: EducationItem[];
	internships?: Internship[];
}

export interface EducationItem {
	period: string;
	institution: string;
}

export interface JobHistoryItem {
	company: string;
	startMonth: string;
	finishMonth: string;
	hpLink: string;
	position: string;
}

export interface Internship {
	company: string;
	period: string;
	position: string;
}
