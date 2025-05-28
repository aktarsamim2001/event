"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EventGoersGallery = ({ className }) => {
  const router = useRouter();
  const data = useSelector((state) => state.dynamicPage);
  const eventCategories = data?.data?.content?.event_goers_page?.event_category || [];

  useEffect(() => {
    const noop = () => {};
    window.addEventListener("scroll", noop, { passive: true });
    return () => {
      window.removeEventListener("scroll", noop);
    };
  }, []);

  const handleViewAll = (eventCategory) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("filterFormValues");

      const formattedData = {
        event_category_id: eventCategory || "",
        sort: "",
        area: "",
        ticket_type: "",
        sub_category: "",
      };

      localStorage.setItem("filterFormValues", JSON.stringify(formattedData));

      const newParams = new URLSearchParams();
      Object.keys(formattedData).forEach((key) => {
        if (formattedData[key]) {
          newParams.append(key, formattedData[key]);
        }
      });

      router.push(`/events?${newParams.toString()}`);
    }
  };

  return (
    <div className={className}>
      <div className="gallery_grid will-change-transform">
        {eventCategories.map((item) => (
          <div
            key={item.id}
            onClick={() => handleViewAll(item.id)}
            className="Gmain_backdrop relative cursor-pointer overflow-hidden transform transition-transform duration-300"
          >
            <Image
              src={item?.backgorund_image}
              alt={item?.title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300"
            />
            <div className="absolute left-0 bottom-0 w-full px-2.5 py-3 bg-black/70 backdrop-blur-sm">
              <div className="text-lg md:text-xl lg:text-2xl truncate font-semibold __heading text-white">
                {item?.title}
              </div>
            </div>
            <div className="absolute top-1.5 __heading right-2.5 bg-black/80 backdrop-blur-sm rounded px-2 py-1 gallery_event font-medium">
              <h2 className="text-sm text-white">
                {item?.event_count || 0} {item?.event_count > 1 ? "Events" : "Event"}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGoersGallery;
