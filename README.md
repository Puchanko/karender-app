# カレンダー画像メーカー（karender-app） 🗓️🖼️

指定した年月・予定を入力して、1ヶ月分のカレンダー画像を自動生成・保存できるWebサービスです。  
**予定のない日も含めて、美しいカレンダー画像を生成**し、別タブで表示・保存できます。

## 🌐 公開サイト

👉 [https://yourusername.github.io/calendar-web/](https://yourusername.github.io/calendar-web/)  
※ あなたのGitHub PagesのURLに置き換えてください。

## 📦 機能概要

- タイトルと年月を指定して予定入力フォームを自動生成
- 各日に予定を自由に入力
- 「カレンダー画像を作成」ボタンで別タブにカレンダー画像を表示
- 土日・祝日を自動判別して色分け表示
- 入力画面と画像出力で美しく見やすいUI
- 祝日はJavaScriptに定義された定数で反映済み

## 📁 ファイル構成

calendar-web/
├── index.html # メインのHTML（JavaScriptも含む）
└── README.md # このファイル

> ※ CSSやJavaScriptを分離しても構いませんが、1ファイル構成でも動作します。

## 🚀 公開方法（GitHub Pages）

1. このリポジトリを `main` ブランチで push
2. GitHubの [Settings] → [Pages] を開く
3. 「Branch: `main` / root」に設定して保存
4. 数十秒後に公開URLが表示されます

## 📸 使用ライブラリ

- [html2canvas](https://html2canvas.hertzen.com/)（CDN経由で使用）

## 🛠️ 今後の改善予定（例）

- ダークモード対応
- PDF出力対応
- スマホ用のUX最適化
- 予定テンプレートの保存・読み込み機能

## 📄 ライセンス

MIT License（自由に改変・公開していただいてOKです）

---
