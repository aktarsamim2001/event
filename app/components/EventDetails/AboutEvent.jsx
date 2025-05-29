"use client";
import { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import DatesTickets from "./DatesTickets";
import MediaGallery from "./MediaGallery";
import EventDetailsFaq from "./EventDetailsFaq";
import OthersEvent from "./OthersEvent";
import HelpAndSupport from "./HelpAndSupport";
import YouMayLikeEvents from "./YouMayLikeEvents";
import UpcommingEvents from "./UpcommingEvents";
import Button from "../ui/Button";
import Lightbox from "react-spring-lightbox";
import ReviewPage from "./RatingReview";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import EventMap from "./EventMap"; 
import QuestionAnswer from "./QuestionAnswer";

export default function AboutEvent() {
  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const termsAndConditions = eventDetails?.event_terms_conditions;
  const aboutEvent = eventDetails?.about_event_section;

  const [activeTab, setActiveTab] = useState("event");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState(1);
  const dropdownRef = useRef(null);
  const dropdownWrapperRef = useRef(null);

  const tabs = [
    { id: "event", label: "About Event" },
    { id: "dates", label: "Dates & Tickets" },
    { id: "gallery", label: "Media Gallery" },
    { id: "faq", label: "You Need to Know" },
    { id: "question-answer", label: "Question & Answer" },
    { id: "contact", label: "Help & Support" },
    { id: "review", label: "Rating & Reviews" },
    { id: "similar-events", label: "Similar Events" },
  ];

  useEffect(() => {
    const updateVisibleTabs = () => {
      if (window.innerWidth < 640) {
        setVisibleTabs(1);
      } else if (window.innerWidth < 1024) {
        setVisibleTabs(2);
      } else {
        setVisibleTabs(3);
      }
    };
    updateVisibleTabs();
    window.addEventListener("resize", updateVisibleTabs);
    return () => window.removeEventListener("resize", updateVisibleTabs);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isValidImage =
    aboutEvent?.venue_layout &&
    typeof aboutEvent.venue_layout === "string" &&
    aboutEvent.venue_layout.trim() !== "";

  return (
    <div className="__gradient rounded-xl shadow-sm p-4 md:p-6">
      <div className="pt-3">
        <div className="mb-6 flex justify-between items-start">
          <div className="flex items-center justify-start gap-2 w-full relative flex-wrap">
            {tabs.slice(0, visibleTabs).map((tab) => (
              <Button
                key={tab.id}
                varient={"outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`!px-4 !py-2 text-center whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "__primary_bg !border-transparent"
                    : "hover:__primary_bg hover:border-transparent"
                }`}
              >
                {tab.label}
              </Button>
            ))}

            {tabs.length > visibleTabs && (
              <div
                ref={dropdownWrapperRef}
                style={{ display: "inline-block", position: "relative" }}
              >
                <Button
                  varient={"outline"}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className={`!px-4 !py-2 text-center flex justify-between items-center gap-x-2 relative transition-all duration-300 ${
                    tabs.slice(visibleTabs).some((tab) => tab.id === activeTab)
                      ? "__primary_bg !border-transparent"
                      : ""
                  }`}
                >
                  {(() => {
                    const dropdownTabs = tabs.slice(visibleTabs);
                    const activeDropdownTab = dropdownTabs.find(
                      (tab) => tab.id === activeTab
                    );
                    return activeDropdownTab ? activeDropdownTab.label : "More";
                  })()}
                  <BiChevronDown
                    className={`text-[25px] leading-tight transition-transform duration-300 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {showDropdown && (
                  <div className="absolute z-[100] top-[45px] right-0 w-[220px] rounded-md shadow-lg bg-[#1E1E1E] border border-gray-700 p-2">
                    {tabs.slice(visibleTabs).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setShowDropdown(false);
                        }}
                        className={`block w-full rounded-md text-left px-4 py-3 text-[15px] font-semibold cursor-pointer mb-1 transition-all duration-300 ${
                          activeTab === tab.id
                            ? "__primary_bg text-white"
                            : "text-white hover:bg-[#1ABB00]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTab === "event" && (
        <div className="py-10">
          <div className="">
            <h1 className="text-[18px] md:text-[25px] font-bold text-white leading-tight mb-4 __heading">
              Event Details
            </h1>
            <div
              className="text-white mb-4 __text line-clamp-3 md:line-clamp-none"
              dangerouslySetInnerHTML={{
                __html: eventDetails?.event?.long_description,
              }}
            />
          </div>

          {/* Venue Details */}
          <div className="pt-10 rounded-xl shadow-sm">
            <h1 className="text-[18px] md:text-[25px] font-bold text-white mb-4 __heading">
              Venue
            </h1>

            <div className="rounded-lg overflow-hidden mb-4">
              {/* Google Maps Component */}
              <div className="w-full h-[220px] md:h-[300px] rounded-lg overflow-hidden">
                <EventMap aboutEvent={aboutEvent} />
              </div>
              <div className="mt-10 relative">
                {isValidImage ? (
                  <div
                    className="mt-4 rounded-lg md:h-[600px] h-auto shadow-2xl cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  >
                    <img
                      src={aboutEvent.venue_layout}
                      alt="Venue layout"
                      className="w-full h-full md:object-cover object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="mt-4 rounded-lg h-[500px] w-full bg-gray-200 text-2xl flex items-center justify-center text-gray-500">
                    No venue layout available
                  </div>
                )}

                {/* Lightbox Overlay */}
                {isValidImage && isOpen && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Lightbox
                      images={[{ src: aboutEvent.venue_layout }]}
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      currentIndex={0}
                      style={{
                        background: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-10">
            <h1 className="text-2xl md:text-[25px] font-bold text-white leading-tight mb-4 __heading">
              About Host
            </h1>
            <div
              className="text-white __text line-clamp-3 md:line-clamp-none"
              dangerouslySetInnerHTML={{
                __html: aboutEvent?.long_description || "",
              }}
            />
          </div>

          {termsAndConditions?.map((item) => (
            <div className="pt-10">
              <h1 className="text-[18px] md:text-[25px] font-bold text-white leading-tight mb-4 __heading">
                Terms & Conditions
              </h1>
              <ul key={item.id} className="text-white __text  ">
                <h2>{item?.title}:</h2>
                <li className="flex  items-start gap-2 __text">
                  <span className="md:w-2.5 w-2 h-2 md:h-2.5 __accent_bg rounded-full mt-2"></span>
                  {item?.content}
                </li>
              </ul>
            </div>
          ))}

          <div className="mt-10">
            <OthersEvent />
          </div>
        </div>
      )}
      {activeTab === "dates" && (
        <div className="py-10">
          <DatesTickets />
        </div>
      )}
      {activeTab === "gallery" && (
        <div className="py-10">
          <MediaGallery />
        </div>
      )}
      {activeTab === "faq" && (
        <div className="mt-6">
          <EventDetailsFaq />
        </div>
      )}
      {activeTab === "contact" && (
        <div className="mt-6">
          <HelpAndSupport />
        </div>
      )}
      {activeTab === "similar-events" && (
        <div className="py-10">
          <YouMayLikeEvents />
          <UpcommingEvents />
        </div>
      )}
      {activeTab === "review" && (
        <div className="py-10">
          <ReviewPage />
        </div>
      )}
       {activeTab === "question-answer" && (
        <div className="mt-6">
          <QuestionAnswer />
        </div>
      )}
    </div>
  );
}
