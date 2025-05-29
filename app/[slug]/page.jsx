'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchPageData, clearPageData } from "@/app/store/slice/homePage/homePageSlice";
import Home from "@/app/page/Home/Home";
import SkeletonView from "@/app/components/Skeleton/SkeletonView";

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

  console.log("params:", params);
  console.log("slug:", slug);
  console.log("DynamicPage data:", data);

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
        return <Home content={content} meta={metaData}/>;
      default:
        return null;
    }
  };

  return (
    <>
      {renderPages()}
    </>
  );
}
