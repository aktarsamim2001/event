"use client";

import React from "react";
import { CiCalendar } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Button = ({ children, variant, className, ...props }) => {
  const baseStyles = "px-3 py-1.5 rounded-md";
  const outlineStyles = "border border-[#ffffff26] text-white hover:bg-[#ffffff26]";
  const styles = `${baseStyles} ${variant === "outline" ? outlineStyles : ""} ${className || ""}`;
  return <button className={styles} {...props}>{children}</button>;
};

export default function OthersEvent() {
  const eventDetails = useSelector((state) => state.eventDetails?.data);

  return (
    <div>
      {/* Section Header */}
      <div className="grid grid-cols-[auto_95px] justify-between items-center">
        <h2 className="text-[18px] md:text-[25px] font-bold text-white leading-tight mb-4">
          Other Events
        </h2>
        <div className="flex justify-end items-center mb-2.5">
          <Button
            variant="outline"
            className="!py-1.5 !px-3 mr-3 nearby_event_next"
          >
            <FaArrowLeft />
          </Button>
          <Button
            variant="outline"
            className="!py-1.5 !px-3 nearby_event_prev"
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>

      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1280: { slidesPerView: 2 },
          }}
          navigation={{
            nextEl: ".nearby_event_prev",
            prevEl: ".nearby_event_next",
          }}
        >
          {eventDetails?.other_events?.map((event) => {
            // Format date
            const eventDate = new Date(event?.max_event_date);
            const formattedDate = eventDate.toLocaleDateString("en-IN", {
              month: "long",
              day: "numeric",
            });

            // Format time
            const eventTime = new Date(`1970-01-01T${event?.event_end_time}`);
            const formattedTime = eventTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            const formattedPrice = Number(event?.event_min_price).toFixed(2);

            return (
              <SwiperSlide key={event.id}>
                <Link href={`/event-details/${event.slug}`}>
                  <div className="relative overflow-hidden rounded-[25px] text-white">
                    <img
                      src={event?.feature_image}
                      alt="trending event banner"
                      className="block w-full object-cover h-[300px] -mt-1"
                    />
                    <div className="absolute top-3 right-3 text-center backdrop-blur-sm text-[14px] rounded-[10px] overflow-hidden">
                      <div className="backdrop-blur-md bg-[#302d2d34] p-1.5 px-3.5 font-semibold text-nowrap text-white">
                        Upcoming
                      </div>
                    </div>
                    <div className="absolute bg-black/35 bottom-0 left-0 w-full p-4 backdrop-blur-md grid grid-cols-[auto_100px] justify-between items-start rounded-[15px] gap-x-2">
                      <div className="w-full">
                        <div className="text-[20px] font-bold line-clamp-1 text-white">
                          {event?.title}
                        </div>
                        <div className="flex items-center pr-2">
                          <p className="line-clamp-1 text-white">
                            {event?.city_detail?.name},{" "}
                            <span>{event?.state_detail?.name}</span>{" "}
                          </p>
                          <span className="text-[#6e4938] mx-1">~</span>{" "}
                          <div className="flex items-center gap-0.5 text-white">
                            <span>{event?.currency_detail?.currency}</span>
                            {formattedPrice}
                          </div>
                        </div>
                      </div>
                      <div className="text-center backdrop-blur-sm text-[12px] rounded-[10px] overflow-hidden">
                        <div className="backdrop-blur-md bg-[#f1eded34] p-1 px-2 text-nowrap text-white">
                          {formattedDate}
                        </div>
                        <div className="text-white p-1 text-nowrap bg-[#d0cbcb1e]">
                          {formattedTime}
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
}