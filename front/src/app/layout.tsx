import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/theme";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "今日の国会 - kokkai-today",
  description:
    "今日1日, 国会で話されたテーマを, 国会議事録の全発言から抽出しビジュアル化しています",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GA_ID || "";

  return (
    <html lang="ja">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
