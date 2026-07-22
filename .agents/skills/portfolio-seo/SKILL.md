---
name: portfolio-seo
description: この Astro ポートフォリオのページ別メタデータ、canonical、OGP、JSON-LD、サイトマップ、日英表示、アクセシビリティを監査して改善する。公開ページや `Layout.astro`、SEO 関連設定を変更またはレビューするときに使用する。
---

# ポートフォリオ SEO・a11y

まず `src/components/layouts/Layout.astro`、各 `src/pages/**/*.astro`、`astro.config.mjs` を確認する。サイトの基準 URL は `https://nakano1122.github.io/` であり、サイトマップは `@astrojs/sitemap` が生成する。

## 監査と修正

1. 各ページの title、description、canonical、`og:url` がそのページを指し、相互に矛盾しないことを確認する。共有用 title/description と通常の meta description も一致させる。
2. `ProfilePage` と `Person` の JSON-LD を、公開済みのプロフィール情報と整合させる。推測した肩書き、URL、SNS、実績は追加しない。
3. `astro.config.mjs` の sitemap 設定とページ URL を確認し、静的ページと動的詳細ページが到達可能であることを確認する。
4. `data-lang`、`lang-ja`、`lang-en` と HTML の `lang` 属性が日英切替時にも妥当であることを確認する。キーボード、見出し階層、代替テキスト、フォーカス、コントラストは `accessibility` を併用して監査する。
5. 修正後は `npx astro check` と `npm run build` を実行する。レビューのみの依頼ではファイルを変更せず、問題、影響、修正対象を報告する。
