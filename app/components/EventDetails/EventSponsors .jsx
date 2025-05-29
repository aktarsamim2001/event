"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ShareModal from "./ShareModal";
import Button from "../ui/Button";
import Link from "next/link";

export default function EventSponsors() {
  const [mounted, setMounted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Add proper type to useSelector
  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const sponsors = eventDetails?.event_sponsors;
  const ticketData = eventDetails?.event?.event_dates[0];

  // Format event time for display
  function formatTime(timeString) {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }

  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const year = date.getFullYear();
    return `${day}, ${monthDate} ${year}`;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="__gradient rounded-xl shadow-md p-4 md:p-6 space-y-6">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16">
          <img
            src={
              eventDetails?.hostUser?.host_user_details?.business_logo ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="User"
            className=" object-cover w-full h-full rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="flex items-center gap-1.5 px-4 py-1 text-[15px] border border-[#FFE100]/40 rounded-full">
              <FaCrown className="__accent_color" />
              <span className="text-white">Premium</span>
            </p>
          </div>
          <p className="text-lg font-bold mt-1 text-white __heading">
            Hosted by {eventDetails?.hostUser?.name}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center space-y-4 pt-4 border-t border-[#FFE100]/40">
        <div className="flex items-center gap-3 __accent_color">
          <FaCalendar size={22} />
          <div>
            <p className="font-medium text-white __heading">
              {formatDate(ticketData?.event_date)}
            </p>
            <p className="text-sm text-white __text">
              {formatTime(ticketData?.event_start_time)} to{" "}
              {formatTime(ticketData?.event_end_time)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 __accent_color">
          <FaLocationDot size={22} />
          <div>
            <p className="font-medium text-white __heading">
              {eventDetails?.hostUser?.host_user_details?.organization}
            </p>
            <p className="text-sm text-white __text">
              {eventDetails?.hostUser?.host_user_details?.formated_addresss}
            </p>
          </div>
        </div>
      </div>
      {mounted && sponsors && sponsors.length > 0 && (
        <div className="pt-4 border-t border-[#FFE100]/40">
          <h3 className="font-medium mb-3 text-white">Sponsors</h3>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full h-full"
          >
            {sponsors.map((sponsor) => (
              <SwiperSlide key={sponsor.id}>
                <Link
                  to={sponsor.redirection_url}
                  className="flex items-center justify-center h-full"
                >
                  <div className="relative w-full h-[200px] bg-gray-100 rounded-2xl overflow-hidden">
                    <img
                      src={sponsor.sponsor_banner}
                      alt={sponsor.company}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="pt-4 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-between gap-1.5 border-t border-[#FFE100]/40">
        <Button varient={"fill"} className="w-full !py-2 !px-1.5">
          Request to Join
        </Button>
        <Button
          varient={"outline"}
          className="w-full flex items-center justify-center gap-5 !py-2 !px-1"
          onClick={() => setShowShareModal(true)}
        >
          <IoShareSocialSharp size={25} />
          <span>Share</span>
        </Button>
      </div>
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share this Event"
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </div>
  );
}
