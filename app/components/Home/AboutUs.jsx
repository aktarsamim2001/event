'use client';

import React from 'react';
import Button from '../ui/Button';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { IoChevronForward, IoChevronBackOutline } from 'react-icons/io5';
import Image from 'next/image';

const AboutUs = ({ className, data }) => {
  return (
    <>
      <section className={`${className}`}>
        <div className="grid gap-y-6 lg:gap-x-8 grid-cols-1 lg:grid-cols-[55%_auto] items-start">
          <div className="rounded-[10px] [box-shadow:0_0_10px_3px_#534f4f] overflow-hidden relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              speed={1000}
              // autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="max-h-[600px]"
              navigation={{ nextEl: '.about_next', prevEl: '.about_prev' }}
            >
              {data[0]?.sliders?.map((item, _id) => (
                <SwiperSlide key={_id}>
                  <div className="bg-black about_swiper_img relative min-h-[350px] md:min-h-[500px]">
                    <Image
                      src={item?.image}
                      alt="about rally-up swiper"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="block w-full h-full object-cover"
                      priority={_id === 0}
                    />
                    <div className="flex justify-center items-center">
                      <Button
                        className="absolute left-auto right-auto bottom-5 md:bottom-8 z-100 block object-cover !px-4 !py-2 rounded-full text-sm md:text-lg"
                        variant="fill"
                      >
                        <Link href={item?.button_url}>{item?.button}</Link>
                      </Button>
                    </div>
                    <div className="about_swiper_overlay"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button type="button" className="about_prev">
              <IoChevronBackOutline />
            </button>
            <button type="button" className="about_next">
              <IoChevronForward />
            </button>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-white font-semibold __text">
                {data[0]?.Title}
              </h3>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
                {data[0]?.sub_title}
              </h1>
              <div
                className="text-white text-sm md:text-lg __text"
                dangerouslySetInnerHTML={{ __html: data[0]?.content }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
