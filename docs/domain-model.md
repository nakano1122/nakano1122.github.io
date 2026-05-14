# ドメインモデル定義

このドキュメントはポートフォリオサイトのドメインモデルを定義する。
実装はこのドキュメントに準拠すること。

## ユビキタス言語辞書

### コアドメイン

| 用語         | 英語          | 定義                                                                               |
| ------------ | ------------- | ---------------------------------------------------------------------------------- |
| プロフィール | Profile       | ポートフォリオの主体者に関する情報の集約。個人情報、連絡先、SNS リンク、職歴を含む |
| 個人情報     | PersonalInfo  | 氏名、所属（大学・企業）など、主体者を識別する情報                                 |
| 職歴         | JobHistory    | 過去および現在の勤務先・役職・期間の履歴                                           |
| 研究         | Research      | 学術研究の成果。論文発表や学会発表を含む                                           |
| 開発         | Development   | 開発プロジェクトの成果。個人開発やチーム開発を含む                                 |
| ブログ記事   | BlogArticle   | 外部プラットフォーム（Zenn, Note 等）に公開した技術記事                            |
| 受賞         | Award         | コンテストや学会での受賞実績                                                       |
| 資格         | Certification | 取得した資格・認定                                                                 |
| 学歴         | Education     | 教育機関での学習歴。研究室所属を含む                                               |

### サポートドメイン

| 用語                 | 英語          | 定義                                                                   |
| -------------------- | ------------- | ---------------------------------------------------------------------- |
| 期間                 | Period        | 開始日と終了日で表される時間範囲。終了日がない場合は「現在」を意味する |
| バイリンガルテキスト | BilingualText | 日本語と英語の両方で表現されるテキスト                                 |
| 外部リンク           | ExternalLink  | 外部サイトへの URL                                                     |
| ブログソース         | BlogPlatform  | ブログ記事の配信元プラットフォーム（Zenn, Note）                       |

## ドメイン集約

### 1. Profile（プロフィール集約）

ポートフォリオの主体者に関する全情報を統括する集約ルート。

```
Profile（集約ルート）
├── PersonalInfo（値オブジェクト）
│   ├── name: BilingualText       # 氏名
│   └── department: BilingualText # 所属
├── Contact（値オブジェクト）
│   └── email: Email              # メールアドレス
├── SocialLinks（値オブジェクト）
│   ├── github: URL               # GitHubプロフィール
│   ├── zenn?: URL                # Zennプロフィール
│   └── atcoder?: AtCoderProfile  # AtCoderプロフィール
└── SEO（値オブジェクト）
    ├── title: string             # ページタイトル
    ├── description: string       # ページ説明
    └── keywords: string          # キーワード
```

### 2. JobHistory（職歴集約）

職歴を管理する集約。複数の職歴エントリを保持する。

```
JobHistory（集約ルート）
└── entries: JobEntry[]           # 職歴エントリのリスト
    ├── company: BilingualText    # 会社名
    ├── position: BilingualText   # 役職
    ├── period: Period            # 在籍期間
    └── website?: URL             # 会社HP
```

### 3. Research（研究集約）

学術研究の成果を表す集約。タイトルと発表学会で一意に識別可能。

```
Research（集約ルート）
├── period: Period                # 研究期間
├── title: BilingualText          # 論文タイトル
├── authors: BilingualText        # 著者一覧
├── conference: string            # 発表学会・ジャーナル
├── award?: BilingualText         # 受賞（ベストペーパー等）
├── links?: ExternalLink[]        # 関連リンク（PDF, スライド等）
└── content?: BilingualText       # 詳細説明（Markdown）
```

### 4. Development（開発集約）

開発プロジェクトの成果を表す集約。プロジェクト名で一意に識別可能。

```
Development（集約ルート）
├── period: Period                # 開発期間
├── name: BilingualText           # プロジェクト名
├── title: BilingualText          # プロジェクト概要
├── repository?: URL              # ソースコードリポジトリ
├── links?: ExternalLink[]        # 関連リンク（デモ, 記事等）
└── content?: BilingualText       # 詳細説明（Markdown）
```

### 5. BlogArticle（ブログ記事集約）

外部プラットフォームに公開した技術記事を表す集約。URLで一意に識別可能。

```
BlogArticle（集約ルート）
├── title: string                 # 記事タイトル
├── url: URL                      # 記事URL
├── publishedAt: Date             # 公開日
└── platform: BlogPlatform        # 配信元（'zenn' | 'note'）
```

### 6. Award（受賞集約）

受賞実績を表す集約。タイトルと日付で一意に識別可能。

```
Award（集約ルート）
├── date: Date                    # 受賞日
├── title: BilingualText          # 受賞タイトル
├── summary?: BilingualText       # 概要
├── links?: ExternalLink[]        # 関連リンク
└── content?: BilingualText       # 詳細説明（Markdown）
```

