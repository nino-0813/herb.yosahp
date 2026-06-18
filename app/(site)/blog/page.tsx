import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const POSTS = [
  { date: "2026.06.10", cat: "お知らせ", title: "福山〇〇店、グランドオープンしました", excerpt: "この度、4店舗目となる福山〇〇店をオープンいたしました。皆さまのご来店を心よりお待ちしております。" },
  { date: "2026.05.28", cat: "ハーブ蒸し", title: "梅雨のむくみ・だるさにハーブ蒸し", excerpt: "気圧の変化で不調を感じやすい季節。温活でめぐりを整えるセルフケアをご紹介します。" },
  { date: "2026.05.12", cat: "キャンペーン", title: "初回体験セットがお得な期間限定プライス", excerpt: "ハーブ蒸し＋足つぼ／うる艶パックのセットを特別価格でご案内中です。" },
  { date: "2026.04.20", cat: "コラム", title: "よもぎ蒸しとハーブ蒸し、何が違う？", excerpt: "よく聞かれるご質問にスタッフがお答えします。それぞれの特徴を分かりやすく解説。" },
  { date: "2026.04.02", cat: "スタッフ", title: "新しいスタッフが仲間に加わりました", excerpt: "各店舗に新しいスタッフが加わりました。プロフィールはスタッフページからどうぞ。" },
];

export default function Blog() {
  return (
    <>
      <section className="hero"><Ph label="blog" /></section>

      <Headline en="blog" jp="ブログ" />
      <div className="container">
        <p className="lede">サロンからのお知らせ・ハーブ蒸しのコラムをお届けします。</p>
      </div>

      <div className="spacer-sm" />
      {POSTS.map((p) => (
        <article className="post" key={p.title}>
          <div className="post__thumb"><Ph label={p.cat} /></div>
          <div>
            <div>
              <span className="post__date">{p.date}</span>
              <span className="post__cat">{p.cat}</span>
            </div>
            <h2 className="post__title">{p.title}</h2>
            <p className="post__excerpt">{p.excerpt}</p>
          </div>
        </article>
      ))}

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
