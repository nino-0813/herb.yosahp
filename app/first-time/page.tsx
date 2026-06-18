import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const STEPS = [
  { t: "ご予約", b: "Web・お電話・公式LINEからご予約いただけます。当日のご来店も空きがあれば承ります。" },
  { t: "ご来店・カウンセリング", b: "その日の体調やお悩みをお伺いし、おすすめのハーブをご提案します。お着替えをご用意しています。" },
  { t: "ハーブ蒸し", b: "専用のマントを羽織って椅子に座るだけ。薬草の蒸気でゆっくりと体を温めます。" },
  { t: "アフター・お会計", b: "お白湯をご用意。火照った体をクールダウンしながら、ゆったりとお過ごしください。" },
];

const FAQ = [
  { q: "予約は必要ですか？", a: "事前のご予約をおすすめしています。空きがあれば当日でもご案内可能です。" },
  { q: "どんな服装で行けばいいですか？", a: "専用マントに着替えていただくので、普段着のままで大丈夫です。" },
  { q: "生理中でも利用できますか？", a: "生理中こそおすすめです。スタッフにお気軽にご相談ください。" },
  { q: "所要時間はどれくらいですか？", a: "ハーブ蒸し単品で約30分、セットメニューで60〜90分程度が目安です。" },
];

export default function FirstTime() {
  return (
    <>
      <section className="hero"><Ph label="初めての方へ" /></section>

      <Headline en="for first-time guests" jp="初めての方へ" />
      <div className="container">
        <p className="lede">
          ハーブ蒸しが初めての方も、どうぞご安心ください。
          <br />
          ご来店からお帰りまでの流れをご紹介します。
        </p>
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

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
