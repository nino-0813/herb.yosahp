import type { Metadata } from "next";
import { Headline, CtaBand, Footer, ReserveLink } from "@/components/ui";
import { MENU_SECTIONS } from "@/lib/menu";

const TITLE = "メニュー・料金｜初回限定¥4,000";
const DESC = "よもぎ蒸し（ハーブ蒸し）の料金案内。初回限定45分体験は通常¥5,980→¥4,000。福山・尾道のハーブ蒸しサロンON:U、4店舗共通メニュー。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/menu" },
  openGraph: { title: TITLE, description: DESC, images: ["/og-image.jpg"] },
};

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

      {MENU_SECTIONS.map((sec) => (
        <section key={sec.band}>
          <div className="menu-band"><h3>{sec.band}</h3></div>
          <div className="menu-row menu-row--single">
            <div>
              {sec.items.map((it) => (
                <div className={`menu-item ${it.badge ? "menu-item--campaign" : ""}`} key={it.name}>
                  {it.badge && <span className="menu-item__badge">{it.badge}</span>}
                  <div className="menu-item__name">{it.name}</div>
                  <div className="menu-item__price">
                    {it.old && <del>{it.old}</del>}
                    {it.price}
                  </div>
                  <div className="menu-item__desc">{it.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <div className="center" style={{ marginTop: 26 }}>
        <ReserveLink className="btn btn--solid" eventLabel="menu_page">予約する</ReserveLink>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
