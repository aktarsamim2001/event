"use client";

import React, { useEffect } from "react";
import AppPromotion from "../../components/Home/AppPromotion";
import BannerSection from "../../components/Home/BannerSection";
import PopularCities from "../../components/Home/PopularCities";
import EventsNearBy from "../../components/Home/EventsNearBy";
import TrendingEvents from "../../components/Home/TrendingEvents";
import LiveEvent from "../../components/Home/LiveEvent";
import EventOrganizer from "../../components/Home/EventOrganizer";

const Home = ({ content }) => {

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
