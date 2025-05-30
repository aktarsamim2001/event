"use client";

import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const EventsNearBy = ({ nearbyData }) => {
  const router = useRouter();
  const data = useSelector((state) => state.eventFilterSlice.nearByEvents);

  const userLocation = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("userLocation"));
    } catch {
      return null;
    }
  }, []);

  if (!nearbyData?.visibility || nearbyData.visibility !== "1" || !data?.length) {
    return null;
  }

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

  const latitude = userLocation?.coords?.latitude;
  const longitude = userLocation?.coords?.longitude;

  const handleViewAll = (eventCategory) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("filterFormValues");
      const formattedData = {
        event_category_id: eventCategory || "",
        latitude: latitude || "",
        longitude: longitude || "",
        sort: "",
        area: "",
        ticket_type: "",
        sub_category: "",
      };
      localStorage.setItem("filterFormValues", JSON.stringify(formattedData));
      const newParams = new URLSearchParams();
      Object.entries(formattedData).forEach(([key, value]) => {
        if (value) newParams.append(key, value);
      });
      router.push(`/events?${newParams.toString()}`);
    }
  };

  return (
    <div className="__responsive_gap __container">
      <div className="grid grid-cols-[auto_95px] justify-between items-end sm:items-center __heading_gap">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading">
          {nearbyData?.title || "Events Near You"}
        </h2>
        <button
          onClick={() => handleViewAll(data.id)}
          className="border border-re-600 __view_all"
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
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={data.length > 3}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".nearby_event_next",
            prevEl: ".nearby_event_prev",
          }}
          className="py-4"
        >
          {data.map((event) => {
            const formattedEventDate = formatDate(event.max_event_date);
            const formattedEventTime = formatTime(event.event_end_time);

            return (
              <SwiperSlide key={event.id}>
                <Link href={`/event-details/${event.slug}`} target="_blank">
                  <div className="relative overflow-hidden rounded-2xl text-white h-80">
                    <Image
                      src={event.feature_image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 backdrop-blur-xl grid grid-cols-[auto_100px] justify-between items-start rounded-lg bg-black/30 gap-x-2">
                      <div className="w-full">
                        <div className="text-lg font-semibold line-clamp-1 __heading">
                          {event.title}
                        </div>
                        <div className="flex items-center pr-2 text-sm">
                          <div className="line-clamp-1">
                            {event.city_detail?.name}, {event.state_detail?.name}
                          </div>
                          <div className="__accent_color mx-1">~</div>
                          <div className="flex items-center gap-0.5">
                            <div>{event.currency_detail?.currency}</div>
                            <div>{Number(event.event_min_price).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center backdrop-blur-sm text-xs rounded-lg overflow-hidden">
                        <div className="backdrop-blur-md bg-white/20 p-1 px-2 text-nowrap __text">
                          {formattedEventDate.split(",")[0]}
                        </div>
                        <div className="p-1 text-nowrap bg-white/10 __text">
                          {formattedEventTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default EventsNearBy;