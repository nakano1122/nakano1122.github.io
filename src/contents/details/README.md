# 詳細コンテンツ ファイルガイド

## ディレクトリ構成
src/contents/details/
├── research/      # 研究論文の詳細（受賞歴を含む）
├── projects/      # プロジェクトの詳細
└── development/   # ハッカソン・開発イベントの詳細（受賞歴を含む）

## 新規コンテンツの作成

```bash
# 引数指定
npm run new -- <section> <filename>
# 例: npm run new -- research deim-2027-new-paper

# インタラクティブモード
npm run new
```

セクション: `research`, `development`, `projects`

## 命名規則
- ケバブケース（小文字 + ハイフン区切り）を使用
- 識別しやすい短い名前をつける
- Research: `{conference名}-{年}-{キーワード}.md`
- Projects: `{プロジェクト名}.md`
- Development: `{イベント名}.md`

## frontmatter フィールド

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `startDate` | `YYYY-MM-DD` | 必須 | 開始日（表示順のソートに使用、新しい順） |
| `endDate` | `YYYY-MM-DD` | 任意 | 終了日（進行中の場合は空欄） |
| `title` | string | 任意 | タイトル |
| `name` | string | 任意 | イベント名・プロジェクト名 |
| `authors` | string | 任意 | 著者（research用） |
| `conference` | string | 任意 | 学会名（research用） |
| `award` | string | 任意 | 受賞歴 |
| `links` | string[] | 任意 | 関連リンク |

## ファイルの書き方
- 通常のマークダウン記法が使用可能
- HTML タグの直接記述が可能（iframe, img 等）
- SpeakerDeck 埋め込み: iframe タグを使用
- 画像: ![alt](url) 記法 または img タグ

## personal.md との紐付け
personal.md 内の各アイテムに `detail: ディレクトリ/ファイル名（拡張子なし）` を記述
