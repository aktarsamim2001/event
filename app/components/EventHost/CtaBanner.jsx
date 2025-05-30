import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

const CTABanner = ({ className,title,button,buttonLink,background }) => {
  return (
    <div
      className={`__container rounded-2xl text-center text-white overflow-hidden p-10 relative z-200 shadow-[0px_-2px_15px_8px_#313030] col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 py-16 ${className}`}
    >
      <img
        src={background}
        alt="get started"
        className="absolute left-0 top-0 h-full w-full z-[-1] object-cover"
      />
      <div className="absolute w-full h-full bg-[#2f2d2d72] top-0 left-0 backdrop-blur-sm z-[-1]"></div>
      <h2 className="text-2xl md:text-4xl mb-6 font-bold text-white leading-tight __heading">
      {title}
      </h2>
      <Button variant={"fill"}>
        <Link target="_blank" href={buttonLink}>{button}</Link>
      </Button>
    </div>
  );
};

export default CTABanner;
