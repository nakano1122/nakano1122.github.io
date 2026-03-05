# 詳細コンテンツ ファイルガイド

## ディレクトリ構成
src/contents/details/
├── research/      # 研究論文の詳細（受賞歴を含む）
├── projects/      # プロジェクトの詳細
└── development/   # ハッカソン・開発イベントの詳細（受賞歴を含む）

## 命名規則
- ケバブケース（小文字 + ハイフン区切り）を使用
- 識別しやすい短い名前をつける
- Research: `{conference名}-{年}-{キーワード}.md`
- Projects: `{プロジェクト名}.md`
- Development: `{イベント名}.md`

## ファイルの書き方
- 通常のマークダウン記法が使用可能
- HTML タグの直接記述が可能（iframe, img 等）
- SpeakerDeck 埋め込み: iframe タグを使用
- 画像: ![alt](url) 記法 または img タグ

## personal.md との紐付け
personal.md 内の各アイテムに `detail: ディレクトリ/ファイル名（拡張子なし）` を記述
