---
name: portfolio-design
description: この Astro 5 ポートフォリオの UI、レイアウト、レスポンシブ表示を既存デザインとアクセシビリティを保って設計・実装する。`src/components/**`、`src/components/layouts/**`、テーマや言語切替に関わるデザイン変更時に使用する。
---

# ポートフォリオデザイン

`src/components/layouts/Layout.astro` をデザインの正とする。グローバル変数の `--color-*`、`--space-*`、`--font-*`、`--transition-*` を再利用し、局所的なハードコードを増やさない。

## 実装手順

1. 変更前に対象コンポーネントと `Layout.astro` のライト・ダークテーマ、`data-lang` の表示規則を確認する。
2. コンポーネントの責務を保ち、表示用データは既存の domain/application 層から props として受け取る。コンポーネントに取得処理やコンテンツの事実を埋め込まない。
3. `ThemeToggle.astro` と `LanguageToggle.astro` を壊さず、`lang-ja` と `lang-en` の両方で意味が通る見出し・補助テキストを用意する。
4. キーボード操作、フォーカス可視化、十分なコントラスト、意味論的 HTML を確認する。詳細な判断では `accessibility`、`css-styling`、`web-design-principles` を併用する。
5. 768px 以下を含む狭い画面で、横スクロールと操作不能な UI がないことを確認し、`npx astro check` と `npm run build` を実行する。
