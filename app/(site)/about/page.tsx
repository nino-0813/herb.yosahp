import Link from "next/link";
import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const POINTS = [
  { t: "芯から温める", b: "よもぎなどの薬草の蒸気を下半身から直接あてることで、体の深部までじんわりと温めます。" },
  { t: "めぐりを整える", b: "温熱でめぐりをサポート。冷えやむくみ、女性特有の揺らぎが気になる方の毎日のケアに。" },
  { t: "選べる薬草", b: "リラックス・すっきり・うるおいなど、その日の気分とお悩みに合わせてブレンド。" },
];

export default function About() {
  return (
    <>
      <section className="hero"><Ph label="選べる薬草" /></section>

      <Headline en="about yomogi steam" jp="よもぎ蒸しについて" />
      <div className="container">
        <p className="lede lede--ink">
          よもぎ蒸しは、椅子の下で煮立てたよもぎなどの薬草の蒸気を
          <br />
          体全体に巡らせる、韓国で古くから親しまれてきた温活ケア。
        </p>
        <p className="lede">
          専用のマントを羽織って座るだけで、
          <br />
          じんわりと汗をかきながら体を内側から温めます。
          <br />
          頑張らないセルフケアとして、忙しい現代の方にこそ。
        </p>
        <p className="lede">
          外見を整えるだけでは届かない、内側のエネルギー。
          <br />
          体を温めることは、心を整えることにつながっています。
        </p>
      </div>

      <div className="eyebrow">よもぎ蒸しの魅力</div>
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

      <Headline en="our herbs" jp="取り扱い薬草" mini />
      <div className="grid-3">
        {["よもぎ", "ローズ", "ラベンダー", "シナモン", "ローズマリー", "カモミール"].map((h) => (
          <div className="tile" key={h}><Ph label={h} /></div>
        ))}
      </div>

      <div className="container">
        <p className="lede">よもぎ蒸しが、どんな方に寄り添えるのか。続けてご覧ください。</p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/first-time">初めての方へ</Link>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
