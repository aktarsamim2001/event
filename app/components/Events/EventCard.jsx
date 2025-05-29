"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IoLocationOutline, IoFilterSharp } from "react-icons/io5";
import { CiViewList, CiGrid41 } from "react-icons/ci";
import Button from "../ui/Button";
import { toggleEventState } from "../../store/slice/eventFilterSlice";
import { fetchEvents, setPage } from "../../store/slice/event/eventSlice";
import {
  getFilteredEvents,
  setFilterCurrentPage,
} from "../../store/slice/eventFilter/eventFilterSlice";

function formatEventDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const EventCard = ({
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  cta,
  isEventsVisible,
  isCtaVisible = true,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, perPage } = useSelector(
    (state) => state.events.data
  );
  const [viewMode, setViewMode] = useState("grid");
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [visibleEventsCount, setVisibleEventsCount] = useState(12);
  const eventData = useSelector(
    (state) => state.eventFilterSlice.filteredEvents
  );
  const eventPaginationInfo = useSelector(
    (state) => state.eventFilterSlice.eventPaginationInfo
  );
  const filterColumn = width >= 1280 ? 4 : width >= 1024 ? 3 : 2;
  const bannerShow = filterColumn * 2;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, perPage, currentPage]);

  useEffect(() => {
    const params = {};
    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }
    dispatch(getFilteredEvents({ ...params, perPage: visibleEventsCount }));
  }, [searchParams, dispatch, visibleEventsCount]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Initialize URL parameters on component mount
  useEffect(() => {
    if (pathname === "/events" && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.get("page")) {
        urlParams.set("page", "1");
        const url = `${pathname}?${urlParams.toString()}`;
        window.history.replaceState(null, "", url);
      }
    }
  }, [searchParams, pathname]);

  const handlePageClick = (page) => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", page.toString());
      const url = `${pathname}?${urlParams.toString()}`;
      window.history.replaceState(null, "", url);
    }
    dispatch(setFilterCurrentPage(page));
    const params = {};
    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }
    dispatch(
      getFilteredEvents({
        ...params,
        page: page.toString(),
        perPage: visibleEventsCount,
      })
    );
  };

  const renderCTA = (index, isLast) =>
    isCtaVisible &&
    cta && (
      <div
        key={`cta-${index}`}
        className={`col-span-1 lg:col-span-${filterColumn} xl:col-span-4 ${
          !isLast ? "my-10" : "mt-10"
        } rounded-2xl text-center text-white overflow-hidden p-10 relative z-200 shadow-[0px_-2px_15px_8px_#313030]`}
        style={{ gridColumnStart: 1, gridColumnEnd: -1 }}
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
        <Button varient={"fill"}>
          <Link
            target="_blank"
            href={cta?.button_url}
            // onClick={() => handleNavigation(cta?.button_url)}
          >
            {cta?.button}
          </Link>
        </Button>
      </div>
    );

  const interleaveWithCTA = (data) => {
    const result = [];
    data.forEach((event, index) => {
      const isLast = index === data.length - 1;
      const formattedPrice =
        event?.min_price !== undefined && event?.min_price !== null
          ? Number(event.min_price).toFixed(2)
          : "";

      const eventComponent =
        viewMode === "grid" ? (
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
                  <div className="__text bg-[#FFFFFF26] text-[12px] flex flex-wrap px-2 py-1 rounded-md">
                    {formatEventDate(event?.max_event_date)}
                  </div>
                </div>
                <div className="flex items-center gap-x-2 text-sm text-muted-foreground mt-3">
                  <IoLocationOutline className="text-[18px] __accent_color" />
                  <span className="__text">
                    {event.city_detail?.name || ""},{" "}
                    {event.state_detail?.name || ""}
                  </span>
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
                      {formattedPrice} <small>onwards</small>
                    </div>
                  </div>
                  <Link
                    target="_blank"
                    href={`/event-details/${event.slug}`}
                    // onClick={() => handleNavigation(`/event-details/${event.slug}`)}
                  >
                    <Button
                      varient={"outline"}
                      className="!text-[12px] !py-1.5 !px-[18px]"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                  <span className="__text">
                    {event.city_detail?.name || ""},{" "}
                    {event.state_detail?.name || ""}
                  </span>
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
                      {formattedPrice} <small>onwards</small>
                    </div>
                  </div>
                  <Link
                    target="_blank"
                    href={`/event-details/${event.slug}`}
                    // onClick={() => handleNavigation(`/event-details/${event.slug}`)}
                  >
                    <Button varient={"outline"} className="!text-[14px] !py-2">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );

      result.push(eventComponent);

      if ((index + 1) % bannerShow === 0) {
        const isLastCTA = index + 1 === data.length;
        result.push(renderCTA(index, isLastCTA));
      }
    });

    return result;
  };

  return (
    <div className="w-full __responsive_gap">
      {eventData.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 __heading_gap">
          <div className="flex items-end gap-x-2.5">
            <h2 className="text-[26px] font-bold __heading">
              All Events{" "}
              <span className="__text text-sm block sm:inline-block">
                (Showing {eventData.length} of {eventPaginationInfo.total} Events)
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

      {eventData.length === 0 ? (
        <div className="py-12 text-center flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-gray-400 mb-4"
            style={{ width: 50, height: 50 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <p className="__text text-xl">
            No events found matching your search criteria.
          </p>
        </div>
      ) : (
        <>
          <div
            className={viewMode === "grid" ? `gap-5 ${className}` : "space-y-6"}
          >
            {interleaveWithCTA(eventData)}
          </div>
          {eventPaginationInfo.totalPages > 1 && (
            <div className="flex flex-col items-center justify-center mt-8">
              <nav
                className="inline-flex items-center gap-2"
                aria-label="Pagination"
              >
                <Button
                  varient={"fill"}
                  className="!px-3 !py-1"
                  disabled={eventPaginationInfo.currentPage === 1}
                  onClick={() =>
                    handlePageClick(eventPaginationInfo.currentPage - 1)
                  }
                >
                  Previous
                </Button>
                {Array.from(
                  { length: eventPaginationInfo.totalPages },
                  (_, i) => (
                    <Button
                      varient={
                        eventPaginationInfo.currentPage === i + 1
                          ? "fill"
                          : "outline"
                      }
                      key={i + 1}
                      className={`!py-1 !px-5 ${
                        eventPaginationInfo.currentPage === i + 1
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => handlePageClick(i + 1)}
                      disabled={eventPaginationInfo.currentPage === i + 1}
                    >
                      {i + 1}
                    </Button>
                  )
                )}
                <Button
                  varient={"fill"}
                  className="!px-3 !py-1"
                  disabled={
                    eventPaginationInfo.currentPage ===
                    eventPaginationInfo.totalPages
                  }
                  onClick={() =>
                    handlePageClick(eventPaginationInfo.currentPage + 1)
                  }
                >
                  Next
                </Button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;
