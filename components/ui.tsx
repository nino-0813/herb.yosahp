import Link from "next/link";
import { NAV, SITE } from "@/site.config";

/** 予約リンク。/reserve など内部はLink、http... の外部は別タブで開く */
export function ReserveLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const url = SITE.reserveUrl;
  if (url.startsWith("/")) {
    return <Link className={className} href={url}>{children}</Link>;
  }
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
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

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-band__en">warm your body, bloom your life</div>
      <div className="cta-band__jp">ご予約・お問い合わせはお気軽にどうぞ</div>
      <ReserveLink className="btn btn--solid">{SITE.reserveLabel}</ReserveLink>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">{SITE.brand}</div>
      <nav className="footer__nav">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href}>{n.label}</Link>
        ))}
      </nav>
      <div className="footer__copy">© {new Date().getFullYear()} {SITE.fullName}</div>
    </footer>
  );
}
