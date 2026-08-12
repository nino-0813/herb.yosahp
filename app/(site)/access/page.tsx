import type { Metadata } from "next";
import { Headline, CtaBand, Footer } from "@/components/ui";
import TelLink from "@/components/TelLink";
import { SITE, STORES } from "@/site.config";

const TITLE = "店舗一覧・アクセス｜尾道・福山4店舗";
const DESC = "尾道・福山の4店舗（cocolu hairsalon / Cherie CoCo / YOSA PARK Larimar / Larimar）の住所・電話・地図。韓国よもぎ蒸し（ハーブ蒸し）サロンON:U。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/access" },
  openGraph: { title: TITLE, description: DESC },
};

/** "〒729-0104 広島県福山市松永町5丁目11-21" のような文字列から郵便番号・番地部分を分離する */
function splitAddress(address: string) {
  const postalMatch = address.match(/(\d{3}-?\d{4})/);
  const postalCode = postalMatch ? postalMatch[1] : undefined;
  const streetAddress = address.replace(/〒?\d{3}-?\d{4}/, "").trim().replace(/^広島県/, "").trim();
  return { postalCode, streetAddress };
}

export default function Access() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": STORES.map((s) => {
      const { postalCode, streetAddress } = splitAddress(s.address);
      return {
        "@type": "HealthAndBeautyBusiness",
        name: s.name,
        url: `${SITE.siteUrl}/access#${s.id}`,
        image: s.cover ? `${SITE.siteUrl}${s.cover}` : undefined,
        telephone: s.tel || undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress,
          addressRegion: "広島県",
          postalCode,
          addressCountry: "JP",
        },
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Headline en="access" jp="店舗一覧・アクセス" />
      <div className="container">
        <p className="lede">尾道・福山に4店舗。どこに行っても安心できる、地域の拠り所として。お近くのサロンをご利用ください。</p>
      </div>

      <div className="spacer-sm" />
      {STORES.map((s) => (
        <section className="store" key={s.id} id={s.id}>
          {s.photos && s.photos.length > 0 && (
            <div className="store__gallery">
              {s.photos.map((src, i) => (
                <div className="store__slide" key={src}>
                  <img src={src} alt={`${s.name}の店内${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          )}
          <iframe
            className="store__map"
            title={`${s.name}の地図`}
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&output=embed`}
          />
          <div className="store__body">
            <h2 className="store__name">{s.name}</h2>
            <dl>
              <div className="store__row"><dt>オーナー</dt><dd>{s.owner}</dd></div>
              <div className="store__row"><dt>住所</dt><dd>{s.address}</dd></div>
              {s.access && <div className="store__row"><dt>アクセス</dt><dd>{s.access}</dd></div>}
              {s.hours && <div className="store__row"><dt>営業時間</dt><dd>{s.hours}</dd></div>}
              {s.closed && <div className="store__row"><dt>定休日</dt><dd>{s.closed}</dd></div>}
              {s.tel && (
                <div className="store__row">
                  <dt>電話</dt>
                  <dd><TelLink className="store__tel" tel={s.tel} storeId={s.id} /></dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      ))}

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
