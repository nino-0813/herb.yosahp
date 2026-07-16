import Link from "next/link";
import { Ph, Headline, CtaBand, Footer } from "@/components/ui";
import { SITE, STORES } from "@/site.config";

export default function Home() {
  return (
    <>
      <section className="hero-full">
        <img
          src="/hero-top.jpg"
          alt="よもぎ蒸しで、新しい健康習慣を。体を芯から温め、本来のわたしに戻る時間を。"
        />
      </section>

      <div className="container">
        <div className="spacer" />
        <p className="lede lede--ink lede--catch">
          {SITE.catch.jpLines.map((l) => (
            <span key={l}>
              {l}
              <br />
            </span>
          ))}
        </p>
        <div className="spacer-sm" />
        <p className="lede">
          よもぎ蒸しは、すわるだけ。
          <br />
          選べる薬草の蒸気で体を芯から温め、
          <br />
          めぐりを整えるセルフケア。
          <br />
          ゆらいだ心と体が、本来の自分に還る時間を。
        </p>
      </div>

      {/* 私たちの想い */}
      <Headline en="our roots & vision" jp="揺らぎを知るから、寄り添える。" />
      <div className="container">
        <p className="lede">
          このサロンの起点は、私たち自身が経験した「揺らぎ」にあります。
          <br />
          年齢や忙しさの中で立ち止まり、本当の健康と向き合ったこと。
          <br />
          だからこそ、同じように密かに悩むあなたに、深く寄り添えると信じています。
        </p>
        <p className="lede lede--ink">
          3つの小さな火が交わって、この街を芯から温めていく。
        </p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/concept">私たちの想いを見る</Link>
        </div>
      </div>

      {/* こだわり */}
      <div className="eyebrow">{SITE.brand}のこだわり</div>
      <div className="grid-2">
        <div className="tile tile--herbs">
          <img src="/kodawari/herbs.jpg" alt="美しさを最大限に引き出すオリジナルハーブ 全11種類配合" />
        </div>
        <div className="tile">
          <img src="/kodawari/treatment.jpg" alt="よもぎ蒸しの様子" />
        </div>
      </div>
      <div className="container">
        <p className="lede">
          国内外から厳選した薬草を、その日の体調に合わせてブレンド。
          <br />
          顔なじみのあなたが、誰にも気兼ねなく弱音を吐ける完全個室で。
        </p>
      </div>

      {/* メニュー誘導 */}
      <Headline en="menu" jp="メニュー" />
      <div className="container">
        <p className="lede">
          よもぎ蒸し単品から、フェイシャルや足つぼとのセットまで。
          <br />
          初めての方向けの体験コースもご用意しています。
        </p>
        <div className="center" style={{ marginTop: 36 }}>
          <Link className="btn" href="/menu">メニューを見る</Link>
        </div>
      </div>

      {/* 店舗 */}
      <Headline en="salon" jp="店舗一覧" />
      <div className="grid-3">
        {STORES.map((s) => (
          <Link key={s.id} href="/access" className="tile store-tile">
            {s.cover ? <img src={s.cover} alt={s.name} /> : <Ph label={s.name} />}
            <span className="store-tile__name">{s.name}</span>
          </Link>
        ))}
      </div>
      <div className="container">
        <p className="lede">尾道・福山に3店舗。どこに行っても安心できる、いつもの拠り所へ。</p>
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
