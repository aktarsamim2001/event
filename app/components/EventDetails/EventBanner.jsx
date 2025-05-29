"use client";

import { useSelector } from "react-redux";

export default function EventBanner() {
  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const images = eventDetails?.event?.feature_image;
  const title = eventDetails?.event?.title;

  return (
    <div className="relative w-full h-[200px] md:h-[400px] rounded-xl overflow-hidden">
      <img
        src={images}
        alt={title}
        className="object-cover h-full w-full rounded-xl"
      />
    </div>
  );
}