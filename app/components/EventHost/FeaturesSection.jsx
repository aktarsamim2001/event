import React from 'react';

const FeaturesSection = ({ title, details }) => {

  return (
    <div className="__container __responsive_gap">
      <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
        {title}
      </h1>

      {details?.map((detail, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className="grid md:grid-cols-2 justify-between gap-12 md:gap-36 items-center __responsive_gap"
          >
            {/* Left Side */}
            <div className={isEven ? "w-full" : "w-full md:order-2"}>
              <h2 className="text-xl md:text-3xl font-semibold text-white __heading_gap2 __heading">
                {detail.title}
              </h2>
              <p className="text-white text-sm md:text-lg leading-relaxed __text md:pr-10">
                {detail.content}
              </p>
            </div>

            {/* Right Side */}
            <div className={isEven ? "w-full" : "w-full md:order-1"}>
              <img
                src={detail.image}
                alt={detail.title}
                className="shadow-xl rounded-2xl block w-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesSection;
