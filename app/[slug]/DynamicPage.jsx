'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchPageData, clearPageData } from "@/app/store/slice/homePage/homePageSlice";
import Home from "@/app/page/Home/Home";
import SkeletonView from "@/app/components/Skeleton/SkeletonView";
import EventListing from "../page/Event/EventListing";
import EventHostPage from "../page/EventHost/EventHostPage";
import EventGoers from "../page/EventGoers/EventGoers";
import About from "../page/About/About";
import Contact from "../page/ContactUs/Contact";
import Disclaimer from "../components/Footer/Disclaimer";
import PrivacyPolicy from "../components/Footer/PrivacyPolicy";
import FaqSection from "../components/Contact/Faq";
import BookConsultation from "../components/Contact/BookConsultation";
import AskQuestion from "../components/Contact/AskQuestion";
import RequestCall from "../components/Contact/RequestCall";


export default function DynamicPage() {
  const params = useParams();

  const rawSlug = params?.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : rawSlug?.[0] || "home";

  const dispatch = useDispatch();
  const [localData, setLocalData] = useState(null);
  const [finalSlug, setFinalSlug] = useState("");
  const [metaData, setMetaData] = useState({});
  const [template, setTemplate] = useState("");
  const [content, setContent] = useState({});
  const { data, isLoading } = useSelector(state => state.dynamicPage) || {};

  if (typeof window === 'undefined') {
    console.log("DynamicPage data (SSR/server):", data);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocation = localStorage.getItem("userLocation");
      if (storedLocation) {
        setLocalData(JSON.parse(storedLocation));
      }
    }
  }, []);

  useEffect(() => {
    setFinalSlug(slug);
    setMetaData(data?.meta || {});
    setContent(data?.content || {});
    setTemplate(data?.template || '');
  }, [slug, data, dispatch]);

  const latitude = localData?.coords?.latitude;
  const longitude = localData?.coords?.longitude;

  useEffect(() => {
    if (finalSlug && latitude && longitude) {
      dispatch(clearPageData());
      dispatch(fetchPageData(finalSlug, latitude, longitude));
    }
  }, [finalSlug, latitude, longitude, dispatch]);

  if (isLoading || !template || !data) {
    return (
      <div className="bg-black">
        <SkeletonView customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)" />
      </div>
    );
  }

  const renderPages = () => {
    switch (template) {
      case "home_page":
        return <Home content={content} />;
      case "event_page":
        return <EventListing content={content} />;
    case "event_host_page":
        return <EventHostPage content={content} />;
    case "event_goers_page":
        return <EventGoers content={content} />;
    case "about_page":
        return <About content={content} />;
    case "support_page":
        return <Contact content={content} />;
    case "block_page":
        return <Disclaimer content={content} />;
    case "Privacy Policy":
        return <PrivacyPolicy content={content} />;
    case "support_faq_page":
        return <FaqSection content={content} />;
    case "consultation_form_page":
        return <BookConsultation content={content} />;
    case "partner_form_page":
        return <AskQuestion content={content} />;
    case "request_feature_form_page":
        return <RequestCall content={content} />;
    default:
        return null;
    }
  };

  return <>{renderPages()}</>;
}
