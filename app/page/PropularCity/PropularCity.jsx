"use client";

import React, { useEffect, useState } from "react";
import EventCard from "../../components/Events/EventCard";
import EventBanner from "../../components/Events/EventBanner";
import CityFilter from "../../components/CityEvent/CityFilter";
import CityEventCard from "../../components/CityEvent/CityEventCard";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredEvents } from "../../store/slice/eventFilterSlice";

const PropularCity = ({ content, slug }) => {
  const eventData = content?.event_page;

  const posters = eventData?.posters?.posters || [];

  const search = eventData?.search;
  const cta = eventData?.cta;
  const events = eventData;

  const isSearchVisible = search?.visibility === "1";
  const isCtaVisible = cta?.visibility === "1";
  const isEventsVisible = events?.visibility === "1";

  return (
    <div className="bg-black text-white">
      <div className="__container_fluid">
        <EventBanner posters={posters} />
        <div>
          <div>
            <CityFilter search={search} isSearchVisible={isSearchVisible} />
          </div>

          <div className="__container">
            <CityEventCard
              isEventsVisible={isEventsVisible}
              event={events}
              isCtaVisible={isCtaVisible}
              cta={cta}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropularCity;
