/**
 * 開発関連の型定義
 */

export interface DevelopmentInfo {
	awards: AwardItem[];
	techStack: Record<string, string[]>;
}

export interface AwardItem {
	event: string;
	date: string;
	award: string;
}

export interface TechEvent {
	name: string;
	award: string;
	date: string;
}

export interface TechStack {
	[key: string]: string[];
}

export interface DevelopmentExperience {
	events: TechEvent[];
	awards: AwardItem[];
	techStack: TechStack;
}
