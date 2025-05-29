import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import DynamicPage from "./[slug]/page";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata() {
  const meta = {
    meta_title: "RallyUp-Home",
    meta_description: "Find local events and things to do in your city.",
    meta_feature_image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return {
    title: meta.meta_title,
    description: meta.meta_description,
    openGraph: {
      title: meta.meta_title,
      description: meta.meta_description,
      url: "https://rallyup.in/",
      type: "website",
      images: [
        {
          url: meta.meta_feature_image,
          width: 1200,
          height: 630,
          alt: meta.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.meta_title,
      description: meta.meta_description,
      images: [meta.meta_feature_image],
    },
  };
}

export default function MainPage() {
  return <DynamicPage />;
}