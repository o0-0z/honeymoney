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
  metadataBase: new URL("https://honeymoney-beta.vercel.app"),
  openGraph: {
    title: "시럽급여 (HoneyMoney)",
    description: "2026년 기준 실업급여 간편 계산기",
    url: "https://honeymoney-beta.vercel.app",
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
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9991254411797769"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fbbf24" />
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-9991254411797769" />
        {/* Search Engine Verification Meta Tags */}
        <meta name="google-site-verification" content="rBJ4ZSJAJ3zK0X-f23myFlgWWdmQKcddv82oiO2mPZw" />
        <meta name="naver-site-verification" content="b86c4d1857b9de2062c072fb9876140ca5c5ea11" />
        <meta name="msvalidate.01" content="888F6A094FFE9B432578B0D25114C0EA" />
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
