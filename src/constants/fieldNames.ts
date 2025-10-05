/**
 * マークダウンのフィールド名を表示用の名前に変換する辞書
 */

// プロフィール関連のフィールド名変換
export const profileFieldNames: Record<string, string> = {
	// Profile section
	name: '氏名',
	department: '所属',
	grade: '学年',
	mail: 'メールアドレス',
	GitHub: 'GitHub',

	// Education section
	Education: '学歴',

	// Job History section
	'Job History': 'インターン経験',
	'start-month': '開始時期',
	'finish-month': '終了時期',
	'HP-link': 'Webサイト',
	position: '職種',
};

// 研究関連のフィールド名変換
export const researchFieldNames: Record<string, string> = {
	Research: '研究',
	abstract: '研究概要',
	papers: '論文発表実績',
	title: 'タイトル',
	conference: '学会',
	note: '備考',
};

// 開発関連のフィールド名変換
export const developmentFieldNames: Record<string, string> = {
	Development: '開発',
	Award: '受賞歴',
	'Tech icons': '技術スタック',
	frontend: 'フロントエンド',
	backend: 'バックエンド',
	Infrastructure: 'インフラストラクチャ',
	Individuals: '個人開発',
};

// カテゴリー名の表示名変換
export const categoryDisplayNames: Record<string, string> = {
	frontend: 'Frontend',
	backend: 'Backend',
	Infrastructure: 'Infrastructure',
	'フロントエンド': 'Frontend',
	'バックエンド': 'Backend',
	'インフラストラクチャ': 'Infrastructure',
};

// すべてのフィールド名変換を統合
export const allFieldNames: Record<string, string> = {
	...profileFieldNames,
	...researchFieldNames,
	...developmentFieldNames,
};

/**
 * フィールド名を表示用の名前に変換する関数
 * @param fieldName マークダウンのフィールド名
 * @returns 表示用の名前（変換できない場合は元の名前）
 */
export function getDisplayName(fieldName: string): string {
	return allFieldNames[fieldName] || fieldName;
}

/**
 * カテゴリー名を表示用の名前に変換する関数
 * @param categoryName カテゴリー名
 * @returns 表示用のカテゴリー名
 */
export function getCategoryDisplayName(categoryName: string): string {
	return categoryDisplayNames[categoryName] || categoryName;
}
