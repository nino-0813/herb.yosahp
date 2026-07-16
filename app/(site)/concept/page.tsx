import Link from "next/link";
import { Ph, Headline, CtaBand, Footer } from "@/components/ui";
import { SITE } from "@/site.config";

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

      <div className="spacer" />
      <div className="grid-2">
        <div className="tile"><Ph label="美容・外見 — 髪を整える" /></div>
        <div className="tile"><Ph label="よもぎ蒸し・内面 — 体を温める" /></div>
      </div>

      <Headline en="our words" jp="裏表のない、本当の言葉。" mini />
      <div className="container">
        <p className="lede">
          巧みなセールスはいりません。
          <br />
          私たちが体感した「良さ」を、そのままの言葉でお伝えする。
          <br />
          顔なじみのあなたとの信頼関係の中で、自然と響いていくように。
        </p>
        <p className="lede lede--ink">
          特別な場所ではなく、いつもの場所で。
          <br />
          気軽に体を温め、弱音を吐き、本来の自分を取り戻せる。
          <br />
          安心して「揺らげる」場所を、私たちはつくっていきます。
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

      <div className="container">
        <p className="lede">この想いが、どんな方に寄り添えるのか。続けてご覧ください。</p>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn" href="/first-time">初めての方へ</Link>
        </div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
