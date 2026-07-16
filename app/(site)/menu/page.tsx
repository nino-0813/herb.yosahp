import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

type Item = { name: string; price: string; old?: string; desc: string };

const SECTIONS: { band: string; img: string; reverse?: boolean; items: Item[] }[] = [
  {
    band: "よもぎ蒸し 単品 (30min)",
    img: "よもぎ蒸し",
    items: [
      { name: "よもぎ蒸し", price: "¥4,000", desc: "選べる薬草で体を芯から温めるベーシックコース。初めての方にも。" },
      { name: "よもぎ蒸し＋追加薬草", price: "¥4,500", desc: "お悩みに合わせて薬草を追加。じっくり温まりたい方におすすめ。" },
    ],
  },
  {
    band: "セットメニュー 初回体験",
    img: "セットメニュー",
    reverse: true,
    items: [
      { name: "よもぎ蒸し(30min)×足つぼ(20min)", price: "¥6,000", old: "¥7,000", desc: "巡りスッキリコース。むくみが気になる方におすすめ。" },
      { name: "よもぎ蒸し(30min)×うる艶パック", price: "¥6,500", old: "¥7,500", desc: "温めた後に肌ケアできるコース。乾燥が気になる方に。" },
    ],
  },
  {
    band: "フェイシャル / オプション",
    img: "フェイシャル",
    items: [
      { name: "フェイシャルエステ (40min)", price: "¥5,000", desc: "よもぎ蒸しで温まった肌に、うるおいを届けるフェイシャル。外見と内面を、ひとつに。" },
      { name: "よもぎパック", price: "¥1,000", desc: "単品メニューに追加できる人気オプション。" },
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

      {SECTIONS.map((sec) => (
        <section key={sec.band}>
          <div className="menu-band"><h3>{sec.band}</h3></div>
          <div className={`menu-row ${sec.reverse ? "reverse" : ""}`}>
            <div>
              {sec.items.map((it) => (
                <div className="menu-item" key={it.name}>
                  <div className="menu-item__name">{it.name}</div>
                  <div className="menu-item__price">
                    {it.old && <del>{it.old}</del>}
                    {it.price}
                  </div>
                  <div className="menu-item__desc">{it.desc}</div>
                </div>
              ))}
            </div>
            <div className="menu-row__img"><Ph label={sec.img} /></div>
          </div>
        </section>
      ))}

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
