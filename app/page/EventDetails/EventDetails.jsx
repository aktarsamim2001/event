"use client";

import React, { useEffect } from "react";
import PageBanner from "../../components/PageBanner/PageBanner";
import EventBanner from "../../components/EventDetails/EventBanner";
import AboutEvent from "../../components/EventDetails/AboutEvent";
import EventSponsors from "../../components/EventDetails/EventSponsors ";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventDetails } from "../../store/slice/eventDetails/eventDetailsSlice ";
import { TbReload } from "react-icons/tb";
import SkeletonView from "../../components/Skeleton/SkeletonView";

function EventDetails({ slug: propSlug }) {
  // Use slug from prop (Next.js dynamic route)
  const slug = propSlug;
  const dispatch = useDispatch();

  // Use the proper selectors to get data from the slice
  const eventDetails = useSelector((state) => state.eventDetails.data);
  const isLoading = useSelector((state) => state.eventDetails.loading);

  useEffect(() => {
    if (slug) {
      dispatch(fetchEventDetails(slug));
    }
  }, [slug, dispatch]);

  if (isLoading || !eventDetails) {
    return <SkeletonView />;
  }

  return (
    <div className="bg-black">
      <PageBanner
        title={eventDetails?.event?.title}
        subtitle={`Hosted by ${eventDetails?.event?.user_detail?.name}`}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 __container __responsive_gap">
        <div className="w-full lg:col-span-2">
          <EventBanner />
          <div className="relative mt-6 space-y-10">
            <AboutEvent />
          </div>
        </div>
        <div className="w-full lg:col-span-1 lg:sticky z-[100] xl:top-[120px] lg:top-[90px] lg:self-start">
          <EventSponsors
            minPrice={eventDetails?.min_price}
            eventDates={eventDetails?.event_dates}
            currency={eventDetails?.currency}
          />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
