import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "시럽급여 (HoneyMoney) - 2026년 실업급여 계산기",
  description: "2026년 기준 실업급여를 간단하게 계산해보세요. 달달하게 계산되는 실업급여 시럽급여(HoneyMoney)",
  keywords: ["실업급여", "실업급여 계산기", "고용보험", "2026년"],
  metadataBase: new URL("https://honeymoney.netlify.app"),
  openGraph: {
    title: "시럽급여 (HoneyMoney)",
    description: "2026년 기준 실업급여 간편 계산기",
    url: "https://honeymoney.netlify.app",
    siteName: "HoneyMoney",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HoneyMoney",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense - Replace 'ca-pub-xxxxxxxxxxxxxxxx' with your actual AdSense ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HoneyMoney" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
