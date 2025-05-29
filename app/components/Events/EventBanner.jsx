"use client";

import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import Link from "next/link";

const EventBanner = ({ posters }) => {
  return (
    <div className="relative pt-5">
      <Swiper
        loop={true}
        modules={[Navigation, Mousewheel, Pagination]}
        navigation={{
          nextEl: ".event_banner_next",
          prevEl: ".event_banner_prev",
        }}
        speed={1000}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={25}
        mousewheel={{ forceToAxis: true }}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
          },
        }}
      >
        {posters?.map((item) => (
          <SwiperSlide key={item.id || item.image}>
            <Link href={item.redirection_url}>
              <div className="h-[230px] sm:h-[300px]">
                <img
                  src={item.image}
                  className="block h-full w-full object-cover"
                  alt={item.title || `Event banner for ${item.redirection_url}`}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="event_banner_prev"
        aria-label="Previous slide"
      >
        <IoChevronBackOutline />
      </button>
      <button
        type="button"
        className="event_banner_next"
        aria-label="Next slide"
      >
        <IoChevronForward />
      </button>
    </div>
  );
};

export default EventBanner;
