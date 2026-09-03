import type { Metadata } from "next";
import Link from "next/link";
import { Footer, ReserveLink } from "@/components/ui";
import { SITE, STORES } from "@/site.config";
import { POINTS } from "./about/page";
import { MENU_SECTIONS } from "@/lib/menu";

const TITLE = "よもぎ蒸し（ハーブ蒸し） 福山・尾道｜ハーブ蒸しサロン";
const DESC = "福山・尾道に4店舗のよもぎ蒸し（ハーブ蒸し）サロンON:U。初回限定45分体験¥4,000。";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: "/" }, openGraph: { title: TITLE, description: DESC, images: ["/og-image.jpg"] } };

function SectionTitle({ en, children, light = false }: { en: string; children: React.ReactNode; light?: boolean }) {
  return <header className={`aun-title ${light ? "aun-title--light" : ""}`}><span>{en}</span><h2>{children}</h2></header>;
}

export default function Home() {
  const campaign = MENU_SECTIONS[0].items[0];
  return <div className="aun-home">
    <section className="aun-hero">
      <img src="/hero-top.jpg" alt="ハーブ蒸しで自分を整える時間" />
      <div className="aun-hero__shade" /><div className="aun-hero__copy"><small>本格ハーブ蒸しサロン</small><strong>{SITE.brand}</strong><p>{SITE.catch.jpLines[0]}</p></div>
      <img className="aun-hero__mist" src="/reference/smoke.webp" alt="" aria-hidden="true" />
    </section>

    <section className="aun-about aun-section">
      <SectionTitle en="ABOUT US">私たちについて</SectionTitle>
      <div className="aun-about__copy"><h3>身体を温め、心を整え、<br />新しい毎日へ。</h3><p>ハーブ蒸しは、すわるだけ。厳選した薬草の蒸気で体を芯から温め、めぐりを整えるセルフケア。ゆらいだ心と体が、本来の自分に還る時間をお届けします。</p></div>
      <div className="aun-watermark">Warm Your Body. Bloom Your Life.</div>
      <Link href="/concept" className="aun-concept-card"><img src="/kodawari/treatment.jpg" alt="ON:Uのコンセプト" /><span><small>BRAND CONCEPT</small><strong>揺らぎを知るから、寄り添える。</strong><em>詳しく見る →</em></span></Link>
    </section>

    <section className="aun-reasons aun-section"><div className="aun-reasons__panel">
      <SectionTitle en="REASON">{SITE.brand}が選ばれる理由</SectionTitle><p className="aun-reasons__intro">忙しい毎日の中でも、安心して立ち寄れる場所であるために。</p>
      <div className="aun-reasons__grid">
        {POINTS.map((p, i) => <article key={p.t}><span>0{i + 1}</span><img src={p.img} alt={p.t} /><h3>{p.t}</h3><p>{p.b}</p></article>)}
        <article><span>04</span><img src="/stores/cocolu/cocolu-1.jpg" alt="完全個室" /><h3>心ほどける完全個室</h3><p>誰にも気兼ねなく、ゆっくりと自分の心と体に向き合えます。</p></article>
        <article><span>05</span><img src="/staff/watanabe.jpg" alt="寄り添うスタッフ" /><h3>一人ひとりに寄り添う</h3><p>その日の体調やお悩みをうかがい、あなたに合う過ごし方をご提案します。</p></article>
        <article><span>06</span><img src="/kodawari/yomogi-mushi.jpg" alt="ハーブ蒸し" /><h3>気軽に続けられる</h3><p>特別な準備は必要ありません。いつもの場所で、頑張らないセルフケアを。</p></article>
      </div><Link className="aun-more" href="/about">ハーブ蒸しについて →</Link>
    </div></section>

    <section className="aun-charm aun-section"><div className="aun-charm__inner">
      <div className="aun-charm__copy"><span>Inner Care with<br />Herbal Steaming</span><SectionTitle en="CHARM" light>ハーブ蒸しの魅力</SectionTitle><p>11種類のハーブの蒸気を下半身から直接あてることで、体の深部までじんわり。温活・美容・リラックスなど、現代女性のライフケアに寄り添います。</p><ul><li>冷え・温活</li><li>むくみ</li><li>美肌・美髪</li><li>安眠</li><li>リラックス</li><li>めぐり</li></ul></div>
      <div className="aun-charm__collage"><img src="/kodawari/herbs.jpg" alt="11種類のハーブ" /><img src="/kodawari/treatment.jpg" alt="ハーブ蒸しの様子" /><img src="/persona/wish.jpg" alt="整う時間" /></div>
    </div><img className="aun-charm__mist" src="/reference/smoke-brush.webp" alt="" aria-hidden="true" /></section>

    <section className="aun-voices aun-section"><SectionTitle en="VOICE">お客様の声</SectionTitle><div className="aun-voices__grid aun-voices__grid--images">{["t", "n", "k", "s"].map(name => <img key={name} src={`/voices/voice-${name}.png`} width="1080" height="1080" loading="lazy" alt={`よもぎ蒸しを体験されたお客様の声 ${name.toUpperCase()}様`} />)}</div><Link className="aun-more" href="/voice">一覧を見る →</Link></section>

    <section className="aun-menu aun-section"><SectionTitle en="MENU">メニュー</SectionTitle><div className="aun-menu__cards">
      <article><small>HERBAL STEAMING</small><h3>{campaign.name}</h3><strong>{campaign.price}<em>（税込）</em></strong><hr /><p>{campaign.desc}</p><ReserveLink eventLabel="home_menu_campaign">このメニューを予約 →</ReserveLink></article>
    </div><Link className="aun-more" href="/menu">詳しく見る →</Link></section>

    <section className="aun-news aun-section"><SectionTitle en="NEWS">お知らせ</SectionTitle><div className="aun-news__list"><Link href="/herb-steam-11-herbs-fukuyama-onomichi"><time>2026.07.16</time><span>福山市・尾道市でハーブ蒸しをお探しの方へ｜11種類のハーブで心地よく温まる時間</span></Link><Link href="/blog"><time>2026.06.10</time><span>ON:U、3店舗合同でスタートしました</span></Link></div></section>

    <section className="aun-shops aun-section"><SectionTitle en="SHOP">店舗一覧</SectionTitle><div className="aun-shops__list">{STORES.map(s => <details key={s.id}><summary>{s.name}<span>+</span></summary><div><p>{s.address}</p>{s.tel && <p>TEL: {s.tel}</p>}<Link href="/access">店舗詳細を見る →</Link></div></details>)}</div></section>
    <Footer />
  </div>;
}
