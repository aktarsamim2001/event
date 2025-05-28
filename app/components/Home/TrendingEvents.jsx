"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const TrendingEvents = ({ hostData }) => {
  const router = useRouter();

  if (!hostData?.visibility || hostData.visibility !== "1") return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleViewAll = () => {
    const formattedData = {
      sort: "",
      event_type: "trending-event",
      area: "",
      ticket_type: "",
      sub_category: "",
      event_category_id: "all-events",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("filterFormValues", JSON.stringify(formattedData));
      const newParams = new URLSearchParams();
      Object.entries(formattedData).forEach(([key, value]) => {
        if (value) newParams.set(key, value);
      });
      router.push(`/events?${newParams.toString()}`);
    }
  };

  return (
    <div className="__container __responsive_gap">
      <div className="grid grid-cols-[auto_95px] justify-between items-end sm:items-center __heading_gap">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading">
          {hostData?.title || "Trending Events"}
        </h2>
        <button
          onClick={handleViewAll}
          className="border border-re-600 __view_all cursor-pointer"
        >
          <span className="flex items-center gap-x-2 text-white __view_all_btn">
            View All <FaArrowRight />
          </span>
        </button>
      </div>

      <div className="mt-6">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={18}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1000}
          loop={hostData?.events?.length > 1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: ".trending_event_prev",
            nextEl: ".trending_event_next",
          }}
        >
          {hostData?.events?.length ? (
            hostData.events.map((event) => {
              const [date, timeWithMs] = event.published_at?.split("T") || [];
              const time = timeWithMs?.split(".")[0];
              const formattedDate = date ? formatDate(date) : "N/A";
              const formattedTime = time ? formatTime(time) : "N/A";

              return (
                <SwiperSlide key={event.id}>
                  <Link href={`/event-details/${event.slug || ""}`} target="_blank">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src={event.feature_image || "/fallback-image.jpg"}
                        alt={event.title || "Event"}
                        width={500}
                        height={200}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4 __gradient backdrop-blur-sm">
                        <h4 className="text-[20px] line-clamp-1 text-white __heading">
                          {event.title || "Untitled Event"}
                        </h4>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-white text-sm flex items-center gap-2 __text">
                            <CiCalendar size={18} className="__accent_color" />
                            {formattedDate} <span className="__accent_color">•</span> {formattedTime}
                          </p>
                        </div>
                        <div className="text-white text-sm flex items-center gap-2 __text mt-3">
                          <div className="flex -space-x-3">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="h-8 w-8 rounded-full border-[3px] border-white bg-gradient-to-br from-purple-400 to-pink-500"
                              />
                            ))}
                          </div>
                          <p>
                            <span className="__accent_color font-bold">2.5k</span> trusted users
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="w-full text-center text-white py-10 text-xl font-semibold">
              No trending events available
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingEvents;