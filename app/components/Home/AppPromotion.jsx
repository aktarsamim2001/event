"use client";

import React, { useEffect } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-cards";

import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralSettings } from "../../store/slice/settings/generalSettingsSlice";
import { FaApple, FaGooglePlay } from "react-icons/fa6";

const AppPromotion = ({ appPromotion }) => {
  const { title, content, features = [], gallery = [] } = appPromotion || {};

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.generalSettings);
  const iosStoreLink = data?.ios_store_link;
  const androidStoreLink = data?.android_store_link;

  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  return (
    <div className="__container __responsive_gap">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Swiper / Mobile Preview */}
        <div className="lg:w-1/2 relative">
          <div className="relative mx-auto w-[280px] md:w-[320px]">
            <div className="absolute inset-0 __gradient rounded-[40px] blur-xl opacity-20 transform -rotate-6"></div>
            <div className="relative bg-white rounded-[36px] p-3 shadow-2xl transform border-8 border-gray-800">
              <div className="rounded-[24px] overflow-hidden h-[520px] bg-gray-100 relative">
                <Swiper
                  effect="card"
                  grabCursor
                  modules={[Autoplay, EffectCards]}
                  speed={1000}
                  loop
                  autoplay={{ delay: 3000 }}
                  className="h-full w-full"
                >
                  {gallery.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="h-full relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover h-full w-full"
                          priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm p-3.5">
                          <h4 className="text-white font-semibold __heading">{item.title}</h4>
                          <p className="text-white/80 text-sm __text">{item.content}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="z-[300] absolute top-3 left-1/2 transform -translate-x-1/2 w-1/3 h-[18px] bg-black rounded-b-xl"></div>
            </div>

            <div className="absolute -top-6 -right-4 bg-white rounded-full shadow-lg p-3 animate-bounce">
              <FaStar className="fill-yellow-500 w-6 h-6" />
            </div>
            <div className="absolute -bottom-8 -left-5 md:-left-6 bg-white rounded-full shadow-lg p-3 animate-pulse">
              <CiCalendar className="text-blue-600 w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl text-white md:text-4xl font-bold __heading leading-tight mb-3">
            {title}
          </h2>
          <p className="text-white __text text-sm md:text-lg __heading_gap">{content}</p>

          <div className="grid md:grid-cols-2 gap-4 __heading_gap">
            {features.map((feature, index) => (
              <div className="flex items-start space-x-3" key={index}>
                <div className="bg-[#FFFFFF26] p-2 rounded-lg ">
                  <div
                    className="w-5 h-5"
                    style={{
                      WebkitMaskImage: `url(${feature.icon})`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      backgroundColor: "#FFE100",
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white __heading">{feature.title}</h4>
                  <p className="text-gray-300 text-sm __text">{feature.content}</p>
                </div>
              </div>
            ))}
          </div>

          {(iosStoreLink || androidStoreLink) && (
            <div className="mt-6">
              <p className="__heading text-white text-sm mb-3">Download Our App</p>
              <div className="flex flex-row gap-3">
                {iosStoreLink && (
                  <Link
                    href={iosStoreLink}
                    className="inline-flex items-center justify-center space-x-3 __primary_bg text-black px-6 py-2 rounded-lg"
                  >
                    <FaApple size={30} />
                    <div>
                      <div className="text-sm leading-tight __text">Download on the</div>
                      <div className="text-sm __heading">App Store</div>
                    </div>
                  </Link>
                )}
                {androidStoreLink && (
                  <Link
                    href={androidStoreLink}
                    className="inline-flex items-center justify-center space-x-3 __primary_bg text-black px-6 py-2 rounded-lg"
                  >
                    <FaGooglePlay size={30} />
                    <div>
                      <div className="text-sm __text leading-tight">Get It on</div>
                      <div className="text-sm __heading">Google Play</div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;
