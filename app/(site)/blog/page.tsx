import Link from "next/link";
import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const POSTS = [
  { date: "2026.07.16", cat: "ハーブ蒸し", title: "福山市・尾道市でハーブ蒸しをお探しの方へ｜11種類のハーブで心地よく温まる時間", excerpt: "福山市・尾道市周辺でハーブ蒸しをお探しの方へ。11種類のハーブの特徴や香り、ハーブ蒸しの流れ、初めての方への説明を分かりやすくご紹介します。", href: "/herb-steam-11-herbs-fukuyama-onomichi" },
  { date: "2026.06.10", cat: "お知らせ", title: "ON:U、3店舗合同でスタートしました", excerpt: "尾道・福山の3つのサロンが「ON:U」として、ひとつの想いのもとにスタートしました。皆さまのご来店を心よりお待ちしております。" },
  { date: "2026.05.28", cat: "よもぎ蒸し", title: "梅雨のむくみ・だるさによもぎ蒸し", excerpt: "気圧の変化で不調を感じやすい季節。温活でめぐりを整えるセルフケアをご紹介します。" },
  { date: "2026.05.12", cat: "キャンペーン", title: "初回体験セットがお得な期間限定プライス", excerpt: "よもぎ蒸し＋足つぼ／うる艶パックのセットを特別価格でご案内中です。" },
  { date: "2026.04.20", cat: "コラム", title: "外見と内面は、ひとつの円を描く", excerpt: "髪を整える外見のケアと、体を温める内面のケア。私たちが大切にしている「本当の健康」についてお話しします。" },
  { date: "2026.04.02", cat: "スタッフ", title: "新しいスタッフが仲間に加わりました", excerpt: "各店舗に新しいスタッフが加わりました。プロフィールはスタッフページからどうぞ。" },
];

export default function Blog() {
  return (
    <>
      <Headline en="blog" jp="ブログ" />
      <div className="container">
        <p className="lede">サロンからのお知らせ・よもぎ蒸しのコラムをお届けします。</p>
      </div>

      <div className="spacer-sm" />
      {POSTS.map((p) => {
        const inner = (
          <>
            <div className="post__thumb"><Ph label={p.cat} /></div>
            <div>
              <div>
                <span className="post__date">{p.date}</span>
                <span className="post__cat">{p.cat}</span>
              </div>
              <h2 className="post__title">{p.title}</h2>
              <p className="post__excerpt">{p.excerpt}</p>
              {"href" in p && p.href && <span className="post__more">続きを読む →</span>}
            </div>
          </>
        );
        return "href" in p && p.href ? (
          <Link className="post post--link" key={p.title} href={p.href}>{inner}</Link>
        ) : (
          <article className="post" key={p.title}>{inner}</article>
        );
      })}

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
