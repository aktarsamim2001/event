"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

export default function YouMayLikeEvents() {
  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const youMayLikeEvents = eventDetails?.related_events;

  if (!youMayLikeEvents || youMayLikeEvents.length === 0) return null;

  return (
    <div>
      <div>
        <div className="grid grid-cols-[auto_95px] justify-between items-center sm:items-center">
          <h2 className="text-[18px] md:text-[25px] font-bold text-white leading-tight __heading mb-4">
            You May Like
          </h2>
          <div className="flex justify-end items-center mt-4 sm:mt-0">
            <Button
              variant={"outline"}
              className="!py-1.5 !px-3 mr-3 nearby_event_next"
            >
              <FaArrowLeft />
            </Button>
            <Button variant={"outline"} className="!py-1.5 !px-3 nearby_event_prev">
              <FaArrowRight />
            </Button>
          </div>
        </div>
        <div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={18}
            slidesPerView={1}
            speed={1000}
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
            {youMayLikeEvents?.map((event) => {
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

              // Format price to 2 decimal places
              const formattedPrice = Number(event?.min_price).toFixed(2);

              return (
                <SwiperSlide key={event.id}>
                  <Link href={`/event-details/${event.slug}`}>
                    <div className="relative overflow-hidden rounded-[25px] text-white">
                      <img
                        src={event?.feature_image}
                        alt="trending event banner"
                        className="block w-full object-cover h-[300px] -mt-1"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-4 backdrop-blur-xl grid grid-cols-[auto_100px] justify-between items-start rounded-[15px] bg-[#e0dddd00] gap-x-2">
                        <div className="w-full">
                          <div className="__heading text-[20px] font-bold line-clamp-1 text-white">
                            {event?.title}
                          </div>
                          <div className="flex items-center pr-2">
                            <p className="line-clamp-1 text-white __text">
                              {event?.city_detail?.name},{" "}
                              <span>{event?.state_detail?.name}</span>{" "}
                            </p>
                            <span className="text-[#6e4938] mx-1">~</span>{" "}
                            <div className="flex items-center gap-0.5 text-white __text">
                              <span>{event?.currency_detail?.currency}</span>
                              {formattedPrice}
                            </div>
                          </div>
                        </div>
                        <div className="text-center backdrop-blur-sm text-[12px] rounded-[10px] overflow-hidden">
                          <div className="__text backdrop-blur-md bg-[#f1eded34] p-1 px-2 text-nowrap text-white">
                            {formattedDate}
                          </div>
                          <div className="text-white p-1 text-nowrap bg-[#d0cbcb1e] __text">
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
    </div>
  );
}