---
name: astro-portfolio
description: この Astro 5 ポートフォリオのページ、Content Collections、loader、domain 層を既存アーキテクチャに沿って実装・変更する。`src/pages/**`、`src/application/**`、`src/domain/**`、`src/content.config.ts`、動的詳細ページの変更時に使用する。
---

# Astro ポートフォリオ実装

`docs/domain-model.md` をドメイン用語と責務の正とする。ページは `src/pages`、表示用の取得・変換は `src/application`、型とモデルは `src/domain`、外部連携は `src/infrastructure` に分離する。

## 実装手順

1. 既存の同種ページと loader を読み、データ取得を UI コンポーネントへ持ち込まない。
2. Content Collections を追加・変更する場合は、先に `src/content.config.ts` の loader、Zod schema、対象ディレクトリを更新し、対応する domain/application の型変換をそろえる。
3. 詳細ページは既存の `[id].astro` の静的パス生成・未検出時の挙動に合わせる。URL 形式を独自に変更しない。
4. `@/` import、Astro frontmatter、`Layout.astro` のメタデータ props を既存の形式で使用する。
5. `npx astro check` と `npm run build` を実行し、Content Collection のスキーマ不整合と静的生成の失敗を確認する。
