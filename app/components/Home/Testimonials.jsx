"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { IoStar } from "react-icons/io5";
import Image from "next/image";

const Testimonials = ({ testimonialsData, className = "" }) => {
  const { Title, details } = testimonialsData || {};

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <IoStar
        key={i}
        className={`text-[16px] ${i < count ? "__accent_color" : "text-gray-500"}`}
      />
    ));
  };

  return (
    <section id="testimonials">
      <div className={`${className} __responsive_gap`}>
        <div className="text-left __heading">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
            {Title || "What Our Users Say"}
          </h2>
        </div>

        <div className="mt-6">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            speed={1000}
            loop={details?.length > 1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="!px-[10px]"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
          >
            {details?.length ? (
              details.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="__Tgradient p-[25px] md:p-[35px] rounded-[10px] shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-[10px] items-center">
                        <Image
                          src={item.image || "/fallback-image.jpg"}
                          alt={item.name || "User"}
                          width={100}
                          height={100}
                          className="w-[100px] h-[100px] rounded-[7px] object-cover"
                          loading="lazy"
                        />
                        <div>
                          <div className="text-[20px] text-white [letter-spacing:1px] __heading">
                            {item.name || "Anonymous"}
                          </div>
                          <div className="text-[13px] text-white __text">
                            {item.designation || "User"}
                          </div>
                          <div className="flex gap-x-1 mt-3">
                            {renderStars(parseInt(item.ratings || 0))}
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/quote.png"
                        alt="Quote"
                        width={40}
                        height={40}
                        className="w-[40px] lg:w-[120px] object-contain rotate-180"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-white text-sm md:text-lg leading-7 mt-3 __text">
                      {item.content || "No review provided."}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="w-full text-center text-white py-10 text-xl font-semibold">
                No testimonials available
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;