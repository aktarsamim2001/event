import EventDetails from "../../page/EventDetails/EventDetails.jsx";
import MetaScripts from "../../components/MetaScript/MetaScripts";

export async function generateMetadata({ params }) {
  // Await params to resolve the Promise
  const awaitedParams = await params;
  const slug = awaitedParams?.slug
    ? Array.isArray(awaitedParams.slug)
      ? awaitedParams.slug[0]
      : awaitedParams.slug
    : "home";

  const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rallyup.in";

  try {
    const res = await fetch(`${rootUrl}/api/web/events/details/${slug}`, {
      cache: "no-store",
    });
    const apiData = await res.json();
    const meta = apiData?.data?.event || {};

    // Log metadata for debugging
    console.log("Meta Data:", meta);

    // Ensure image URL is absolute
    const featureImage = meta.meta_feature_image
      ? meta.meta_feature_image.startsWith("http")
        ? meta.meta_feature_image
        : `${siteUrl}${meta.meta_feature_image.startsWith("/") ? "" : "/"}${
            meta.meta_feature_image
          }`
      : `${siteUrl}/default-og-image.jpg`;

    return {
      title: meta.meta_title || `RallyUp - ${slug}`,
      description:
        meta.meta_description ||
        "Find local events and things to do in your city.",
      keywords: meta.meta_keywords || undefined,
      authors: meta.meta_author ? [{ name: meta.meta_author }] : undefined,
      openGraph: {
        title: meta.meta_title || `RallyUp - ${slug}`,
        description:
          meta.meta_description ||
          "Find local events and things to do in your city.",
        url: `${siteUrl}/${slug === "home" ? "" : slug}`,
        type: "website",
        images: [
          {
            url: featureImage,
            width: 1200,
            height: 630,
            alt: meta.meta_title || `RallyUp - ${slug}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.meta_title || `RallyUp - ${slug}`,
        description:
          meta.meta_description ||
          "Find local events and things to do in your city.",
        images: [featureImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Fallback metadata
    return {
      title: `RallyUp - ${slug}`,
      description: "Find local events and things to do in your city.",
      keywords: undefined,
      authors: undefined,
      openGraph: {
        title: `RallyUp - ${slug}`,
        description: "Find local events and things to do in your city.",
        url: `${siteUrl}/${slug === "home" ? "" : slug}`,
        type: "website",
        images: [
          {
            url: `${siteUrl}/default-og-image.jpg`,
            width: 1200,
            height: 630,
            alt: `RallyUp - ${slug}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `RallyUp - ${slug}`,
        description: "Find local events and things to do in your city.",
        images: [`${siteUrl}/default-og-image.jpg`],
      },
    };
  }
}

export default async function Page({ params }) {
  // Await params to resolve the Promise
  const awaitedParams = await params;
  const slug = awaitedParams?.slug
    ? Array.isArray(awaitedParams.slug)
      ? awaitedParams.slug[0]
      : awaitedParams.slug
    : "home";
  return (
    <>
      <MetaScripts />
      <EventDetails slug={slug} />
    </>
  );
}