### 7. Certification（資格集約）

取得資格を表す集約。資格名で一意に識別可能。

```
Certification（集約ルート）
├── date: Date                    # 取得日
└── name: BilingualText           # 資格名
```

### 8. Education（学歴集約）

教育機関での学習歴を表す集約。機関名と期間で一意に識別可能。

```
Education（集約ルート）
├── period: Period                # 在籍期間
├── institution: BilingualText    # 教育機関名
├── laboratory?: Laboratory       # 研究室（値オブジェクト）
│   ├── name: BilingualText       # 研究室名
│   └── website?: URL             # 研究室HP
└── content?: BilingualText       # 詳細説明（Markdown）
```

## 値オブジェクト定義

### BilingualText

日英両言語のテキストを保持する値オブジェクト。

```typescript
interface BilingualText {
  ja: string; // 日本語テキスト（必須）
  en?: string; // 英語テキスト（オプション）
}
```

### Period

期間を表す値オブジェクト。

```typescript
interface Period {
  startDate: Date; // 開始日（必須）
  endDate?: Date; // 終了日（オプション、未設定は「現在」）
}
```

### Email

メールアドレスを表す値オブジェクト。スパム対策のため分割保持。

```typescript
interface Email {
  user: string; // ユーザー部分
  domain: string; // ドメイン部分
}
```

### AtCoderProfile

AtCoder プロフィールを表す値オブジェクト。

```typescript
interface AtCoderProfile {
  url: URL; // プロフィールURL
  rank: string; // ランク（色）
}
```

### BlogPlatform

ブログ記事の配信元を表す値オブジェクト。

```typescript
type BlogPlatform = "zenn" | "note";
```

## ドメインサービス

### BlogArticleService

複数プラットフォームからブログ記事を取得・統合するサービス。

```typescript
interface BlogArticleService {
  // 全ブログ記事を取得（公開日降順）
  loadAll(): Promise<BlogArticle[]>;

  // 特定プラットフォームの記事のみ取得
  loadByPlatform(platform: BlogPlatform): Promise<BlogArticle[]>;
}
```

## 外部システムとの境界

### Zenn API

Zenn API からの記事取得は、外部 API 型（`ZennApiArticle`）からドメイン型（`BlogArticle`）への変換を行う。

```
[Zenn API] → ZennApiArticle → Converter → BlogArticle
```

### Note（手動管理）

Note 記事は API がないため、静的データとして管理し、ドメイン型に変換する。

```
[静的データ] → NoteArticleInput → Converter → BlogArticle
```

## ディレクトリ構造とドメインのマッピング

フラットな構造でドメイン、コンポーネント、ページ、コンテンツ、フックを同階層に配置。

```
src/
├── domain/                    # ドメイン層（ビジネスロジック）
│   ├── shared/               # 共有値オブジェクト
│   │   └── types.ts          # BilingualText, Period, Email等
│   ├── profile/              # Profile集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── jobHistory/           # JobHistory集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── research/             # Research集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── development/          # Development集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── blog/                 # BlogArticle集約
│   │   ├── types.ts
│   │   ├── converter.ts      # ZennApi/Note → BlogArticle
│   │   ├── service.ts        # BlogArticleService
│   │   └── data.ts           # Note記事データ
│   ├── award/                # Award集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── certification/        # Certification集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── education/            # Education集約
│   │   ├── types.ts
│   │   └── loader.ts
│   ├── infrastructure/       # インフラ層（外部システム連携）
│   │   ├── api/              # 外部API
│   │   │   └── zennClient.ts
│   │   └── formatters/       # 表示用フォーマット
│   │       └── date.ts
│   └── index.ts              # 全ドメイン型re-export
│
├── components/                # コンポーネント（ページ内のパーツ）
│   ├── sections/             # セクションコンポーネント
│   │   ├── HeroSection.astro
│   │   ├── BlogsSection.astro
│   │   └── ...
│   ├── ui/                   # 共通UIコンポーネント
│   │   ├── ThemeToggle.astro
│   │   ├── LanguageToggle.astro
│   │   └── ...
│   └── layouts/              # レイアウト
│       └── Layout.astro
│
├── pages/                     # ページ
│   └── index.astro
│
├── contents/                  # コンテンツ（MDファイル）
│   ├── personal.md
│   ├── research/
│   ├── development/
│   └── ...
│
└── hooks/                     # UI状態管理（クライアントサイド）
    ├── useTheme.ts           # テーマ状態（light/dark）
    └── useLanguage.ts        # 言語状態（ja/en）
```

### 依存関係

```
pages → components → domain
            ↓
         hooks
```

- pages はコンポーネントを組み合わせてページを構築
- components はドメイン層のデータを使用し、hooksでUI状態を管理
- domain は他に依存しない（infrastructure含む）
