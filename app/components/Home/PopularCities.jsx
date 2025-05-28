"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

const PopularCities = ({ citiesData }) => {
  if (!citiesData?.visibility || citiesData.visibility !== "1") return null;

  return (
    <div className="__container __responsive_gap w-full">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center __heading_gap">
        <div className="w-full">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
            {citiesData?.title || "Popular Cities"}
          </h2>
          <p className="text-md text-gray-300 line-clamp-2 md:line-clamp-1 __text">
            {citiesData?.content || "Explore events in top cities"}
          </p>
        </div>
        <div className="hidden md:flex items-center mt-4 sm:mt-0 gap-3">
          <Button variant="outline" className="!py-2 !px-4 popular_prev">
            <FaArrowLeft />
          </Button>
          <Button variant="outline" className="!py-2 !px-4 popular_next">
            <FaArrowRight />
          </Button>
        </div>
      </div>

      <div className="w-full px-0">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={citiesData?.popular_cities?.length > 1}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".popular_prev",
            nextEl: ".popular_next",
          }}
          className="pb-8 w-full"
        >
          {citiesData?.popular_cities?.length ? (
            citiesData.popular_cities.map((city) => (
              <SwiperSlide key={city.id} className="w-full flex justify-center">
                <Link href={`/explore/${city?.city_slug || ""}`} className="w-full flex justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden shadow-xl border-4 border-white">
                      <Image
                        src={city?.city_image || "/fallback-image.jpg"}
                        alt={city?.city_name || "City"}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex justify-center group">
                      <p className="mt-3 inline-block px-5 text-lg md:text-xl font-semibold text-white cursor-pointer relative whitespace-nowrap text-center">
                        {city?.city_name || "Unknown City"}
                        <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] __primary_bg transition-all duration-300" />
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <div className="w-full text-center text-white py-10 text-xl font-semibold">
              No cities available
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCities;