---
title: "SDSC2024"
description: 五感を満たすスポットをおすすめ！
url:
date: 2024-11-03
image:
math:
license:
categories: [Web開発, ハッカソン]
tags: [B3, ハッカソン]
draft: false
---

## アプリ名

**浜松 de 五感を満たすおでかけ提案サービス「どこ行く？」**

<img src="/img/sdfc2024_capture1.png" width="300px" ><img src="/img/sdfc2024_capture2.png" width="300px" >

## アプリ概要

- 公式 LINE で浜松市の観光スポットを推薦
- 公式 LINE 内で bot と会話をする中でユーザの好みを把握してパーソナライズ

## システム概要

### 構成

- LINE の公式 LINE でユーザとの対話を実現
- LINE が提供する API である Messaging API を使用
- 観光スポットの検索は、チームメンバーがこれとは独立した API を開発した
- Web サーバにデプロイはせず、[ngrok](https://ngrok.com/) で一時的に localhost を外部公開

### 開発チームメンバー

自身含め３名

### システム概要図

![システム概要図](/img/system_summary.png)

## 使用言語・ツール

- [FastAPI](https://fastapi.tiangolo.com/ja/)
- [LINE Messaging API](https://developers.line.biz/ja/docs/messaging-api/)
  - [line-bot-sdk-python](https://github.com/line/line-bot-sdk-python)

## 開発の振り返り

### 特に力を入れたところ

- 質問文を何にするのか（どうすればスポットが絞り切れるのか）
  - 回答結果によって質問文を分けることで、ユーザの嗜好に幅広く対応
- 開発環境の構築
  - コミット時にフォーマットとリンティングを行う（[ruff](https://docs.astral.sh/ruff/)）
  - パッケージ管理として [uv](https://github.com/astral-sh/uv) を採用
    - 速い
    - [ruff](https://docs.astral.sh/ruff/)と互換性がある

### 苦戦したところ

- 認証
  - curl でリクエストを送って秘密鍵・公開鍵を生成するのは今回が初めて
- [line-bot-sdk](https://github.com/line/line-bot-sdk-python) の仕様への対応
  - 各メッセージ形式（テキスト、選択式等）で用意されていたが記述することがどれも違うため苦戦。
  - 実現したい表示形式の実現方法を ChatGPT との対話の中で明確化して、検索エンジンで検索して突破した。
