import type { Metadata } from "next";
import { Headline, CtaBand, Footer, ReserveLink } from "@/components/ui";
import { SITE } from "@/site.config";

const TITLE = "コンセプト｜揺らぎを知るから、寄り添える。";
const DESC = "ON:Uが大切にしている想い。外見と内面、両方が揃った「本当の健康」を届けたい。福山・尾道のよもぎ蒸し（ハーブ蒸し）サロン。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/concept" },
  openGraph: { title: TITLE, description: DESC, images: ["/og-image.jpg"] },
};

export default function Concept() {
  return (
    <>
      <Headline en="our roots & vision" jp="揺らぎを知るから、寄り添える。" />

      <div className="container">
        <div className="spacer-sm" />
        <p className="lede">
          このプロジェクトの起点は、
          <br />
          私たち自身が経験した「揺らぎ」にあります。
          <br />
          年齢や忙しさの中で立ち止まり、本当の健康と向き合ったこと。
          <br />
          それが、すべての始まりでした。
        </p>
        <p className="lede lede--ink">
          「健康が一番だよ」
          <br />
          頭ではなく、胸に真っ直ぐ落ちたその一言が、
          <br />
          私たちの視界をクリアにしてくれました。
        </p>
      </div>

      <Headline en="inner & outer" jp="外見と内面は、ひとつの円を描く。" mini />
      <div className="container">
        <p className="lede">
          髪を綺麗にする外見のケアと、
          <br />
          心と体の不調を整える内面のケア。
          <br />
          どちらか一方だけでは足りません。
        </p>
        <p className="lede lede--ink">
          私たちが提供するのは、その両方が揃った「本当の健康」。
          <br />
          {SITE.brand}は、美容師としての使命の進化からはじまりました。
        </p>
      </div>

      <div className="container">
        <p className="lede">この想いが、どんな方に寄り添えるのか。続けてご覧ください。</p>
        <div className="center" style={{ marginTop: 30 }}>
          <ReserveLink className="btn" eventLabel="concept_reserve">予約をする</ReserveLink>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
