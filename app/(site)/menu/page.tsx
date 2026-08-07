import { Headline, CtaBand, Footer, ReserveLink } from "@/components/ui";

type Item = { name: string; price: string; old?: string; desc: string; badge?: string };

export const MENU_SECTIONS: { band: string; img: string; reverse?: boolean; items: Item[] }[] = [
  {
    band: "初回限定キャンペーン",
    img: "初回限定",
    items: [
      {
        name: "よもぎ蒸し 45分体験",
        price: "¥4,000",
        old: "¥5,980",
        badge: "初回限定",
        desc: "4店舗合同スタートを記念して、初めてご来店の方だけの特別価格。じっくり45分、体を芯から温めます。おひとり様1回限り。",
      },
    ],
  },
];

export default function Menu() {
  return (
    <>
      <Headline en="menu" jp="メニュー" />
      <div className="container">
        <p className="lede">
          表示はすべて税込価格です。
          <br />
          メニュー内容・料金は店舗により異なる場合があります。
        </p>
      </div>

      {MENU_SECTIONS.map((sec) => (
        <section key={sec.band}>
          <div className="menu-band"><h3>{sec.band}</h3></div>
          <div className="menu-row menu-row--single">
            <div>
              {sec.items.map((it) => (
                <div className={`menu-item ${it.badge ? "menu-item--campaign" : ""}`} key={it.name}>
                  {it.badge && <span className="menu-item__badge">{it.badge}</span>}
                  <div className="menu-item__name">{it.name}</div>
                  <div className="menu-item__price">
                    {it.old && <del>{it.old}</del>}
                    {it.price}
                  </div>
                  <div className="menu-item__desc">{it.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <div className="center" style={{ marginTop: 26 }}>
        <ReserveLink className="btn btn--solid">予約する</ReserveLink>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
