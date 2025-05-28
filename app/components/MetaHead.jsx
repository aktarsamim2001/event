"use client";

import React from "react";
import Head from "next/head";

const MetaHead = ({ meta }) => {
  const {
    meta_title,
    meta_description,
    meta_feature_image,
    meta_keywords,
    meta_author,
    // Fallbacks for legacy keys
    title,
    description,
    ogImage,
    ogTitle,
  } = meta || {};

  const url = typeof window !== "undefined" ? window.location.href : "https://rallyup.in/";
  const siteName = "RallyUp";
  const image = meta_feature_image || ogImage || "/default-og-image.jpg";
  const imageAlt = meta_title || title || "RallyUp";
  const imageWidth = "1200";
  const imageHeight = "630";

  return (
    <Head>
      <title>{meta_title || title || "RallyUp"}</title>
      {meta_description || description ? (
        <meta name="description" content={meta_description || description} />
      ) : null}
      {meta_keywords && <meta name="keywords" content={meta_keywords} />}
      {meta_author && <meta name="author" content={meta_author} />}
      {/* Open Graph tags */}
      <meta property="og:title" content={meta_title || ogTitle || title || "RallyUp"} />
      <meta
        property="og:description"
        content={meta_description || description || "Discover events and experiences with RallyUp"}
      />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta_title || ogTitle || title || "RallyUp"} />
      <meta
        name="twitter:description"
        content={meta_description || description || "Discover events and experiences with RallyUp"}
      />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default MetaHead;