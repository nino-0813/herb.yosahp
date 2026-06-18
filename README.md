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

トップ ＋ 初めての方へ / ハーブ蒸しについて / コンセプト / メニュー / スタッフ / ブログ / お客様の声 / アクセス

## 予約・管理画面（Supabase）

- **公開予約フォーム** … `/reserve`（4店舗から選んで仮予約 → Supabaseに保存）
- **管理画面** … `/admin`（ログイン後、予約を店舗・ステータスで絞り込み、対応状況の変更・削除・手動追加）

### セットアップ

1. Supabase ダッシュボード > SQL Editor で [`supabase/schema.sql`](supabase/schema.sql) を実行（テーブル・RLS・店舗マスタを作成）
2. Authentication > Users > Add user で管理者アカウントを作成（Auto Confirm User を ON）
3. `.env.example` を `.env.local` にコピーし、Supabaseの値を設定
4. **Vercel** の Project Settings > Environment Variables に
   `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を登録（登録後に再デプロイ）

### データ構成（Supabase）

- `herb_stores` … 店舗マスタ（4店舗）
- `herb_reservations` … 予約データ（RLS: 匿名は作成のみ可、閲覧/更新/削除はログイン管理者のみ）
