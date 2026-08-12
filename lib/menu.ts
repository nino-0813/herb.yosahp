export type MenuItem = { name: string; price: string; old?: string; desc: string; badge?: string };

export const MENU_SECTIONS: { band: string; img: string; reverse?: boolean; items: MenuItem[] }[] = [
  {
    band: "初回限定キャンペーン",
    img: "初回限定",
    items: [
      {
        name: "ハーブ蒸し 45分体験",
        price: "¥4,000",
        old: "¥5,980",
        badge: "初回限定",
        desc: "4店舗合同スタートを記念して、初めてご来店の方だけの特別価格。じっくり45分、体を芯から温めます。おひとり様1回限り。",
      },
    ],
  },
];
