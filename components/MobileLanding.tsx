import Link from "next/link";
import { Ph, Headline, CtaBand, Footer, ReserveLink, TrialBanner } from "./ui";
import { SITE, STORES, NAV } from "@/site.config";
import { POINTS, HERB_TYPES, HERBS } from "@/app/(site)/about/page";
import { STEPS, WISH, WORRY, FAQ } from "@/app/(site)/first-time/page";
import { VOICES } from "@/app/(site)/voice/page";
import { OWNERS } from "@/app/(site)/staff/page";
import { MENU_SECTIONS } from "@/app/(site)/menu/page";

/**
 * スマホ幅（880px以下）専用の1枚LP。
 * デスクトップ版の複数ページ（初めての方へ／about／menu／voice／staff／concept／access）の内容を
 * 「なりたい姿・お悩み → 共感 → 解決策 → こだわり → メニュー → 証拠（声・スタッフ）→ 店舗 → 流れ → Q&A → 予約」
 * という購買導線の順に1ページへ再構成したもの。CSS側で .mobile-only はスマホ幅のみ表示される。
 */
export default function MobileLanding() {
  const quickNav = NAV.filter((n) => n.id);

  return (
    <div className="mobile-only">
      {/* ── Hero（スマホは画面いっぱいに表示） ───────────────────── */}
      <section className="hero-mobile-full">
        <img
          src="/hero-mobile.jpg"
          alt="私を整える、わたしの時間。よもぎ蒸しで、新しい健康習慣を。冷え改善・温活、美肌・美髪デトックス、リラックス・安眠サポート、免疫力アップ。今日の自分を労わる30分から、未来の私をもっと輝かせる。"
        />
      </section>

      <div className="container">
        <div className="spacer-sm" />
        <p className="lede lede--ink lede--catch">
          {SITE.catch.jpLines.map((l) => (
            <span key={l}>
              {l}
              <br />
            </span>
          ))}
        </p>
      </div>

      <TrialBanner />

      {/* ── クイックナビ（目次） ───────────────────── */}
      <nav className="lp-quicknav" aria-label="ページ内メニュー">
        {quickNav.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="lp-quicknav__chip">
            {n.label}
          </a>
        ))}
      </nav>

      {/* ── 初めての方へ：ペルソナ（なりたい姿／お悩み） ───────────── */}
      <section id="first-time" className="lp-section">
        <Headline en="for first-time guests" jp="初めての方へ" />
        <div className="container">
          <p className="lede">
            よもぎ蒸しが初めての方も、どうぞご安心ください。
            <br />
            特別な場所ではなく、いつもの場所で気軽に。
          </p>
        </div>

        <Headline en="about" jp="どんな女性が利用するお店？" mini />
        <div className="persona">
          <div className="persona__col">
            <div className="persona__top">
              <h3 className="persona__head">人生をできるだけ<br />軽くしたい</h3>
              <div className="persona__photo"><img src="/persona/wish.jpg" alt="なりたい姿" /></div>
            </div>
            <ul className="persona__list">
              {WISH.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>

          <div className="persona__col persona__col--pain">
            <div className="persona__top">
              <h3 className="persona__head">女性特有の悩みを<br />なんとかしたい</h3>
              <div className="persona__photo"><img src="/persona/worry.jpg" alt="今のお悩み" /></div>
            </div>
            <ul className="persona__list">
              {WORRY.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <Headline en="you're not to blame" jp="その揺らぎ、あなたのせいじゃない。" mini />
        <div className="container">
          <p className="lede">
            「気のせい」「年齢のせい」で、片づけてきませんでしたか。
          </p>
          <p className="lede">
            体が芯から冷え、めぐりが滞り、休む間もなく走り続けている——
            その重なりが、心と体の両方にあらわれているだけ。
          </p>
          <p className="lede lede--ink">
            だから、内側から温めて、めぐりを取り戻すことから。
          </p>
        </div>

        <Headline en="our answer" jp="だから、よもぎ蒸し。" />
        <div className="container">
          <p className="lede">
            よもぎ蒸しは、椅子に座るだけ。
            <br />
            厳選した薬草の蒸気で下半身から体の芯までじんわり温め、
            <br />
            めぐりを取り戻すセルフケアです。
          </p>
        </div>
        <div className="spacer-sm" />
        <div className="feature">
          <div className="feature__img feature__img--illustration"><img src="/kodawari/yomogi-mushi.jpg" alt="よもぎ蒸し 冷え・むくみ・美肌・ストレス・子宮ケア・妊活。体の中からあたためる。" /></div>
          <div>
            <h3 className="feature__title">外見と内面は、ひとつの円を描く</h3>
            <p className="feature__body">
              髪や肌を整える外見のケアと、心と体の不調を整える内面のケア。
              どちらか一方だけでは足りません。私たちが届けたいのは、
              その両方が揃った「本当の健康」です。
            </p>
          </div>
        </div>

        <div className="eyebrow">ご利用の流れ</div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step" key={s.t}>
              <div className="step__no">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="step__title">{s.t}</div>
                <div className="step__body">{s.b}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ハーブ蒸しについて ───────────────────── */}
      <section id="about" className="lp-section">
        <Headline en="about herb steam" jp="ハーブ蒸しについて" />
        <div className="container">
          <p className="lede lede--ink">
            ON:Uのハーブ蒸しは、11種類のハーブを配合したオリジナルブレンド。
            <br />
            よもぎをはじめとする薬草の蒸気で、体を芯から温めます。
          </p>
          <p className="lede">
            専用のマントを羽織って座るだけで、じんわりと汗をかきながら体を内側から。
            頑張らないセルフケアとして、忙しい現代の方にこそ。
          </p>
        </div>

        <div className="eyebrow">ハーブ蒸しの魅力</div>
        <div className="container">
          {POINTS.map((p, i) => {
            const img = p.img ? (
              <div className={`feature__img ${p.fit === "contain" ? "tile--herbs" : ""}`}><img src={p.img} alt={p.t} /></div>
            ) : (
              <div className="feature__img"><Ph label={p.t} /></div>
            );
            const text = (
              <div>
                <h3 className="feature__title">{p.t}</h3>
                <p className="feature__body">{p.b}</p>
              </div>
            );
            return (
              <div className="feature" key={p.t} style={{ marginBottom: 40 }}>
                {i % 2 === 0 ? (
                  <>
                    {img}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {img}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="container">
          <p className="lede lede--ink">ハーブは【医薬部外品（薬用）】です。</p>
        </div>
        <div className="herb-types">
          {HERB_TYPES.map((t) => (
            <div className="herb-type" key={t.name}>
              <h3 className="herb-type__name">{t.name}</h3>
              <p className="herb-type__body">{t.body}</p>
            </div>
          ))}
        </div>

        <Headline en="blended herbs" jp="配合ハーブ（全11種類）" mini />
        <div className="container">
          <p className="lede">その日の体調やお悩みに合わせて、厳選した11種類のハーブをブレンドします。タップで詳細をご覧いただけます。</p>
        </div>
        <div className="herb-list">
          {HERBS.map((h) => (
            <details className="herb-item" key={h.name}>
              <summary className="herb-item__name">
                {h.name}
                <span className="herb-item__family">〈{h.family}〉</span>
              </summary>
              <p className="herb-item__body">{h.body}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── メニュー ───────────────────── */}
      <section id="menu" className="lp-section">
        <Headline en="menu" jp="メニュー" />
        <div className="container">
          <p className="lede">
            表示はすべて税込価格です。メニュー内容・料金は店舗により異なる場合があります。
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
          <ReserveLink className="btn btn--solid">予約する</ReserveLink>
        </div>
      </section>

      {/* ── お客様の声 ───────────────────── */}
      <section id="voice" className="lp-section">
        <Headline en="guest voice" jp="お客様の声" />
        <div className="container">
          <p className="lede">実際にご来店いただいたお客様からの声をご紹介します。</p>
        </div>
        <div className="spacer-sm" />
        {VOICES.map((v, i) => (
          <div className="voice" key={i}>
            <div className="voice__stars">{"★".repeat(5)}</div>
            <p className="voice__body">{v.body}</p>
            <div className="voice__meta">{v.name}（{v.meta}）</div>
          </div>
        ))}
      </section>

      {/* ── 各店舗のオーナー ───────────────────── */}
      <section id="staff" className="lp-section">
        <Headline en="owners" jp="各店舗のオーナー" />
        <div className="container">
          <p className="lede">
            自分たちも揺らいだ経験があるから、深く寄り添える。
            <br />
            裏表のない言葉で、あなたが本来の自分を取り戻す時間に寄り添います。
          </p>
        </div>
        <div className="grid-2 owners-grid">
          {OWNERS.map((s) => (
            <div className="staff-card" key={s.roman}>
              <div className="staff-card__photo"><Ph label={s.name} /></div>
              <div className="staff-card__name">{s.name}</div>
              <div className="staff-card__roman">{s.roman}</div>
              <div className="staff-card__role">{s.role}</div>
              <div className="staff-card__bio">{s.bio}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── コンセプト ───────────────────── */}
      <section id="concept" className="lp-section">
        <Headline en="our roots & vision" jp="揺らぎを知るから、寄り添える。" />
        <div className="container">
          <p className="lede">
            このプロジェクトの起点は、私たち自身が経験した「揺らぎ」にあります。
            <br />
            年齢や忙しさの中で立ち止まり、本当の健康と向き合ったこと。
          </p>
          <p className="lede lede--ink">
            巧みなセールスはいりません。私たちが体感した「良さ」を、そのままの言葉でお伝えする。
            <br />
            特別な場所ではなく、いつもの場所で安心して「揺らげる」場所を。
          </p>
        </div>
        <div className="eyebrow">私たちを形作るキーワード</div>
        <div className="container">
          <p className="lede">
            顔なじみの安心感　／　内側と外側の統合　／　裏表のない言葉
            <br />
            自らも潤う働き方　／　波及していく健康
          </p>
        </div>
      </section>

      {/* ── アクセス・店舗一覧 ───────────────────── */}
      <section id="access" className="lp-section">
        <Headline en="access" jp="店舗一覧・アクセス" />
        <div className="container">
          <p className="lede">尾道・福山に3店舗。どこに行っても安心できる、地域の拠り所として。お近くのサロンをご利用ください。</p>
        </div>
        <div className="spacer-sm" />
        {STORES.map((s) => (
          <section className="store" key={s.id}>
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
                    <dd><a className="store__tel" href={`tel:${s.tel.replace(/[^0-9+]/g, "")}`}>{s.tel}</a></dd>
                  </div>
                )}
              </dl>
            </div>
          </section>
        ))}
      </section>

      {/* ── よくあるご質問 ───────────────────── */}
      <Headline en="q & a" jp="よくあるご質問" mini />
      <div className="spacer-sm" />
      <div className="faq">
        {FAQ.map((f) => (
          <div className="faq__item" key={f.q}>
            <div className="faq__q">{f.q}</div>
            <div className="faq__a">{f.a}</div>
          </div>
        ))}
      </div>

      {/* ── ブログ導線 ───────────────────── */}
      <div className="container">
        <p className="lede">サロンからのお知らせ・よもぎ蒸しのコラムはブログでご紹介しています。</p>
        <div className="center" style={{ marginTop: 24 }}>
          <Link className="btn" href="/blog">ブログを見る</Link>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />

      {/* ── スマホ固定の予約導線 ───────────────────── */}
      <div className="lp-sticky-cta">
        <ReserveLink className="lp-sticky-cta__btn">{SITE.reserveLabel}</ReserveLink>
      </div>
    </div>
  );
}
