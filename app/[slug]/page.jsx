import DynamicPage from "./DynamicPage";
import MetaScripts from "../components/MetaScript/MetaScripts";

export async function generateMetadata({ params }) {
  const awaitedParams =
    typeof params?.then === "function" ? await params : params;
  const slug = awaitedParams?.slug
    ? Array.isArray(awaitedParams.slug)
      ? awaitedParams.slug[0]
      : awaitedParams.slug
    : "home";
  const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${rootUrl}api/web/pages/list?slug=${slug}`, {
    cache: "no-store",
  });
  const apiData = await res.json();
  const meta = apiData?.data?.meta || {};

  // const favicon = apiData?.data?.settings?.favicon || "/favicon.ico";

  // const isProduction = process.env.NODE_ENV === "production";
  // const canonicalUrl = `${rootUrl}${slug === "home" ? "" : slug}`;

  return {
    title: meta.meta_title || `RallyUp-${slug}`,
    description:
      meta.meta_description ||
      "Find local events and things to do in your city.",
    keywords: meta.meta_keywords || undefined,
    authors: meta.meta_author ? [{ name: meta.meta_author }] : undefined,
    openGraph: {
      title: meta.meta_title || `RallyUp-${slug}`,
      description:
        meta.meta_description ||
        "Find local events and things to do in your city.",
      url: `https://rallyup.in/${slug === "home" ? "" : slug}`,
      type: "website",
      images: [
        {
          url: meta.meta_feature_image || "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.meta_title || `RallyUp-${slug}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.meta_title || `RallyUp-${slug}`,
      description:
        meta.meta_description ||
        "Find local events and things to do in your city.",
      images: [meta.meta_feature_image || "/default-og-image.jpg"],
    },
  };
}

export default function Page() {
  return (
    <>
      <MetaScripts />
      <DynamicPage />
    </>
  );
}
