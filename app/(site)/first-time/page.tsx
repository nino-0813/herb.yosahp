import type { Metadata } from "next";
import Link from "next/link";
import { Ph, Headline, CtaBand, Footer, TrialBanner } from "@/components/ui";

const TITLE = "初めての方へ｜よもぎ蒸し（ハーブ蒸し）が初めてでも安心";
const DESC = "よもぎ蒸し（ハーブ蒸し）が初めての方向けのガイド。ご来店の流れ、よくある質問、初回限定45分体験¥4,000のご案内。福山・尾道のハーブ蒸しサロンON:U。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/first-time" },
  openGraph: { title: TITLE, description: DESC },
};

export const STEPS = [
  { t: "ご予約", b: "Web・お電話からご予約いただけます。当日のご来店も空きがあれば承ります。" },
  { t: "ご来店・カウンセリング", b: "その日の体調やお悩み、心の揺らぎをお伺いしルルオンの入り方の説明をさせていただきます。" },
  { t: "ハーブ蒸し", b: "専用のウエアをご用意しておりますので、その上に専用のマントを羽織って、ルルオンに座っていただきます。水素とハーブの蒸気でゆっくりじっくりしっかりと体を温めます。" },
  { t: "アフター・お会計", b: "クールダウンしていただき、体験は終了となります。" },
];

export const WISH = [
  "心も体もすっきりと目覚めたい",
  "日々を穏やかな気持ちで過ごしたい",
  "疲れにくい、軽やかな体で動きたい",
  "季節の変化にもゆるがない体づくりをしたい",
  "本来の自分のリズムを取り戻したい",
  "自然体で笑顔がこぼれる毎日を送りたい",
];

export const WORRY = [
  "冷えがつらい／手足が冷たい",
  "自律神経の乱れを感じる",
  "ストレスが抜けず気分が落ち込みやすい",
  "眠りが浅い／疲れが抜けない",
  "妊活・更年期など、女性特有のゆらぎ",
  "美容（肌・めぐり・代謝）を整えたい",
];

const VOICES = [
  { name: "はるちゃんさん", meta: "女性 / 50代", body: "施術中は身体が芯から温まって、日頃の疲れがスーッと取れていくのを感じました。翌朝の肌の調子にも驚き、全身がツルツルに。リラックスも美容効果も感じられて、とても贅沢な時間でした。" },
  { name: "あいぴょんさん", meta: "女性 / 40代 / 自営業", body: "足のむくみと冷えが気になり予約。マッサージ後にハーブ蒸しをすると体がさらに軽くなり、むくみもスッキリ。その日は冷えも全く感じませんでした。続けて通おうと思います！" },
  { name: "かなこさん", meta: "女性 / 30代前半 / 会社員", body: "一回でも驚くほど身体が軽くなって、帰りは階段の昇り降りが凄く楽に。いろいろ試しましたが温まり方が1番でした。太っていると思っていたところがむくみだった様でスッキリしました！" },
];

export const FAQ = [
  { q: "予約は必要ですか？", a: "事前のご予約をおすすめしています。空きがあれば当日でもご案内可能です。" },
  { q: "どんな服装で行けばいいですか？", a: "専用マントに着替えていただくので、普段着のままで大丈夫です。" },
  { q: "生理中でも利用できますか？", a: "生理中こそおすすめです。スタッフにお気軽にご相談ください。" },
  { q: "所要時間はどれくらいですか？", a: "初回体験は着替え・カウンセリングを含めて60分程度が目安です（ハーブ蒸しは45分）。" },
];

export default function FirstTime() {
  return (
    <>
      <Headline en="for first-time guests" jp="初めての方へ" />
      <div className="container">
        <p className="lede">
          ハーブ蒸しが初めての方も、どうぞご安心ください。
          <br />
          特別な場所ではなく、いつもの場所で気軽に。
          <br />
          ご来店からお帰りまでの流れをご紹介します。
        </p>
      </div>

      <TrialBanner />

      <Headline en="about" jp="どんな女性が利用するお店？" />
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

      {/* ③ 解決の提示：だから、ハーブ蒸し */}
      <Headline en="our answer" jp="だから、ハーブ蒸し。" />
      <div className="container">
        <p className="lede">
          ハーブ蒸しは、椅子に座るだけ。
          <br />
          よもぎなどの薬草の蒸気で下半身から体の芯までじんわり温め、
          <br />
          めぐりを取り戻すセルフケアです。
        </p>
      </div>
      <div className="spacer-sm" />
      <div className="feature">
        <div className="feature__img feature__img--illustration"><img src="/kodawari/yomogi-mushi.jpg" alt="ハーブ蒸し 専用マントを着て蒸気を浴びるだけ、体の中からじんわり温めて巡りをサポート。冷え・むくみ・フェムケア・腸活・ストレス・美肌・妊活・ダイエット。体の中からあたためる。" /></div>
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
          <div className="voice__meta">{v.name}（{v.meta}）</div>
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
