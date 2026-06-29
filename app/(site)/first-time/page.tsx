import Link from "next/link";
import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const STEPS = [
  { t: "ご予約", b: "Web・お電話・公式LINEからご予約いただけます。当日のご来店も空きがあれば承ります。" },
  { t: "ご来店・カウンセリング", b: "その日の体調やお悩み、心の揺らぎをお伺いし、おすすめの薬草をご提案します。お着替えをご用意しています。" },
  { t: "よもぎ蒸し", b: "専用のマントを羽織って椅子に座るだけ。よもぎなどの薬草の蒸気でゆっくりと体を温めます。" },
  { t: "アフター・お会計", b: "お白湯をご用意。火照った体をクールダウンしながら、ゆったりとお過ごしください。" },
];

const WISH = [
  "心も体もすっきりと目覚めたい",
  "日々を穏やかな気持ちで過ごしたい",
  "疲れにくい、軽やかな体で動きたい",
  "季節の変化にもゆるがない体づくりをしたい",
  "本来の自分のリズムを取り戻したい",
  "自然体で笑顔がこぼれる毎日を送りたい",
];

const WORRY = [
  "冷えがつらい／手足が冷たい",
  "自律神経の乱れを感じる",
  "ストレスが抜けず気分が落ち込みやすい",
  "眠りが浅い／疲れが抜けない",
  "妊活・更年期など、女性特有のゆらぎ",
  "美容（肌・めぐり・代謝）を整えたい",
];

const VOICES = [
  { body: "完全個室でとてもリラックスできました。汗をたっぷりかいて、終わった後は体がポカポカ。冷え性なので通いたいです。", meta: "30代女性 / 尾道店" },
  { body: "スタッフさんが体調に合わせて薬草を選んでくれました。香りに癒されて、いつの間にか眠ってしまうほど心地よかったです。", meta: "40代女性 / 福山駅前店" },
  { body: "生理前の不調が気になって伺いました。施術後は気持ちまで軽くなった感じ。お白湯のおもてなしも嬉しかったです。", meta: "20代女性 / 沼隈店" },
];

const FAQ = [
  { q: "予約は必要ですか？", a: "事前のご予約をおすすめしています。空きがあれば当日でもご案内可能です。" },
  { q: "どんな服装で行けばいいですか？", a: "専用マントに着替えていただくので、普段着のままで大丈夫です。" },
  { q: "生理中でも利用できますか？", a: "生理中こそおすすめです。スタッフにお気軽にご相談ください。" },
  { q: "所要時間はどれくらいですか？", a: "よもぎ蒸し単品で約30分、セットメニューで60〜90分程度が目安です。" },
];

export default function FirstTime() {
  return (
    <>
      <section className="hero"><Ph label="初めての方へ" /></section>

      <Headline en="for first-time guests" jp="初めての方へ" />
      <div className="container">
        <p className="lede">
          よもぎ蒸しが初めての方も、どうぞご安心ください。
          <br />
          特別な場所ではなく、いつもの場所で気軽に。
          <br />
          ご来店からお帰りまでの流れをご紹介します。
        </p>
      </div>

      <Headline en="about" jp="どんな女性が利用するお店？" />
      <div className="persona">
        <div className="persona__col">
          <div className="persona__top">
            <h3 className="persona__head">人生をできるだけ<br />軽くしたい</h3>
            <div className="persona__photo"><Ph label="なりたい姿" /></div>
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
            <div className="persona__photo"><Ph label="今のお悩み" /></div>
          </div>
          <ul className="persona__list">
            {WORRY.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ② 橋：なぜ起きているのか */}
      <Headline en="you're not to blame" jp="その揺らぎ、あなたのせいじゃない。" mini />
      <div className="container">
        <p className="lede">
          「気のせい」「年齢のせい」で、
          <br />
          片づけてきませんでしたか。
        </p>
        <p className="lede">
          女性の揺らぎの多くは、意志が弱いからでも、
          <br />
          あなたが頑張っていないからでもありません。
          <br />
          体が芯から冷え、めぐりが滞り、休む間もなく走り続けている——
          <br />
          その重なりが、心と体の両方にあらわれているだけ。
        </p>
        <p className="lede lede--ink">
          だから、内側から温めて、めぐりを取り戻すことから。
          <br />
          がんばって整えるのではなく、温まりながら、ちゃんとほどけていく。
        </p>
      </div>

      {/* ③ 解決の提示：だから、よもぎ蒸し */}
      <Headline en="our answer" jp="だから、よもぎ蒸し。" />
      <div className="container">
        <p className="lede">
          よもぎ蒸しは、椅子に座るだけ。
          <br />
          よもぎなどの薬草の蒸気で下半身から体の芯までじんわり温め、
          <br />
          めぐりを取り戻すセルフケアです。
        </p>
      </div>
      <div className="spacer-sm" />
      <div className="feature">
        <div className="feature__img"><Ph label="よもぎ蒸し" /></div>
        <div>
          <h3 className="feature__title">外見と内面は、ひとつの円を描く</h3>
          <p className="feature__body">
            髪や肌を整える外見のケアと、心と体の不調を整える内面のケア。
            どちらか一方だけでは足りません。私たちが届けたいのは、
            その両方が揃った「本当の健康」です。
          </p>
        </div>
      </div>

      {/* ④ 私たちだから、寄り添える */}
      <Headline en="why us" jp="私たちだから、寄り添える。" mini />
      <div className="container">
        <p className="lede">
          自分たちも、年齢や忙しさの中で「揺らぎ」を経験してきました。
          <br />
          だからこそ、あなたの不調にも、心の弱音にも、深く寄り添えると信じています。
        </p>
        <p className="lede lede--ink">
          顔なじみの安心感の中で、巧みなセールスではなく、裏表のない本当の言葉で。
          <br />
          特別な場所ではなく、いつもの場所で安心して「揺らげる」場所を。
        </p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/concept">私たちの想いを見る</Link>
        </div>
      </div>

      {/* ⑤ 証明：お客様の声 */}
      <Headline en="guest voice" jp="お客様の声" mini />
      <div className="spacer-sm" />
      {VOICES.map((v, i) => (
        <div className="voice" key={i}>
          <div className="voice__stars">{"★".repeat(5)}</div>
          <p className="voice__body">{v.body}</p>
          <div className="voice__meta">{v.meta}</div>
        </div>
      ))}
      <div className="center" style={{ marginTop: 30 }}>
        <Link className="btn" href="/voice">もっと見る</Link>
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

      <div className="container">
        <p className="lede">気になるメニューや料金は、こちらからご覧いただけます。</p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/menu">メニューを見る</Link>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
