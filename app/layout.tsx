import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/site.config";

export const metadata: Metadata = {
  title: SITE.fullName,
  description: `${SITE.catch.jpLines.join(" ")} 尾道・沼隈・福山のハーブ蒸しサロン ${SITE.brand}。`,
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
