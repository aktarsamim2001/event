import EventDetails from "./EventDetails.jsx";

export async function generateMetadata({ params }) {
  const awaitedParams = typeof params?.then === 'function' ? await params : params;
  const slug = awaitedParams?.slug ? (Array.isArray(awaitedParams.slug) ? awaitedParams.slug[0] : awaitedParams.slug) : "event";

  const rootUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-api-base-url.com/";
  const res = await fetch(`${rootUrl}api/events/details?slug=${slug}`, { cache: "no-store" });
  const apiData = await res.json();
  const meta = apiData?.data?.meta || {};
  console.log("Meta Data:", meta);

  return {
    title: meta.meta_title || `Event - ${slug}`,
    description: meta.meta_description || "Discover details about this event, including date, location, and more.",
    keywords: meta.meta_keywords || "event, local events, things to do",
    authors: meta.meta_author ? [{ name: meta.meta_author }] : undefined,
    openGraph: {
      title: meta.meta_title || `Event - ${slug}`,
      description: meta.meta_description || "Discover details about this event, including date, location, and more.",
      url: `https://your-site.com/events/${slug}`,
      type: "website",
      images: [
        {
          url: meta.meta_feature_image || "/default-event-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.meta_title || `Event - ${slug}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.meta_title || `Event - ${slug}`,
      description: meta.meta_description || "Discover details about this event, including date, location, and more.",
      images: [meta.meta_feature_image || "/default-event-image.jpg"],
    },
  };
}

export default function Page() {
  return <EventDetails />;
}