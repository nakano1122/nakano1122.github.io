/**
 * 研究関連の型定義
 */

export interface Paper {
	title: string;
	authors?: string;
	conference: string;
	note?: string;
	siteUrl?: string;
}

export interface ResearchTheme {
	title: string;
	abstract: string;
	papers: Paper[];
}

export interface ResearchHistory {
	themes: ResearchTheme[];
	papers: Paper[];
	researchContent?: string;
}
