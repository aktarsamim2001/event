import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Topbar/Header";
import Navbar from "./components/Topbar/Navbar";
import Footer from "./components/Footer/Footer";
import React from "react";
import ScrollToTop from "../components/ui/ScrollToTop";
import AppScrollWrapper from "../components/ui/AppScrollWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
          <AppScrollWrapper>
          <Header />
          <Navbar />
            <ScrollToTop>{children}</ScrollToTop>
          <Footer />
          </AppScrollWrapper>
        </Providers>
      </body>
    </html>
  );
}
