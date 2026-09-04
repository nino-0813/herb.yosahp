import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, Footer, ReserveLink } from "@/components/ui";
import { SITE } from "@/site.config";
import { SEO_ARTICLES, SEO_ARTICLE_MAP } from "@/lib/seo-articles";

export function generateStaticParams() {
  return SEO_ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = SEO_ARTICLE_MAP[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      images: [article.image],
    },
  };
}

export default async function SeoArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = SEO_ARTICLE_MAP[slug];
  if (!article) notFound();
  const related = SEO_ARTICLES.filter((item) => item.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: `${SITE.siteUrl}${article.image}`,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "ja",
        mainEntityOfPage: `${SITE.siteUrl}/blog/${article.slug}`,
        author: { "@type": "Organization", name: SITE.fullName },
        publisher: { "@type": "Organization", name: SITE.fullName },
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: SITE.siteUrl },
          { "@type": "ListItem", position: 2, name: "ブログ", item: `${SITE.siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: article.heading },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article seo-article">
        <nav className="article__breadcrumb" aria-label="パンくずリスト">
          <Link href="/">トップ</Link><span>›</span><Link href="/blog">ブログ</Link><span>›</span><span>{article.category}</span>
        </nav>
        <div className="article__hero article__hero--wide">
          <img src={article.image} alt={article.imageAlt} />
        </div>
        <p className="article__eyebrow">{article.category}</p>
        <h1 className="article__title">{article.heading}</h1>
        <p className="article__date">{article.date.replace(/-/g, ".")}</p>
        <p className="seo-article__lead">{article.lead}</p>

        <aside className="seo-article__toc" aria-label="目次">
          <strong>この記事でわかること</strong>
          <ol>{article.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{section.heading}</a></li>)}</ol>
        </aside>

        {article.sections.map((section, index) => (
          <section key={section.heading} id={`section-${index + 1}`} className="seo-article__section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
          </section>
        ))}

        <p className="article__note">ハーブ蒸し・よもぎ蒸しは医療行為ではなく、病気の診断・治療・予防を目的とするものではありません。体調に不安がある方、妊娠中の方、通院中・服薬中の方は、利用前に医師へご相談ください。</p>

        <div className="article__cta">
          <p className="article__cta-title">福山・尾道の4店舗から選べます</p>
          <p>初めての方にも、着替え方や温度調整を丁寧にご案内します。</p>
          <div className="seo-article__actions">
            <ReserveLink className="btn btn--solid" eventLabel={`seo_article_${article.slug}`}>空き状況を確認する</ReserveLink>
            <Link className="btn" href="/access">店舗を確認する</Link>
          </div>
        </div>

        <h2>よくある質問</h2>
        <div className="faq">
          {article.faq.map((item) => <div className="faq__item" key={item.q}><div className="faq__q">{item.q}</div><div className="faq__a">{item.a}</div></div>)}
        </div>

        <section className="seo-article__related">
          <h2>あわせて読みたい記事</h2>
          <div>{related.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}><small>{item.category}</small><span>{item.heading}</span></Link>)}</div>
        </section>
      </article>
      <CtaBand />
      <Footer />
    </>
  );
}
