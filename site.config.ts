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

/** 3店舗の情報（アクセスページ・トップで使用）
 *  ※ 営業時間・定休日・電話は未確定のため空欄。分かり次第そのまま追記すれば表示されます。 */
export const STORES = [
  {
    id: "cocolu",
    name: "cocolu hairsalon",
    owner: "渡辺 宏恵",
    address: "広島県尾道市栗原町8251-2",
    access: "",
    hours: "",
    closed: "",
    tel: "",
    mapQuery: "広島県尾道市栗原町8251-2",
    photos: [
      "/stores/cocolu/cocolu-1.jpg",
      "/stores/cocolu/cocolu-2.jpg",
      "/stores/cocolu/cocolu-3.jpg",
      "/stores/cocolu/cocolu-4.jpg",
      "/stores/cocolu/cocolu-5.jpg",
    ],
  },
  {
    id: "cherie-coco",
    name: "Cherie CoCo",
    owner: "物部 沙織",
    address: "〒729-0104 広島県福山市松永町5丁目11-21",
    access: "",
    hours: "",
    closed: "",
    tel: "",
    mapQuery: "広島県福山市松永町5丁目11-21",
    photos: [
      "/stores/cherie/cherie-1.jpg",
      "/stores/cherie/cherie-2.jpg",
      "/stores/cherie/cherie-3.jpg",
      "/stores/cherie/cherie-4.jpg",
      "/stores/cherie/cherie-5.jpg",
      "/stores/cherie/cherie-6.jpg",
    ],
  },
  {
    id: "larimar",
    name: "YOSA PARK Larimar",
    owner: "花岡 樹里",
    address: "〒721-0955 広島県福山市新涯町5丁目36-3 村上ビル205",
    access: "",
    hours: "",
    closed: "",
    tel: "",
    mapQuery: "広島県福山市新涯町5丁目36-3",
    photos: [
      "/stores/larimar/larimar-1.jpg",
      "/stores/larimar/larimar-2.jpg",
      "/stores/larimar/larimar-3.jpg",
      "/stores/larimar/larimar-4.jpg",
      "/stores/larimar/larimar-5.jpg",
      "/stores/larimar/larimar-6.jpg",
    ],
  },
];
