"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import Image from "next/image";

const BannerSection = ({ bannerData }) => {
  const router = useRouter();

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const images = Array.isArray(bannerData?.images) ? bannerData.images : [];
  const fieldValues =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("filterFormValues"))
      : {};

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: false,
  });

  const onSubmit = (data) => {
    const searchValue = (data.search || "").trim();

    if (!searchValue) {
      if (typeof window !== "undefined") localStorage.removeItem("filterFormValues");
      router.push("/events");
      return;
    }

    const formattedData = {
      ...fieldValues,
      ...data,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "filterFormValues",
        JSON.stringify({
          ...formattedData,
          date_from: "",
          date_to: "",
          event_category_id: "all-events",
          sort: "",
          area: "",
          event_type: "",
          ticket: "",
          sub_category: "",
        })
      );
    }

    const newParams = new URLSearchParams();
    for (const key in formattedData) {
      if (formattedData[key]) newParams.set(key, formattedData[key]);
    }
    router.push(`/events?${newParams.toString()}`);
  };

  return (
    <div className="relative __gradient overflow-hidden">
      {bannerData?.background && (
        <Image
          src={bannerData.background}
          alt="background preview"
          fill
          className="w-full h-full object-cover absolute"
          priority
        />
      )}
      <div className="relative z-10 mx-auto py-10 backdrop-blur-[5px] bg-[#07070760]">
        <div className="__container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5 md:space-y-8">
            <h1
              className="text-[30px] md:text-5xl __heading leading-tight text-white block"
              dangerouslySetInnerHTML={{ __html: bannerData?.title }}
            />

            <div className="bg-black/20 backdrop-blur rounded-lg p-3 md:p-4 inline-block">
              <p className="__accent_color text-lg font-semibold">
                {bannerData?.content || "100+ events happening this month"}
              </p>
            </div>

            <div className="relative pt-10 md:pt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("search")}
                  type="text"
                  placeholder={bannerData?.search_input_text}
                  className="w-full px-4 placeholder:ml-32.5 md:px-5 md:py-3.5 py-3 text-white placeholder:text-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-__primaryColor"
                />
                <Button
                  variant="fill"
                  type="submit"
                  className="absolute right-1 top-4 md:right-1.5 md:top-1/2 translate-y-2/3 md:-translate-y-1/2 !px-4.5 md:!py- md:!px-6 !py-2 rounded-full transition-colors flex items-center gap-2"
                >
                  Explore
                  <FaArrowUpRightFromSquare size={18} />
                </Button>
              </form>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-500"
                  />
                ))}
              </div>
              <p
                className="text-white __text"
                dangerouslySetInnerHTML={{
                  __html: bannerData?.trusted_user_text,
                }}
              />
            </div>
          </div>

          <div className="md:h-[600px] sm:flex items-center relative md:pt-8 hidden">
            <Swiper
              direction={width < 640 ? "horizontal" : "vertical"}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              centeredSlides={width < 640 ? false : true}
              loop={true}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 1.4,
                },
              }}
              className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden" style={{ width: "auto", height: "auto" }}>
                    <Image
                      src={image}
                      alt={`Event ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="absolute hidden -right-7 top-1/2 -translate-y-1/2 md:flex flex-col gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperInstance?.slideToLoop(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${activeIndex === index
                    ? "bg-white scale-110 h-7"
                    : "__accent_bg"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div >
  );
};

export default BannerSection;
