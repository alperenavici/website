import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Av. Mehmet Can Çelimli | Hukuk Bürosu",
  description: "Profesyonel hukuki danışmanlık ve avukatlık hizmetleri",
  icons: {
    icon: '/favicon.png', // veya istediğiniz icon dosyasının yolu
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Kritik resimleri preload et */}
        <link rel="preload" as="image" href="/images/home1.jpg" />
        <link rel="preload" as="image" href="/images/person.jpg" />
        <link rel="preload" as="image" href="/images/services.jpg" />
        <link rel="preload" as="image" href="/images/about2.jpg" />
        <link rel="preload" as="image" href="/images/contact2.jpg" />
        <link rel="preload" as="image" href="/images/ofis.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
