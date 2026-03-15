#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENTS_DIR = join(ROOT, 'src', 'contents');

const SECTIONS = ['research', 'development', 'projects'];

const today = new Date().toISOString().split('T')[0];

const TEMPLATES = {
	research: `---
startDate: ${today}
endDate:
title: ""
authors: ""
conference: ""
award: ""
links:
  - ""
---

（ここに研究の概要を記述）

## 手法

-
`,
	development: `---
startDate: ${today}
endDate:
name: ""
title: ""
award: ""
links:
  - ""
---

（ここにイベントの概要を記述）
`,
	projects: `---
startDate: ${today}
endDate:
name: ""
title: ""
links:
  - ""
---

（ここにプロジェクトの概要を記述）

## 工夫点

-
`,
};

function isKebabCase(str) {
	return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
}

function prompt(question) {
	const rl = createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

async function main() {
	let [section, filename] = process.argv.slice(2);

	if (!section) {
		console.log('セクションを選択してください:');
		SECTIONS.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
		const choice = await prompt('番号を入力: ');
		const index = parseInt(choice, 10) - 1;
		if (index < 0 || index >= SECTIONS.length) {
			console.error('エラー: 無効な番号です');
			process.exit(1);
		}
		section = SECTIONS[index];
	}

	if (!SECTIONS.includes(section)) {
		console.error(`エラー: セクション "${section}" は無効です。有効: ${SECTIONS.join(', ')}`);
		process.exit(1);
	}

	if (!filename) {
		filename = await prompt('ファイル名（ケバブケース、拡張子不要）: ');
	}

	filename = filename.replace(/\.md$/, '');

	if (!isKebabCase(filename)) {
		console.error('エラー: ファイル名はケバブケース（小文字 + ハイフン区切り）で指定してください');
		console.error('  例: my-new-content');
		process.exit(1);
	}

	const dirPath = join(CONTENTS_DIR, section);
	const filePath = join(dirPath, `${filename}.md`);

	if (existsSync(filePath)) {
		console.error(`エラー: ${filePath} は既に存在します`);
		process.exit(1);
	}

	mkdirSync(dirPath, { recursive: true });
	writeFileSync(filePath, TEMPLATES[section], 'utf-8');

	console.log(`作成しました: src/contents/${section}/${filename}.md`);
}

main();
