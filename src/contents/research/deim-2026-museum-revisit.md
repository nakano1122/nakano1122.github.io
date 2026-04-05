---
startDate: 2026-03-01
endDate: 2026-03-01
title_ja: "ミュージアム再訪促進のための鑑賞した展示物と意外な共通点を持つ展示物の発見"
title_en: ""
authors_ja: "中野暁登、莊司慶行、山本岳洋、山本祐輔、大島裕明、相原健郎、神門典子"
authors_en: "Akito Nakano, Yoshiyuki Shoji, Takehiro Yamamoto, Yusuke Yamamoto, Hiroaki Ohshima, Kenro Aihara, Noriko Kando"
conference: "DEIM 2026"
award_ja: ""
links:
  - "https://pub.confit.atlas.jp/ja/event/deim2026/presentation/2G-05"
---

DB 分野の国内学会で発表を行いました。

この研究では、ミュージアムの再訪を促進するための、鑑賞した展示物と意外な共通点を持つ未鑑賞展示物を発見する手法を提案しています。
意外な共通点は、「似ていないもの同士の共通点」を意外な共通点であると定義し、展示物と展示物につくタグをノードとするグラフ上で、「2 展示物+1 共通タグ」の意外度を測ります。
意外度の計算では、グラフ上で展示物同士を繋ぐ直接の経路（2 本のエッジ）を切断する前後の、相互の到達確率の分布の差を求めます。
評価の結果、ある展示物と意外な共通点を持つ展示物を発見可能で、実際の鑑賞ログを使った場合に、再訪につながる内容を推薦可能であることを明らかにしました。

2 年連続の参加ということで、ある程度、ノウハウが分かった状態で挑みました。
前年と比べてスムーズに発表することができましたが、研究内容を全く知らない人に対して説明する難しさを改めて感じました。
前年発表した論文は国際会議に通すことができたので、本論文も国際学会に通したいと考えています。

<!-- lang:en -->

Presented at DEIM 2026, a domestic conference in the DB field.

This research proposes a method for discovering unviewed exhibits that share surprising commonalities with previously viewed exhibits, aimed at promoting museum revisits.
We define surprising commonalities as shared properties between dissimilar exhibits, and measure the degree of surprise on a graph with exhibits and tags as nodes.
The surprise score is calculated by measuring the difference in mutual reachability probability distributions before and after cutting direct paths between two exhibits on the graph.
Our evaluation showed that the method can discover exhibits with surprising commonalities and recommend content that encourages revisits using actual viewing logs.

This was my second consecutive year attending, so I had some experience and know-how going in.
I was able to present more smoothly compared to the previous year, but I again felt the difficulty of explaining research to people unfamiliar with the topic.
Since the paper from the previous year was accepted at an international conference, I aim to submit this paper to an international venue as well.
