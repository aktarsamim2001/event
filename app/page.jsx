import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import DynamicPage from "./[slug]/page";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata() {
  const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const slug = "home";
  const res = await fetch(`${rootUrl}api/web/pages/list?slug=${slug}`, { cache: "no-store" });
  const apiData = await res.json();
  const meta = apiData?.data?.meta || {};

  return {
    title: meta.meta_title || `RallyUp-Home`,
    description: meta.meta_description || "Find local events and things to do in your city.",
    keywords: meta.meta_keywords || undefined,
    authors: meta.meta_author ? [{ name: meta.meta_author }] : undefined,
    openGraph: {
      title: meta.meta_title || `RallyUp-Home`,
      description: meta.meta_description || "Find local events and things to do in your city.",
      url: `https://rallyup.in/`,
      type: "website",
      images: [
        {
          url: meta.meta_feature_image || "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.meta_title || `RallyUp-Home`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.meta_title || `RallyUp-Home`,
      description: meta.meta_description || "Find local events and things to do in your city.",
      images: [meta.meta_feature_image || "/default-og-image.jpg"],
    },
  };
}

export default function MainPage() {
  return <DynamicPage />;
}
