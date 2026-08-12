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
  fullName: "ON:U｜韓国よもぎ蒸し（ハーブ蒸し）サロン",
  /** 本番サイトのURL（末尾スラッシュなし）。サイトマップ・構造化データ・OGP画像解決に使用 */
  siteUrl: "https://www.yomogimushi-onu.jp",
  /** トップのキャッチ */
  catch: {
    en: "Warm Your Body. Bloom Your Life.",
    jpLines: ["身体を温め、心を整え、新しい毎日へ。", "あなたを優しく温める、韓国ハーブ蒸しサロン。"],
  },
  /** 予約導線（共通ボタンのリンク先）。自サイト予約フォームは "/reserve"。
   *  ホットペッパー等の外部URLにしたい場合はそのURLを入れてください。 */
  reserveUrl: "/reserve",
  reserveLabel: "ご予約・お問い合わせ",
  instagramUrl: "#",
  lineUrl: "#",
  /** Google Analytics 4 測定ID（GA4管理画面 > データストリーム で確認できます） */
  gaId: "G-L86S9D6KPD",
};

/** グローバルナビ（左サイドバー）の項目
 *  id を持つ項目は、スマホ幅では「/」内の同名セクションへスムーズスクロールする
 *  （スマホは全ページを1枚のLPに集約しているため）。id がない項目（ブログ）は通常どおり別ページへ遷移する。 */
export const NAV = [
  { href: "/first-time", id: "first-time", label: "初めての方へ" },
  { href: "/about", id: "about", label: "ハーブ蒸しについて" },
  { href: "/menu", id: "menu", label: "メニュー" },
  { href: "/voice", id: "voice", label: "お客様の声" },
  { href: "/concept", id: "concept", label: "コンセプト" },
  { href: "/staff", id: "staff", label: "オーナー" },
  { href: "/blog", label: "ブログ" },
  { href: "/access", id: "access", label: "アクセス" },
];

/** 4店舗の情報（アクセスページ・トップで使用）
 *  ※ 営業時間・定休日は未確定のため空欄。分かり次第そのまま追記すれば表示されます。 */
export const STORES = [
  {
    id: "cocolu",
    name: "cocolu hairsalon",
    owner: "渡辺 宏恵",
    address: "広島県尾道市栗原町8251-2",
    access: "",
    hours: "",
    closed: "",
    tel: "0848-88-9390",
    mapQuery: "広島県尾道市栗原町8251-2",
    cover: "/stores/cocolu/cocolu-1.jpg",
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
    tel: "084-933-8432",
    mapQuery: "広島県福山市松永町5丁目11-21",
    cover: "/stores/cherie/cherie-1.jpg",
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
    name: "YOSA PARK Larimar（新涯店）",
    owner: "花岡 樹里",
    address: "〒721-0955 広島県福山市新涯町5丁目36-3 村上ビル205",
    access: "",
    hours: "",
    closed: "",
    tel: "084-994-0930",
    mapQuery: "広島県福山市新涯町5丁目36-3",
    cover: "/stores/larimar/larimar-2.jpg",
    photos: [
      "/stores/larimar/larimar-1.jpg",
      "/stores/larimar/larimar-2.jpg",
      "/stores/larimar/larimar-3.jpg",
      "/stores/larimar/larimar-4.jpg",
      "/stores/larimar/larimar-5.jpg",
      "/stores/larimar/larimar-6.jpg",
    ],
  },
  {
    id: "larimar-numakuma",
    name: "Larimar（沼隈店）",
    owner: "高戸 真理",
    address: "〒720-0311 広島県福山市沼隈町草深2156-7",
    access: "",
    hours: "",
    closed: "",
    tel: "080-1637-3923",
    mapQuery: "広島県福山市沼隈町草深2156-7",
    cover: "/stores/larimar-numakuma/larimar-numakuma-1.jpg",
    photos: [
      "/stores/larimar-numakuma/larimar-numakuma-1.jpg",
      "/stores/larimar-numakuma/larimar-numakuma-2.jpg",
      "/stores/larimar-numakuma/larimar-numakuma-3.jpg",
    ],
  },
];
