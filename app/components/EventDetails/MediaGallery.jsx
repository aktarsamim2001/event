" use client";

import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/free-mode";

import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

export default function MediaGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems =
    useSelector((state) => state.eventDetails?.data?.media_gallery_list) || [];

  const handleMediaClick = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setSelectedMedia(mediaItems[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % mediaItems.length;
    setSelectedMedia(mediaItems[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="text-white">
      {mediaItems.length > 0 && (
        <h1 className="text-2xl md:text-[25px] font-bold text-white leading-tight mb-4 __heading">
          Media Gallery
        </h1>
      )}
      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.length > 0 ? (
          mediaItems.map((media, index) => (
            <div
              key={index}
              className="relative cursor-pointer w-full aspect-video overflow-hidden rounded-lg"
              onClick={() => handleMediaClick(media, index)}
            >
              <img
                src={media}
                alt={`Media ${index}`}
                className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <img className="w-25 h-25" src="/no-data.png" alt="no media" />
            <div className="text-lg font-semibold text-gray-300 mb-1">
              No Media Available
            </div>
            <div className="text-gray-400 text-base">
              There are currently no photos or videos for this event.
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-1 rounded-full cursor-pointer bg-black/50 hover:bg-black/70 transition-colors"
              onClick={() => setSelectedMedia(null)}
            >
              <RxCross2 size={25} />
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={handlePrevious}
            >
              <IoIosArrowBack size={25} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={handleNext}
            >
              <IoIosArrowForward size={25} />
            </button>

            {/* Media content */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full aspect-video overflow-hidden">
                <img
                  src={selectedMedia}
                  alt="Selected media"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
