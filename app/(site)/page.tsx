import type { Metadata } from "next";
import Link from "next/link";
import { Footer, ReserveLink } from "@/components/ui";
import { SITE, STORES } from "@/site.config";
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
      <div className="aun-hero__slides" aria-label="ON:Uのハーブ蒸しとサロンの風景">
        <img src="/hero/slides/01-steam-treatment.jpg" alt="ハーブ蒸しを体験する女性" />
        <img src="/hero/slides/02-herbal-steam.png" alt="ハーブの蒸気が立ち上るイメージ" />
        <img src="/hero/slides/03-tomonoura.png" alt="夕暮れの鞆の浦と常夜燈" />
        <img src="/stores/larimar/larimar-2.jpg" alt="YOSA PARK Larimar 新涯店の店内" />
        <img src="/stores/cocolu/cocolu-3.jpg" alt="cocolu hairsalonの店内" />
        <img src="/stores/cherie/cherie-5.jpg" alt="Cherie CoCoの店内" />
        <img src="/stores/larimar-numakuma/larimar-numakuma-3.jpg" alt="Larimar 沼隈店の店内" />
      </div>
      <div className="aun-hero__shade" /><div className="aun-hero__copy"><small>本格ハーブ蒸しサロン</small><strong>{SITE.brand}</strong><p>{SITE.catch.jpLines[0]}</p></div>
      <img className="aun-hero__mist" src="/reference/smoke.webp" alt="" aria-hidden="true" />
    </section>

    <section className="aun-about aun-section">
      <SectionTitle en="ABOUT US">私たちについて</SectionTitle>
      <div className="aun-about__copy"><h3>身体を温め、心を整え、<br />新しい毎日へ。</h3><p>ハーブ蒸しは、すわるだけ。厳選した薬草の蒸気で体を芯から温め、めぐりを整えるセルフケア。ゆらいだ心と体が、本来の自分に還る時間をお届けします。</p></div>
      <div className="aun-wordmark" aria-hidden="true"><div>{Array.from({ length: 8 }, (_, i) => <span key={i}>ON:U</span>)}</div></div>
    </section>

    <section className="aun-recommend aun-section">
      <div className="aun-recommend__panel">
        <img src="/recommend/for-first-time.png" width="1615" height="974" loading="lazy" alt="乾燥、冷え、首や肩のこり、気分の浮き沈みなどが気になる方へ" />
        <div className="aun-recommend__action">
          <p>ハーブ蒸しが初めての方も、どうぞご安心ください。</p>
          <Link href="/first-time">初めての方へ <span>→</span></Link>
        </div>
      </div>
    </section>

    <section className="aun-charm aun-section"><div className="aun-charm__inner">
      <div className="aun-charm__copy"><span>Inner Care with<br />Herbal Steaming</span><SectionTitle en="CHARM">ハーブ蒸しの魅力</SectionTitle><p>基本10種類のファインハーブの蒸気を下半身から直接あてることで、体の深部までじんわり。温活・美容・リラックスなど、現代女性のライフケアに寄り添います。</p><ul><li>冷え・温活</li><li>むくみ</li><li>美肌・美髪</li><li>安眠</li><li>リラックス</li><li>めぐり</li></ul></div>
      <div className="aun-charm__visual"><img src="/kodawari/yomogi-mushi.jpg" alt="ハーブ蒸しで期待できる冷え、むくみ、美肌、ストレスなどへのケア" /></div>
    </div><img className="aun-charm__mist" src="/reference/smoke-brush.webp" alt="" aria-hidden="true" /></section>

    <section className="aun-voices aun-section"><SectionTitle en="VOICE">お客様の声</SectionTitle><div className="aun-voices__grid aun-voices__grid--images">{["t", "n", "k", "s"].map(name => <img key={name} src={`/voices/voice-${name}.png`} width="1080" height="1080" loading="lazy" alt={`よもぎ蒸しを体験されたお客様の声 ${name.toUpperCase()}様`} />)}</div><Link className="aun-more" href="/voice">一覧を見る →</Link></section>

    <section className="aun-menu aun-section"><SectionTitle en="MENU">メニュー</SectionTitle><div className="aun-menu__cards">
      <article><small>HERBAL STEAMING</small><h3>{campaign.name}</h3><strong>{campaign.price}<em>（税込）</em></strong><hr /><p>{campaign.desc}</p><ReserveLink eventLabel="home_menu_campaign">このメニューを予約 →</ReserveLink></article>
    </div><Link className="aun-more" href="/menu">詳しく見る →</Link></section>

    <section className="aun-news aun-section"><SectionTitle en="NEWS">お知らせ</SectionTitle><div className="aun-news__list"><Link href="/herb-steam-11-herbs-fukuyama-onomichi"><time>2026.07.16</time><span>福山市・尾道市でハーブ蒸しをお探しの方へ｜11種類のハーブで心地よく温まる時間</span></Link><Link href="/blog"><time>2026.06.10</time><span>ON:U、4店舗合同でスタートしました</span></Link></div></section>

    <section className="aun-shops aun-section"><SectionTitle en="SHOP">店舗一覧</SectionTitle><div className="aun-shops__list">{STORES.map(s => <details key={s.id}><summary><span className="aun-shops__summary"><b>{s.name}</b><small>{s.address}</small></span><span>+</span></summary><div><p>オーナー：{s.owner}</p>{s.tel && <p>TEL: {s.tel}</p>}<Link href={`/access#${s.id}`}>この店舗の詳細を見る →</Link></div></details>)}</div></section>
    <Footer />
  </div>;
}
