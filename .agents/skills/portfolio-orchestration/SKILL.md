---
name: portfolio-orchestration
description: Astro 5 製ポートフォリオサイトの開発依頼を分類し、専門 Skill と subagent へ安全に委譲して統合する。複数領域にまたがる機能追加、改修、レビュー、実装順序や担当分割の判断時に使用する。
---

# ポートフォリオ開発の統括

`docs/domain-model.md` を用語とモデルの正とし、まず対象パスと既存実装を確認する。

## 委譲

- UI・レイアウトは `portfolio-design` とデザイナーに委譲する。所有範囲は `src/components/**` とレイアウトの CSS。
- Astro のページ、loader、ドメイン境界、Content Collections は `astro-portfolio` と Astro 担当に委譲する。所有範囲は `src/pages/**`、`src/application/**`、`src/content.config.ts`。
- 実績・研究・経歴 Markdown は `portfolio-content` とコンテンツ担当に委譲する。所有範囲は `src/contents/**`。
- 検索・共有・アクセシビリティ監査は `portfolio-seo` とレビュー担当に委譲する。レビューだけなら読み取り専用にする。

独立した作業だけを最大 3 worker まで並行実行する。同一ファイルまたは同じ CSS・スキーマを変更する作業は直列化し、統括担当が差分の整合と最終検証を担う。

## 統合

1. 依頼を UI、Astro 実装、コンテンツ、SEO/a11y に分解し、依存関係を明記する。
2. 各担当へ目的、変更可能パス、制約、検証コマンドを渡す。事実が不足するコンテンツは推測せず確認する。
3. 変更後に `npx astro check` と `npm run build` を実行し、担当間の props、URL、日英表示、Content Collection スキーマを確認する。
4. 既存の汎用 Skill は重複作成せず、必要時に `accessibility`、`css-styling`、`web-design-principles`、`imagegen` を併用する。
