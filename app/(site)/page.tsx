import type { Metadata } from "next";
import Link from "next/link";
import { Ph, Headline, CtaBand, Footer, TrialBanner } from "@/components/ui";
import { SITE, STORES } from "@/site.config";
import MobileLanding from "@/components/MobileLanding";

const TITLE = "よもぎ蒸し（ハーブ蒸し） 福山・尾道｜ハーブ蒸しサロン";
const DESC = "福山・尾道に4店舗のよもぎ蒸し（ハーブ蒸し）サロンON:U。初回限定45分体験¥4,000。冷え・むくみ・自律神経の乱れに、体を芯から温めるセルフケアを。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, images: ["/og-image.jpg"] },
};

export default function Home() {
  return (
    <>
      {/* スマホ幅（880px以下）は全ページを集約した1枚LPを表示（globals.css の .mobile-only 参照） */}
      <MobileLanding />

      {/* デスクトップ幅は従来どおりトップページ＋各ページ導線 */}
      <div className="desktop-only">
      <section className="hero-full">
        <img
          src="/hero-top.jpg"
          alt="私を整える、わたしの時間。ハーブ蒸しで、新しい健康習慣を。冷え改善・温活、美肌・美髪デトックス、リラックス・安眠サポート、免疫力アップ。今日の自分を労わる30分から、未来の私をもっと輝かせる。"
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
          ハーブ蒸しは、すわるだけ。
          <br />
          厳選した薬草の蒸気で体を芯から温め、
          <br />
          めぐりを整えるセルフケア。
          <br />
          ゆらいだ心と体が、本来の自分に還る時間を。
        </p>
      </div>

      <TrialBanner />

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
          4つの小さな火が交わって、この街を芯から温めていく。
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
          <img src="/kodawari/treatment.jpg" alt="ハーブ蒸しの様子" />
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
          いまは初回限定の45分体験のみのシンプルなメニュー。
          <br />
          初めての方が安心して試せる特別価格でご用意しています。
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
        <p className="lede">尾道・福山に4店舗。どこに行っても安心できる、いつもの拠り所へ。</p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/access">アクセス・店舗詳細</Link>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
      </div>
    </>
  );
}
