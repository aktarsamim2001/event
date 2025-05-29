"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { FaCalendar, FaClock } from "react-icons/fa6";

export default function DatesTickets() {
  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const ticketData = eventDetails?.ticket_section;
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (
      ticketData &&
      ticketData.length > 0 &&
      ticketData[0].ticket_categories.length > 0
    ) {
      setSelectedCategory(ticketData[0].ticket_categories[0]);
    }
  }, [ticketData]);

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

  // Early return if no data is available
  if (!ticketData || ticketData.length === 0) {
    return (
      <div className="text-white text-center py-8">
        No ticket information available
      </div>
    );
  }

  const eventInfo = ticketData[0];

  return (
    <section>
      {/* Single Date Display */}
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        className="w-full mb-6"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide className="flex-1 flex justify-center shrink w-full">
          <Button varient={"fill"} className="!px-6 !py-2 text-center">
            <div className="text-sm font-medium">
              {formatDate(eventInfo.event_date).split(",")[0]},{" "}
              {formatDate(eventInfo.event_date).split(",")[1]} –{" "}
              {formatTime(eventInfo.event_start_time)}
            </div>
          </Button>
        </SwiperSlide>
      </Swiper>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white __heading">
          {eventInfo.event_name}
        </h3>
        <div className="text-white mt-3 __text flex flex-col items-start justify-start gap-2">
          <p className="flex items-center gap-3">
            <FaCalendar className="__accent_color" />
            <span>{formatDate(eventInfo.event_date)}</span>
          </p>
          <p className="flex items-center gap-3">
            <FaClock className="__accent_color" />
            <span>
              {formatTime(eventInfo.event_start_time)} to{" "}
              {formatTime(eventInfo.event_end_time)}
            </span>
          </p>
        </div>
      </div>

      {/* Ticket Category Selection */}
      <div className="space-y-4">
        {eventInfo.ticket_categories.map((category) => (
          <div
            key={category.event_date_wise_ticket_category_id}
            className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer ${
              selectedCategory?.event_date_wise_ticket_category_id === category.event_date_wise_ticket_category_id
                ? "border-[#6e4938] bg-white/5"
                : "border-[#6e4938]"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <div className="flex items-start gap-3">
              <div className="relative w-5 h-5 mt-0.5">
                <input
                  type="radio"
                  id={`category-${category.event_date_wise_ticket_category_id}`}
                  name="ticketCategory"
                  value={category.event_date_wise_ticket_category_id}
                  checked={selectedCategory?.event_date_wise_ticket_category_id === category.event_date_wise_ticket_category_id}
                  onChange={() => setSelectedCategory(category)}
                  className="radio_btn_color absolute opacity-0 w-5 h-5 cursor-pointer"
                />
                <div
                  className={`w-5 h-5 rounded-full border ${
                    selectedCategory?.event_date_wise_ticket_category_id === category.event_date_wise_ticket_category_id ? "__accent_color" : "border-[#6e4938]"
                  } flex items-center justify-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-150 absolute top-1 left-1 ${
                      selectedCategory?.event_date_wise_ticket_category_id === category.event_date_wise_ticket_category_id ? "__accent_bg" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              </div>
              <div>
                <label
                  htmlFor={`category-${category.event_date_wise_ticket_category_id}`}
                  className={`text-base font-medium cursor-pointer __heading ${
                    selectedCategory?.event_date_wise_ticket_category_id === category.event_date_wise_ticket_category_id
                      ? "__accent_color"
                      : "text-white"
                  }`}
                >
                  {category.title}
                </label>
                <p className="text-sm text-white mt-1 max-w-[400px] __text">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-white __heading flex items-center gap-0.5">
                <div className="__accent_color"> {eventInfo?.ticket_categories[0]?.types[0]?.currency?.currency}</div>
                <div>{category.lowest_price?.toFixed(2)}</div>
              </div>
              <p className="text-sm text-white __text">onwards</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Types Display (not selectable) */}
      {selectedCategory &&
        selectedCategory.types &&
        selectedCategory.types.length > 0 && (
          <div className="pt-4 border-t border-[#6e4938] mt-4">
            <h4 className="font-medium text-xl mb-3 text-white __heading">
              Tickets Type
            </h4>
            <div className="space-y-3">
              {selectedCategory.types.map((type) => (
                <div
                  key={type.event_date_ticket_category_wise_types_id}
                  className="flex items-center justify-between rounded-lg p-3 border border-[#6e4938]"
                >
                  <label className="text-white __text">{type.name}</label>
                  <div className="font-bold text-white __heading flex items-center gap-0.5">
                    <div className="__accent_color">{eventInfo?.ticket_categories[0]?.types[0]?.currency?.currency}</div>
                    <div>{type.price?.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* <div className="flex items-center justify-center mt-6">
        <Button varient={"fill"}>Book Tickets</Button>
      </div> */}
    </section>
  );
}