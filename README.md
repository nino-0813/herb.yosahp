# ハーブ蒸しサロン HP

尾道・沼隈・福山に4店舗を展開するハーブ蒸しサロンのWebサイト（Next.js / App Router / TypeScript）。

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

## 編集ポイント

- **ブランド名・店舗情報・各ページの文言** … [`site.config.ts`](site.config.ts) に集約
- **予約リンク** … `site.config.ts` の `reserveUrl`
- **写真** … 各ページの `<Ph label="..." />` プレースホルダを実写に差し替え
- **デザイン（色・余白・フォント）** … [`app/globals.css`](app/globals.css) のCSS変数

## ページ構成

トップ ＋ 初めての方へ / ハーブ蒸しについて / コンセプト / メニュー / スタッフ / ブログ / お客様の声 / アクセス（全9ルート）
