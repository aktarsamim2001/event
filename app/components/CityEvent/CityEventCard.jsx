"use client"; 

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { IoLocationOutline, IoFilterSharp } from "react-icons/io5";
import { CiViewList, CiGrid41 } from "react-icons/ci";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Button from "../ui/Button";
import { toggleEventState } from "../../store/slice/eventFilterSlice";
import { fetchEvents, setPage } from "../../store/slice/event/eventSlice";
import { getFilteredEvents } from "../../store/slice/eventFilter/eventFilterSlice";
import { useRouter } from "next/navigation";

const CityEventCard = ({
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  cta,
  isEventsVisible,
  isCtaVisible = true,
}) => {
  const dispatch = useDispatch();
  const param = useParams();
  const pathname = usePathname();
  const city_slug = param?.slug || "";
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentPage, totalPages, perPage } = useSelector(
    (state) => state.events.data
  );
  const eventData = useSelector(
    (state) => state.eventFilterSlice.filteredEvents
  );
  const eventPaginationInfo = useSelector(
    (state) => state.eventFilterSlice.eventPaginationInfo
  );
  const [viewMode, setViewMode] = useState("grid");
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [visibleEventsCount, setVisibleEventsCount] = useState(12);

  const filterColumn = width >= 1024 && width < 1280 ? 3 : 4;
  const bannerShow = width >= 1024 ? 8 : 4;

  // Fetch events when perPage or currentPage changes
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, perPage, currentPage]);

  useEffect(() => {
    const params = searchParams && typeof searchParams.entries === 'function'
      ? Object.fromEntries(searchParams.entries())
      : {};
    params.city_slug = city_slug;
    params.perPage = visibleEventsCount;
    dispatch(getFilteredEvents({ ...params }));
  }, [searchParams, city_slug, visibleEventsCount, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clean up query parameters when navigating away
  const handleNavigation = (to) => {
    window.location.href = to;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const params = Object.fromEntries(searchParams.entries());
      params.page = (currentPage - 1).toString();
      router.replace({
        pathname,
        query: params,
      });
      dispatch(setPage(currentPage - 1));
      dispatch(getFilteredEvents({
        ...params,
        city_slug,
        perPage: visibleEventsCount,
      }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const params = Object.fromEntries(searchParams.entries());
      params.page = (currentPage + 1).toString();
      router.replace({
        pathname,
        query: params,
      });
      dispatch(setPage(currentPage + 1));
      dispatch(getFilteredEvents({
        ...params,
        city_slug,
        perPage: visibleEventsCount,
      }));
    }
  };

  const handlePageClick = (page) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = page.toString();
    router.replace({
      pathname,
      query: params,
    });
    dispatch(setPage(page));
    dispatch(getFilteredEvents({
      ...params,
      city_slug,
      perPage: visibleEventsCount,
    }));
  };

  const shouldShowCta = (index) => {
    return cta && isCtaVisible && (index + 1) % bannerShow === 0;
  };

  function formatEventDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Helper to format price with two decimals
  function formatPrice(amount) {
    if (amount == null || isNaN(amount)) return "";
    return Number(amount).toFixed(2);
  }

  return (
    <div className="w-full __responsive_gap">
      {eventData.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 __heading_gap">
          <div className="flex items-end gap-x-2.5">
            <h2 className="text-[26px] font-bold __heading">
              {city_slug ? (
                <>
                  Events in{" "}
                  <span className="text-[#22F106]">
                    {eventData[0]?.city_detail?.name}
                  </span>
                </>
              ) : (
                "All Events"
              )}{" "}
              <span className="__text text-sm block sm:inline-block">
                (Showing {eventData.length} of {eventPaginationInfo.total || 0} Events)
              </span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 justify-between md:justify-normal">
            <Button
              variant="fill"
              className="!px-3 !py-2 !text-[14px] flex items-center gap-x-1.5 xl:hidden"
              onClick={() => dispatch(toggleEventState())}
            >
              <IoFilterSharp />
            </Button>
            <div className="inline-flex rounded-md shadow-md overflow-hidden">
              <Button
                className={`!px-2 !py-2 !text-white !rounded-[0] __primary_bg outline-none ${
                  viewMode === "grid" ? "event-btn2" : "event-btn"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <CiGrid41 className="text-[22px]" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                className={`!px-2 !py-2 !text-white !rounded-[0] __primary_bg outline-none ${
                  viewMode === "list" ? "event-btn2" : "event-btn"
                }`}
                onClick={() => setViewMode("list")}
              >
                <CiViewList className="text-[22px]" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {eventData.length === 0 && (
        <div className="py-12 text-center flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-400 mb-4" style={{width:50,height:50}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <p className="__text text-xl">
            No events found matching your search criteria.
          </p>
        </div>
      )}
      <div className={viewMode === "grid" ? `gap-5 ${className}` : "space-y-6"}>
        {viewMode === "grid" ? (
          <>
            {eventData.map((event, index) => (
              <div key={event.id} className="flex flex-col">
                <div className="overflow-hidden rounded-[16px] __gradient flex flex-col h-full">
                  <div className="relative h-[180px]">
                    <img
                      src={event.feature_image}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="px-4 py-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="__heading text-[20px] line-clamp-1">
                          {event.title}
                        </h1>
                        <p className="__text text-[14px] text-gray-300">
                          {event?.main_category?.title}
                        </p>
                      </div>
                      <div className="__text bg-[#FFFFFF26] text-[12px] px-2 py-1 rounded-md">
                        {formatEventDate(event?.max_event_date)}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm text-muted-foreground mt-3">
                      <IoLocationOutline className="text-[18px] __accent_color" />
                      <span className="__text">{`${
                        event.city_detail?.name || ""
                      }, ${event.state_detail?.name || ""}`}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 __text mt-3 flex-grow">
                      {event.short_description}
                    </p>
                    <div className="flex justify-between pt-3 items-center mt-auto">
                      <div className="font-medium __text flex items-center gap-0.5">
                        <div className="__accent_color">
                          {event?.currency_detail?.currency}
                        </div>
                        <div>
                          {formatPrice(event?.min_price)} <small>onwards</small>
                        </div>
                      </div>
                      <Link
                        target="_blank"
                        href={`/event-details/${event.slug}`}
                        onClick={() => handleNavigation(`/event-details/${event.slug}`)}
                      >
                        <Button
                          variant={"outline"}
                          className="!text-[12px] !py-1.5 !px-[18px]"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                {shouldShowCta(index) && (
                  <div
                    className={`__container __responsive_gapMY rounded-2xl text-center text-white overflow-hidden p-10 relative z-200 shadow-[0px_-2px_15px_8px_#313030] col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 py-16 ${className}`}
                  >
                    <img
                      src={cta?.background}
                      alt="get started"
                      className="absolute left-0 top-0 h-full w-full z-[-1] object-cover"
                    />
                    <div className="absolute w-full h-full bg-[#2f2d2d72] top-0 left-0 backdrop-blur-sm z-[-1]"></div>
                    <h2 className="text-2xl md:text-4xl mb-6 font-bold text-white leading-tight __heading">
                      {cta?.title}
                    </h2>
                    <Button variant={"fill"}>
                      <Link
                        href={cta?.button_url}
                        onClick={() => handleNavigation(cta?.button_url)}
                      >
                        {cta?.button}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : viewMode === "list" ? (
          eventData.map((event, index) => (
            <div key={event.id}>
              <div className="overflow-hidden rounded-2xl __gradient grid grid-cols-1 lg:grid-cols-[300px_auto] xl:grid-cols-[350px_auto]">
                <div className="relative h-full lg:h-auto">
                  <img
                    src={event.feature_image}
                    alt={event.title}
                    className="block w-full h-[200px] object-cover"
                  />
                </div>
                <div className="px-4 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="__heading text-[20px] line-clamp-1">
                        {event.title}
                      </h1>
                      <p className="__text text-[14px] text-gray-300">
                        {event?.main_category?.title}
                      </p>
                    </div>
                    <div className="__text bg-[#FFFFFF26] text-[12px] px-2.5 py-1.5 rounded-md">
                      {formatEventDate(event?.max_event_date)}
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm text-muted-foreground mt-3">
                    <IoLocationOutline className="text-[18px] __accent_color" />
                    <span className="__text">{`${
                      event.city_detail?.name || ""
                    }, ${event.state_detail?.name || ""}`}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 __text mt-3">
                    {event.short_description}
                  </p>
                  <div className="flex justify-between pt-3 items-center">
                    <div className="font-medium __text flex items-center gap-0.5">
                      <div className="__accent_color">
                        {event?.currency_detail?.currency}
                      </div>
                      <div>
                        {formatPrice(event?.min_price)} <small>onwards</small>
                      </div>
                    </div>
                    <Link
                      target="_blank"
                      href={`/event-details/${event.slug}`}
                      onClick={() => handleNavigation(`/event-details/${event.slug}`)}
                    >
                      <Button
                        variant={"outline"}
                        className="!text-[14px] !py-2"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              {shouldShowCta(index) && (
                <div className="text-center text-white rounded-2xl overflow-hidden p-10 relative z-10 shadow-[0px_0px_10px_1px_#313030] my-5 __responsive_gapMY">
                  <img
                    src={cta?.background}
                    alt="get started"
                    className="absolute left-0 top-0 h-full w-full z-[-1] object-cover"
                  />
                  <div className="absolute w-full h-full bg-[#2f2d2d72] top-0 left-0 backdrop-blur-sm z-[-1]"></div>
                  <h2 className="text-3xl font-bold mb-6 __heading">
                    {cta?.title}
                  </h2>
                  <Button variant={"fill"}>
                    <Link
                      href={cta?.button_url}
                      onClick={() => handleNavigation(cta?.button_url)}
                    >
                      {cta?.button}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-muted rounded-lg h-[50vh] xl:h-[600px] flex items-center justify-center w-full border">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 __heading">Map View</h3>
              <p className="text-muted-foreground max-w-md mx-auto __text">
                The map view would display event locations on an interactive
                map. This would require integration with a mapping service like
                Google Maps or Mapbox.
              </p>
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && eventData.length === visibleEventsCount && (
        <div className="flex items-center justify-center mt-12 __text">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant={"outline"}
            className="mx-1 !py-[5px] !px-4 text-[14px]"
          >
            <span className="hidden md:block">Previous</span>
            <FaAnglesLeft className="md:hidden text-[18px]" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={"outline"}
              disabled={currentPage === i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`mx-1 !py-1 !px-4 text-[14px] ${
                currentPage === i + 1 ? "!text-white !bg-black" : ""
              }`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant={"fill"}
            className="mx-1 !py-[5px] !px-4 text-[14px]"
          >
            <span className="hidden md:block">Next</span>
            <FaAnglesRight className="md:hidden text-[18px]" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CityEventCard;