---
name: portfolio-content
description: このポートフォリオの研究、開発、受賞、学歴、資格、活動の Markdown コンテンツを Content Collection スキーマに従って安全に追加・更新する。`src/contents/**` の実績・経歴・日英 frontmatter や本文を変更するときに使用する。
---

# ポートフォリオコンテンツ管理

`src/content.config.ts` を frontmatter の唯一の正とし、`docs/domain-model.md` の用語に従う。未提示の事実、日付、URL、英訳、受賞名を補完しない。不足情報は質問するか、既存の optional field を省略する。

## 更新手順

1. 内容に対応する collection と配置先を `src/content.config.ts` から確認する。例: 研究テーマは `src/contents/research/topics`、論文は `research/papers`、開発は `developments`、経歴は `about/**`、活動は `activity/**`。
2. 既存エントリの frontmatter と date/期間の書式を踏襲する。必須の日本語フィールドを満たし、英語フィールドは schema が optional の場合だけ省略できる。
3. 本文を日英併記する場合は、`<!-- lang:en -->` を一度だけ置く。前半は日本語、後半は英語として `remark-bilingual.mjs` がラップする。区切りがない本文は日本語のみになる。
4. URL、画像、repository、links、enum 値を schema の型と許可値に合わせる。ファイル名と `id` を扱う collection では既存の URL 生成規則を確認する。
5. `npx astro check` と `npm run build` を実行し、スキーマ、Markdown、静的ページ生成を確認する。
