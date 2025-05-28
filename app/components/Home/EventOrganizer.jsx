"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FaLocationDot } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/effect-fade";
import Button from "../ui/Button";
import Link from "next/link";
import Image from "next/image";

const EventOrganizer = ({ hostData, featuresData }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const eventHostsLogos = hostData?.logos || [];
  const eventFeatures = featuresData || [];

  return (
    <div className="__responsive_gap">
      <div className="__container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Section: Event Hosts */}
          <div className="lg:col-span-8 space-y-6">
            <h2
              className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap"
              dangerouslySetInnerHTML={{ __html: hostData?.title || "Our Event Hosts" }}
            />
            {isMobile ? (
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={3}
                className="rounded-xl"
              >
                {eventHostsLogos.map((image, index) => (
                  <SwiperSlide key={index} className="flex justify-center items-center">
                    <Image
                      src={image}
                      alt={`Event Host ${index + 1}`}
                      width={160}
                      height={160}
                      className="w-40 h-40 object-contain rounded-full shadow-lg"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {eventHostsLogos.map((image, index) => (
                  <div key={index} className="flex justify-center items-center border h-full">
                    <Image
                      src={image}
                      alt={`Event Host ${index + 1}`}
                      width={100}
                      height={100}
                      className="event_organizer_logo h-[100px]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
            <Link href={hostData?.button_url || "#"} target="_blank" className="flex justify-center pt-10">
              <Button variant="fill" className="!text-[14px] sm:!text-[16px]">
                {hostData?.button || "Learn More"}
              </Button>
            </Link>
          </div>

          {/* Right Section: Featured Events */}
          <div className="lg:col-span-4">
            <div className="__gradient backdrop-blur-xl rounded-2xl px-1 py-1">
              <h3 className="text-xl font-semibold text-white __heading px-1 py-2">
                Featured Events
              </h3>
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                className="rounded-xl [&_.swiper-slide]:rounded-xl"
              >
                {eventFeatures.map((ad) => {
                  const showDetails = Math.random() > 0.3;
                  return (
                    <SwiperSlide key={ad.id}>
                      <Link href={`/event-details/${ad.slug}`}>
                        <div className="rounded-xl overflow-hidden relative">
                          <Image
                            src={ad.feature_image}
                            alt={ad.title}
                            width={600}
                            height={370}
                            className="w-full h-[370px] object-cover"
                            loading="lazy"
                          />
                          {showDetails && (
                            <div className="absolute bottom-0 p-3 bg-black/50 backdrop-blur-sm w-full">
                              <div className="grid grid-cols-2 gap-4 items-start">
                                <div className="space-y-2.5">
                                  <h4 className="text-xl font-bold text-white __heading">
                                    {ad.title}
                                  </h4>
                                  <div className="flex items-center gap-1 text-gray-300">
                                    <FaLocationDot className="w-4 h-4 __accent_color" />
                                    <p className="text-sm __text">
                                      {ad.city_detail?.name}, {ad.state_detail?.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-2.5 text-right">
                                  <p className="text-white text-sm">
                                    <span className="text-[18px] font-semibold __text">Host</span>{" "}
                                    <span className="__accent_color __text">{ad?.user_detail?.name}</span>
                                  </p>
                                  <Button
                                    variant="fill"
                                    className="!py-1 bg-primary-600 text-white rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      window.open(`/event-details/${ad.slug}`, "_blank");
                                    }}
                                  >
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizer;