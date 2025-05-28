"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";

const LiveEvent = ({ hostData }) => {
  const router = useRouter();

  if (!hostData?.visibility || hostData.visibility !== "1") {
    return null;
  }

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
      Object.entries(formattedData).forEach(([key, value]) => {
        if (value) newParams.append(key, value);
      });
      router.push(`/events?${newParams.toString()}`);
    }
  };

  return (
    <div className="__container __responsive_gap w-full">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center __heading_gap">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading">
          {hostData?.title || "Live Events"}
        </h2>
        <div className="hidden md:flex justify-end items-center mt-4 sm:mt-0 gap-3">
          <Button variant="outline" className="!py-2 !px-4 live_event_prev">
            <FaArrowLeft />
          </Button>
          <Button variant="outline" className="!py-2 !px-4 live_event_next">
            <FaArrowRight />
          </Button>
        </div>
      </div>

      <div className="w-full px-0">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={hostData?.event_categories?.length > 1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".live_event_prev",
            nextEl: ".live_event_next",
          }}
          className="w-full"
        >
          {!hostData?.event_categories?.length ? (
            <div className="w-full text-center text-white py-10 text-xl font-semibold">
              No events available
            </div>
          ) : (
            hostData.event_categories.map((event) => (
              <SwiperSlide key={event.id} className="w-full">
                <button
                  onClick={() => handleViewAll(event.id)}
                  className="w-full"
                >
                  <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-95 duration-300 transition-all ease-in-out">
                    <Image
                      src={event?.image || "/fallback-image.jpg"}
                      alt={event?.title || "Event"}
                      fill
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute top-0 left-0 p-3 space-y-5 text-white text-left">
                      <h3 className="text-2xl font-bold __heading">
                        {event?.title}
                      </h3>
                      <h3 className="text-lg font-semibold __text">
                        {event?.event_count > 0
                          ? `${event.event_count}+ Events`
                          : "No events listed"}
                      </h3>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default LiveEvent;