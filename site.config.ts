/**
 * サイト全体の設定・コンテンツはこのファイルでまとめて編集できます。
 * ▼ まず最初に brand を本番のブランド名に差し替えてください。
 */

export const SITE = {
  /** ロゴに表示するブランド名（筆記体ロゴ部分）*/
  brand: "ON:U",
  /** ロゴ上の小さな日本語キャプション */
  brandCaption: "Korean Herbal Steam",
  /** ブラウザタブ等に出る正式名称 */
  fullName: "ON:U｜韓国よもぎ蒸しサロン",
  /** トップのキャッチ */
  catch: {
    en: "Warm Your Body. Bloom Your Life.",
    jpLines: ["身体を温め、心を整え、新しい毎日へ。", "あなたを優しく温める、韓国よもぎ蒸しサロン。"],
  },
  /** 予約導線（共通ボタンのリンク先）。自サイト予約フォームは "/reserve"。
   *  ホットペッパー等の外部URLにしたい場合はそのURLを入れてください。 */
  reserveUrl: "/reserve",
  reserveLabel: "ご予約・お問い合わせ",
  instagramUrl: "#",
  lineUrl: "#",
};

/** グローバルナビ（左サイドバー）の項目 */
export const NAV = [
  { href: "/first-time", label: "初めての方へ" },
  { href: "/about", label: "よもぎ蒸しについて" },
  { href: "/menu", label: "メニュー" },
  { href: "/voice", label: "お客様の声" },
  { href: "/concept", label: "コンセプト" },
  { href: "/staff", label: "スタッフ" },
  { href: "/blog", label: "ブログ" },
  { href: "/access", label: "アクセス" },
];

/** 4店舗の情報（アクセスページ・トップで使用） */
export const STORES = [
  {
    id: "onomichi",
    name: "尾道店",
    address: "広島県尾道市〇〇町0-0-0 〇〇ビル2F",
    access: "JR尾道駅より徒歩0分／駐車場あり",
    hours: "10:00 - 20:00（最終受付 19:00）",
    closed: "不定休",
    tel: "000-000-0000",
    mapQuery: "尾道駅",
  },
  {
    id: "numakuma",
    name: "沼隈店",
    address: "広島県福山市沼隈町〇〇0-0-0",
    access: "〇〇バス停より徒歩0分／駐車場あり",
    hours: "10:00 - 20:00（最終受付 19:00）",
    closed: "不定休",
    tel: "000-000-0000",
    mapQuery: "福山市沼隈町",
  },
  {
    id: "fukuyama-ekimae",
    name: "福山駅前店",
    address: "広島県福山市〇〇町0-0-0 〇〇ビル3F",
    access: "JR福山駅より徒歩0分",
    hours: "10:00 - 20:00（最終受付 19:00）",
    closed: "不定休",
    tel: "000-000-0000",
    mapQuery: "福山駅",
  },
  {
    id: "fukuyama-2",
    name: "福山〇〇店",
    address: "広島県福山市〇〇町0-0-0",
    access: "〇〇より車で5分／駐車場あり",
    hours: "10:00 - 20:00（最終受付 19:00）",
    closed: "不定休",
    tel: "000-000-0000",
    mapQuery: "福山市",
  },
];
