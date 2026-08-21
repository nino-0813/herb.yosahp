import type { Metadata } from "next";

const TITLE = "ご予約｜よもぎ蒸し（ハーブ蒸し） 福山・尾道";
const DESC = "よもぎ蒸し（ハーブ蒸し）のご予約はこちらから。尾道・福山4店舗、初回限定45分体験¥4,000。ハーブ蒸しサロンON:U。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/reserve" },
  openGraph: { title: TITLE, description: DESC, images: ["/og-image.jpg"] },
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
