/**
 * 研究関連の型定義
 */

export interface Paper {
	title: string;
	authors?: string;
	conference: string;
	note?: string;
}

export interface ResearchInfo {
	title: string;
	abstract: string;
	papers: Paper[];
}

export interface ResearchHistory {
	papers: Paper[];
	researchContent?: string;
}
