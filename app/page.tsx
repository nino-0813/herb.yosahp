import Link from "next/link";
import { Ph, Headline, CtaBand, Footer } from "@/components/ui";
import { SITE, STORES } from "@/site.config";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Ph label={`${SITE.brand} — main visual`} />
      </section>

      <div className="container">
        <div className="spacer" />
        <p className="lede lede--ink" style={{ fontSize: 16, lineHeight: 2.6 }}>
          {SITE.catch.jpLines.map((l) => (
            <span key={l}>
              {l}
              <br />
            </span>
          ))}
        </p>
        <div className="spacer-sm" />
        <p className="lede">
          ハーブ蒸しは、すわるだけ。
          <br />
          選べる薬草の蒸気で体を芯から温め、
          <br />
          めぐりを整えるセルフケア。
          <br />
          あなただけの「chill time」を。
        </p>
      </div>

      {/* こだわり */}
      <div className="eyebrow">{SITE.brand}のこだわり</div>
      <div className="grid-2">
        <div className="tile"><Ph label="厳選ハーブ" /></div>
        <div className="tile"><Ph label="完全個室" /></div>
      </div>
      <div className="container">
        <p className="lede">
          国内外から厳選した薬草を、その日の体調に合わせてブレンド。
          <br />
          プライベートを守る完全個室で、誰にも気兼ねなく。
        </p>
      </div>

      {/* メニュー誘導 */}
      <Headline en="menu" jp="メニュー" />
      <div className="container">
        <p className="lede">
          ハーブ蒸し単品から、フェイシャルや足つぼとのセットまで。
          <br />
          初めての方向けの体験コースもご用意しています。
        </p>
        <div className="center" style={{ marginTop: 36 }}>
          <Link className="btn" href="/menu">メニューを見る</Link>
        </div>
      </div>

      {/* 店舗 */}
      <Headline en="salon" jp="店舗一覧" />
      <div className="grid-2" style={{ maxWidth: 760 }}>
        {STORES.map((s) => (
          <Link key={s.id} href="/access" className="tile" style={{ position: "relative" }}>
            <Ph label={s.name} />
          </Link>
        ))}
      </div>
      <div className="container">
        <p className="lede">尾道・沼隈・福山に4店舗。お近くのサロンへどうぞ。</p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/access">アクセス・店舗詳細</Link>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
