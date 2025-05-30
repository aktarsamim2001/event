import React, { useEffect, useState } from "react";
import Lightbox from "react-spring-lightbox";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Image = React.memo(({ src, alt = "", onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoaded = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className="relative w-full h-[300px]">
      {!isLoaded && <div className="absolute inset-0 bg-gray-200"></div>}
      <img
        className={`block w-full object-cover transition-opacity duration-300 h-full ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        loading="lazy"
      />
    </div>
  );
});

const EventGallery = ({ className, eventGallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {}, { passive: true });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const openLightbox = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const gotoPrevious = () => {
    const imagesLength = eventGallery[0]?.images.length || 0;
    setActiveIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  const gotoNext = () => {
    const imagesLength = eventGallery[0]?.images.length || 0;
    setActiveIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  };

  // Custom navigation buttons
  const renderPrevButton = () => (
    <button
      className="lightbox-nav-btn lightbox-prev-btn"
      onClick={gotoPrevious}
    >
      <IoIosArrowBack size={22} />
    </button>
  );

  const renderNextButton = () => (
    <button className="lightbox-nav-btn lightbox-next-btn" onClick={gotoNext}>
      <IoIosArrowForward size={22} />
    </button>
  );

  // Custom header with close button
  const renderHeader = () => (
    <div className="lightbox-header">
      <button className="lightbox-close-btn" onClick={closeLightbox}>
        <RxCross2 size={22} />
      </button>
    </div>
  );

  return (
    <div className={`${className} __responsive_gap`}>
      <div className="text-left __heading_gap">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
          Fans Love Us
        </h2>
      </div>
      <div className="gallery_grid">
        {eventGallery[0]?.images.map((item, index) => (
          <div key={index} className="Gmain_backdrop border-2 border-gray-500" onClick={() => openLightbox(index)}>
            <Image src={item} alt={`gallery img ${index}`} width={400} height={300} className="block w-full h-auto object-cover" />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          isOpen={isOpen}
          onPrev={gotoPrevious}
          onNext={gotoNext}
          images={eventGallery[0]?.images.map((img) => ({ src: img }))}
          currentIndex={activeIndex}
          onClose={closeLightbox}
          renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
          renderHeader={renderHeader}
          style={{
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
      )}
    </div>
  );
};

export default EventGallery;
