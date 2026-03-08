import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
});

export const metadata: Metadata = {
  title: "RIAT Blog スライドライブラリー | Digital Archive Constellation",
  description: "「和モダン」と「宇宙」を融合させた、コンステレーション型のデジタルアーカイブサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${shipporiMincho.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}
