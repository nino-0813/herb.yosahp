import { Ph, Headline, CtaBand, Footer } from "@/components/ui";
import { SITE } from "@/site.config";

export default function Concept() {
  return (
    <>
      <section className="hero"><Ph label="concept" /></section>

      <Headline en="beauty from within" jp="本来の美しさを最大限に。" />

      <div className="container">
        <div className="spacer-sm" />
        <p className="lede">
          ハーブ蒸しを通して、
          <br />
          あらゆるお客様のお悩みや日々のお疲れに
          <br />
          寄り添えるサロンに。
        </p>
        <p className="lede">
          蒸されることで、変化していく自分に
          <br />
          ワクワクする。現代人には欠かせない
          <br />
          リラックスタイムをゆったりと。
        </p>
        <p className="lede">
          {SITE.brand}とは、自分と向き合い心を解放する
          <br />
          時間を持つこと。
          <br />
          時間を忘れ、心が無になる。
        </p>
        <p className="lede lede--ink">
          そんな時間が過ごせる
          <br />
          あなただけの特別な
          <br />
          chill spotとなりますように。
        </p>
      </div>

      <div className="spacer" />
      <div className="grid-2">
        <div className="tile"><Ph label="個室空間" /></div>
        <div className="tile"><Ph label="ハーブ" /></div>
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
