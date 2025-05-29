"use client";

import React, { useEffect } from "react";
import AppPromotion from "../../components/Home/AppPromotion";
import BannerSection from "../../components/Home/BannerSection";
import PopularCities from "../../components/Home/PopularCities";
import EventsNearBy from "../../components/Home/EventsNearBy";
import TrendingEvents from "../../components/Home/TrendingEvents";
import LiveEvent from "../../components/Home/LiveEvent";
import EventOrganizer from "../../components/Home/EventOrganizer";

const Home = ({ content, meta }) => {

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

  
  console.log("meta", meta);
  console.log("content", content);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("filterFormValues");
    }
  }, []);

  return (
    <div className="bg-black">
      <BannerSection bannerData={content?.home_page?.banner} />
      <EventOrganizer
        hostData={content?.home_page?.hosts}
        featuresData={content?.home_page?.featured_events}
      />
      <TrendingEvents hostData={content?.home_page?.event_slider} />
      <LiveEvent hostData={content?.home_page?.event_category} />
      <EventsNearBy nearbyData={content?.home_page?.nearby_event} />
      <PopularCities citiesData={content?.home_page?.cities} />
      <AppPromotion appPromotion={content?.home_page?.pageContent} />
    </div>
  );
};

export default Home;
