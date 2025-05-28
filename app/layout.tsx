import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Topbar/Header";
import Navbar from "./components/Topbar/Navbar";
import Footer from "./components/Footer/Footer";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "RallyUp - Find Local Events",
  description: "Find local events and things to do in your city.",
  openGraph: {
    images: ['/rallyup-og.png'],
  },
  twitter: {
    images: ['/rallyup-og.png'],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
