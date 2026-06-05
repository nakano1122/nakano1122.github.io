---
id: museum-recommend
title_ja: "ミュージアムにおける展示物推薦"
title_en: "Museum Exhibit Recommendation"
summary_ja: "再訪促進のための意外な共通点を持つ展示物の発見手法"
summary_en: "Methods for discovering exhibits with surprising commonalities to encourage revisits"
image_ja: "/images/research/museum-recommend_ja.webp"
image_en: "/images/research/museum-recommend_en.png"
status: "completed"
startDate: 2025-04-01
endDate: 2026-03-31
---

ミュージアムの再訪を促進するため、鑑賞した展示物と意外な共通点を持つ未鑑賞展示物を発見する手法を研究しています。

「意外な共通点」を「似ていないもの同士の共通点」と定義し、展示物とタグをノードとするグラフ上で意外度を測定します。
グラフ上で展示物同士を繋ぐ直接の経路を切断する前後の、相互の到達確率の分布の差から意外度を計算します。

実験では、被験者が展示物の画像とメタデータを見て意外度を答えるタスクを行い、任意の展示物と確かに意外な共通点を持つ展示物を発見できることが明らかになりました。

<!-- lang:en -->

We are researching methods to discover unviewed exhibits that share surprising commonalities with previously viewed exhibits to encourage museum revisits.

We define "surprising commonalities" as shared properties between dissimilar exhibits and measure the degree of surprise on a graph with exhibits and tags as nodes. The surprise score is calculated by measuring the difference in mutual reachability probability distributions before and after cutting direct paths between exhibits.

Evaluation using actual viewing logs confirmed that the method can recommend content that encourages revisits.
