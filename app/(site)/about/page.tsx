import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const POINTS = [
  { t: "芯から温める", b: "薬草の蒸気を下半身から直接あてることで、体の深部までじんわりと温めます。" },
  { t: "めぐりを整える", b: "温熱でめぐりをサポート。冷えやむくみが気になる方の毎日のケアに。" },
  { t: "選べるハーブ", b: "リラックス・すっきり・うるおいなど、その日の気分とお悩みに合わせてブレンド。" },
];

export default function About() {
  return (
    <>
      <section className="hero"><Ph label="選べるハーブ" /></section>

      <Headline en="about herb steam" jp="ハーブ蒸しについて" />
      <div className="container">
        <p className="lede lede--ink">
          ハーブ蒸しは、椅子の下で煮立てた薬草の蒸気を
          <br />
          体全体に巡らせる、古くから伝わる温活ケア。
        </p>
        <p className="lede">
          専用のマントを羽織って座るだけで、
          <br />
          じんわりと汗をかきながら体を内側から温めます。
          <br />
          頑張らないセルフケアとして、忙しい現代の方にこそ。
        </p>
      </div>

      <div className="eyebrow">ハーブ蒸しの魅力</div>
      <div className="container">
        {POINTS.map((p, i) => (
          <div className="feature" key={p.t} style={{ marginBottom: 56 }}>
            {i % 2 === 0 ? (
              <>
                <div className="feature__img"><Ph label={p.t} /></div>
                <div>
                  <h3 className="feature__title">{p.t}</h3>
                  <p className="feature__body">{p.b}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="feature__title">{p.t}</h3>
                  <p className="feature__body">{p.b}</p>
                </div>
                <div className="feature__img"><Ph label={p.t} /></div>
              </>
            )}
          </div>
        ))}
      </div>

      <Headline en="our herbs" jp="取り扱いハーブ" mini />
      <div className="grid-3">
        {["よもぎ", "ローズ", "ラベンダー", "シナモン", "ローズマリー", "カモミール"].map((h) => (
          <div className="tile" key={h}><Ph label={h} /></div>
        ))}
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
