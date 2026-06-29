import Link from "next/link";
import { Headline, CtaBand, Footer } from "@/components/ui";

const VOICES = [
  { stars: 5, body: "完全個室でとてもリラックスできました。汗をたっぷりかいて、終わった後は体がポカポカ。冷え性なので通いたいです。", meta: "30代女性 / 尾道店" },
  { stars: 5, body: "スタッフさんが体調に合わせて薬草を選んでくれました。香りに癒されて、いつの間にか眠ってしまうほど心地よかったです。", meta: "40代女性 / 福山駅前店" },
  { stars: 5, body: "生理前の不調が気になって伺いました。施術後は気持ちまで軽くなった感じ。お白湯のおもてなしも嬉しかったです。", meta: "20代女性 / 沼隈店" },
  { stars: 4, body: "足つぼとのセットを体験。むくみがすっきりして足が軽くなりました。次はフェイシャルも試してみたいです。", meta: "50代女性 / 福山〇〇店" },
];

function Stars({ n }: { n: number }) {
  return <div className="voice__stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</div>;
}

export default function Voice() {
  return (
    <>
      <Headline en="guest voice" jp="お客様の声" />
      <div className="container">
        <p className="lede">実際にご来店いただいたお客様からの声をご紹介します。</p>
      </div>

      <div className="spacer-sm" />
      {VOICES.map((v, i) => (
        <div className="voice" key={i}>
          <Stars n={v.stars} />
          <p className="voice__body">{v.body}</p>
          <div className="voice__meta">{v.meta}</div>
        </div>
      ))}

      <div className="container">
        <p className="lede">あなたに合うメニューを見つけてください。</p>
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
