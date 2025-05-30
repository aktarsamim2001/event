import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight } from "react-icons/fa6";


const UpcomingEvents = ({ event }) => {
  const isVisible = event?.visibility === "1";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleViewAll = () => {
    const formattedData = {
      sort: "",
      event_type: "upcoming-event",
      area: "",
      ticket_type: "",
      sub_category: "",
      event_category_id: "all-events",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("filterFormValues", JSON.stringify(formattedData));
      const newParams = new URLSearchParams();
      for (let key in formattedData) {
        if (formattedData[key]) newParams.set(key, formattedData[key]);
      }
      window.location.href = `/events?${newParams.toString()}`;
    }
  };

  return (
    <>
      {isVisible && event?.upcoming_event?.length > 0 && (
        <div className="__responsive_gap __container">
          <div className="grid grid-cols-[auto_95px] justify-between items-center sm:items-center __heading_gap">
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading">
              {event.title}
            </h2>
            <button
              onClick={handleViewAll}
              className="border border-re-600 __view_all cursor-pointer"
            >
              <span className="flex items-center gap-x-2 text-white __view_all_btn">
                View All <FaArrowRight />
              </span>
            </button>
          </div>
          <div>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={18}
              slidesPerView={1}
              speed={1000}
              autoplay={event?.upcoming_event?.length > 1 ? { delay: 5000, disableOnInteraction: false } : false}
              loop={event?.upcoming_event?.length > 1 && event?.upcoming_event?.length > 3}
              observer={true}
              observeParents={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
            >
              {event?.upcoming_event.map((event) => {
                const formattedEventDate = formatDate(event.max_event_date);
                const formattedEventTime = formatTime(event.event_end_time);
                return (
                  <SwiperSlide key={event.id}>
                    <div
                      className="relative overflow-hidden rounded-2xl text-white h-80 cursor-pointer"
                      onClick={() => window.open(`/event-details/${event.slug}`, '_blank')}
                    >
                      <img
                        src={event.feature_image}
                        alt={event.title}
                        className="block w-full object-cover h-full"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-4 backdrop-blur-xl grid grid-cols-[auto_100px] justify-between items-start rounded-lg bg-black/30 gap-x-2">
                        <div className="w-full">
                          <div className="__heading text-lg font-semibold line-clamp-1">
                            {event.title}
                          </div>
                          <div className="flex items-center pr-2 text-sm">
                            <div className="line-clamp-1">
                              {event.city_detail.name},{" "}
                              {event.state_detail.name}
                            </div>
                            <div className="__accent_color mx-1">~</div>
                            <div className="flex items-center gap-0.5">
                              <div>{event.currency_detail.currency}</div>
                              <div>
                                {Number(event.event_min_price).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center backdrop-blur-sm text-xs rounded-lg overflow-hidden">
                          <div className="__text backdrop-blur-md bg-white/20 p-1 px-2 text-nowrap">
                            {formattedEventDate.split(",")[0]}
                          </div>
                          <div className="__text p-1 text-nowrap bg-white/10">
                            {formattedEventTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;
