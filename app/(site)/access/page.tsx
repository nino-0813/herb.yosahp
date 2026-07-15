import { Headline, CtaBand, Footer } from "@/components/ui";
import { STORES } from "@/site.config";

export default function Access() {
  return (
    <>
      <Headline en="access" jp="店舗一覧・アクセス" />
      <div className="container">
        <p className="lede">尾道・福山に3店舗。どこに行っても安心できる、地域の拠り所として。お近くのサロンをご利用ください。</p>
      </div>

      <div className="spacer-sm" />
      {STORES.map((s) => (
        <section className="store" key={s.id} id={s.id}>
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
              {s.tel && <div className="store__row"><dt>電話</dt><dd>{s.tel}</dd></div>}
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
