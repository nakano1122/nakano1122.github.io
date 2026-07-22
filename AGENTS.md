# Codex 向けプロジェクトガイド

## プロジェクト概要

- Astro 5 で構築した GitHub Pages 向け静的ポートフォリオ。
- 主な画面は `src/pages/`、UI は `src/components/`、データ取得は `src/application/`、型とドメインは `src/domain/`、コンテンツは `src/contents/` に配置する。
- ドメイン用語とモデルは `docs/domain-model.md` を唯一の正とする。実装前に参照し、矛盾する変更は先に明示する。

## コンテンツとデザイン規約

- Content Collections のスキーマは `src/content.config.ts` を唯一の正とする。`src/contents/` の frontmatter は必ずスキーマに適合させる。
- 日本語は必須、英語は任意。英語がない場合は既存コンポーネントと同様に日本語へフォールバックさせる。
- 実績、所属、経歴、受賞、外部 URL は与えられた事実だけを記載する。推測で補完しない。
- 既存のデザイントークン、ライト/ダークテーマ、`data-lang` による日英切替を維持する。
- UI 変更ではセマンティック HTML、キーボード操作、十分なコントラスト、モバイル表示を確認する。

## オーケストレーション

- すべての開発依頼はルート agent がオーケストレーターとして扱う。`portfolio-orchestration` Skill を使い、要件・所有パス・依存関係を確認してから作業を割り当てる。
- 専門性が必要な作業、または独立した作業が 2 件以上ある場合は、適切な custom agent を直接 subagent として起動する。単純な 1 行修正以外も専門 agent への委譲を優先する。
- 同時に起動する worker は最大 3。直接の子 agent のみを起動し、ルート agent が結果の統合、競合解消、最終検証を行う。
- 同じファイルまたは依存するファイルを変更するタスクは直列化する。並列で書き込む場合は、所有パスが重ならないことを確認する。
- 委譲時は目的、変更してよいパス、変更禁止パス、適用する Skill、完了条件を明示する。

## Custom agent の割り当て

- `portfolio-designer`: `src/components/**` とレイアウト CSS の UI・レスポンシブ実装。
- `astro-specialist`: `src/pages/**`、`src/application/**`、`src/domain/**`、`src/infrastructure/**`、`src/content.config.ts`、Astro 設定とスクリプト。
- `portfolio-content-editor`: `src/contents/**` とそれに対応する `public/images/**`。事実確認とスキーマ検証を担当。
- `seo-a11y-reviewer`: 読み取り専用の SEO・アクセシビリティ監査。修正案と確認結果を返す。
- `portfolio-orchestrator`: 複数領域の要件分解、Skill 選択、委譲、統合レビュー。

## Skill 選択

- 委譲・統合: `portfolio-orchestration`
- UI/UX: `portfolio-design` と必要に応じて `accessibility`、`css-styling`、`web-design-principles`
- Astro/コンテンツコレクション: `astro-portfolio`
- コンテンツ追加・更新: `portfolio-content`
- 検索最適化、構造化データ、メタデータ: `portfolio-seo` と `accessibility`
- 画像を新規作成・編集する場合だけ `imagegen`

## 検証コマンド

```bash
npm run build
npx astro check
```

- `npm run build` は Zenn 記事取得を行うためネットワークが必要。
- UI 変更では必要に応じて `npm run dev` で表示を確認する。
- 現在の `npx astro check` には `ProfileSummarySection.astro` の既存型エラー 2 件とヒント 2 件がある。今回の変更で診断を増やさない。既存不具合は依頼範囲に含まれる場合だけ修正する。
- 完了時は変更内容、実行した検証、残る既知の問題を簡潔に報告する。
