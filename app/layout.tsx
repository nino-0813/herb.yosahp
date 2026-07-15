import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/site.config";

export const metadata: Metadata = {
  title: SITE.fullName,
  description: `${SITE.catch.jpLines.join(" ")} あなたを優しく温める、福山・尾道の韓国よもぎ蒸しサロン ${SITE.brand}。温活・妊活・美容・自律神経まで、女性の“めぐり”とライフケアに寄り添う3店舗の合同サロンです。`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Shippori+Mincho:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
