"use client";

import Link from "next/link";
import { NAV, SITE } from "@/site.config";
import { gaEvent } from "@/lib/gtag";

/** 予約リンク。/reserve など内部はLink、http... の外部は別タブで開く
 *  eventLabel を渡すと、どのCTA経由でクリックされたかをGA4に送信する */
export function ReserveLink({
  className,
  children,
  eventLabel = "unknown",
}: {
  className?: string;
  children: React.ReactNode;
  eventLabel?: string;
}) {
  const url = SITE.reserveUrl;
  const onClick = () => gaEvent("click_reserve_cta", { label: eventLabel });
  if (url.startsWith("/")) {
    return <Link className={className} href={url} onClick={onClick}>{children}</Link>;
  }
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {children}
    </a>
  );
}

/** 画像差し替え前のプレースホルダ。label に「写真イメージ」を入れておく */
export function Ph({ label = "Photo" }: { label?: string }) {
  return <div className="ph">{label}</div>;
}

/** EN + JP の見出し */
export function Headline({ en, jp, mini = false }: { en: string; jp?: string; mini?: boolean }) {
  return (
    <div className={`headline ${mini ? "headline--mini" : ""}`}>
      <div className="headline__en">{en}</div>
      {jp && <div className="headline__jp">{jp}</div>}
    </div>
  );
}

/** 初回限定キャンペーンの告知バナー。トップ・初めての方へページなどで使用 */
export function TrialBanner() {
  return (
    <div className="trial-banner">
      <span className="trial-banner__badge">初回限定</span>
      <p className="trial-banner__copy">
        4店舗合同スタートを記念して、はじめての方は
        <br />
        ハーブ蒸し45分体験が特別価格でお試しいただけます。
      </p>
      <p className="trial-banner__price">
        <del>¥5,980</del>
        <strong>¥4,000</strong>
        <span className="trial-banner__unit">（税込・45分）</span>
      </p>
      <ReserveLink className="trial-banner__btn" eventLabel="trial_banner">この価格で予約する</ReserveLink>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-band__en">warm your body, bloom your life</div>
      <div className="cta-band__jp">ご予約・お問い合わせはお気軽にどうぞ</div>
      <ReserveLink className="btn btn--solid" eventLabel="cta_band">{SITE.reserveLabel}</ReserveLink>
    </section>
  );
}

export function Footer() {
  const guides = [
    { en: "FLOW", jp: "施術の流れ", href: "/first-time#flow", image: "/kodawari/treatment.jpg" },
    { en: "PRICE", jp: "料金・メニュー", href: "/menu", image: "/hero/slides/01-steam-treatment.jpg" },
    { en: "Q&A", jp: "よくある質問", href: "/first-time#faq", image: "/kodawari/herbs.jpg" },
    { en: "SHOP", jp: "お近くの店舗を探す", href: "/access", image: "/stores/cocolu/cocolu-1.jpg" },
  ];
  return (
    <>
      <nav className="footer-guides" aria-label="サイトのご案内">
        {guides.map((guide) => (
          <Link className="footer-guide" href={guide.href} key={guide.en}>
            <img src={guide.image} alt="" loading="lazy" aria-hidden="true" />
            <span className="footer-guide__shade" />
            <span className="footer-guide__content">
              <strong>{guide.en}</strong>
              <span>{guide.jp}</span>
              <small>VIEW MORE <b>→</b></small>
            </span>
          </Link>
        ))}
      </nav>
      <footer className="footer">
        <div className="footer__logo">{SITE.brand}</div>
        <nav className="footer__nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <div className="footer__copy">© {new Date().getFullYear()} {SITE.fullName}</div>
      </footer>
    </>
  );
}
