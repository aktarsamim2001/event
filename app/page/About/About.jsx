import React, { useEffect } from "react";
import Button from "../../components/ui/Button";
import PageBanner from "../../components/PageBanner/PageBanner";
import AboutUs from "../../components/Home/AboutUs";
import Testimonials from "../../components/Home/Testimonials";
import EventGallery from "../../components/EventHost/EventGallery";
import Link from "next/link";

const About = ({ content }) => {
  useEffect(() => {
    localStorage.removeItem("filterFormValues");
  }, []);
  const { breadcrumb, firstContent, cta, secondContent, gallery, faqs } =
    content?.about_page || {};

  return (
    <div className="bg-black">
      <PageBanner title={breadcrumb?.title} subtitle={breadcrumb?.content} />
      <div className="__container __responsive_gap">
        <AboutUs data={[firstContent]} />

        {cta && (
          <div className="text-center text-white rounded-2xl overflow-hidden p-10 relative z-200 shadow-[0px_-2px_20px_8px_#313030] __responsive_gap">
            <img
              src={cta?.background}
              alt="get started"
              className="absolute left-0 top-0 h-full w-full z-[-1] object-cover"
            />
            <div className="absolute w-full h-full bg-[#2f2d2d72] top-0 left-0 backdrop-blur-sm z-[-1]"></div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap mb-6">
              {cta?.title}
            </h2>
            <Button variant={"fill"}>
              <Link target="_blank" href={cta?.button_url}>
                {cta?.button}
              </Link>
            </Button>
          </div>
        )}

        {secondContent && (
          <div className="__responsive_gap grid grid-cols-1 lg:grid-cols-[50%_auto] items-center gap-[35px] lg:gap-0">
            <div className="relative h-[600px] w-full overflow-hidden">
              <img
                src={secondContent?.image_one}
                className="absolute right-0 lg:right-[10%] bottom-[130px] lg:bottom-[150px] rounded-[25px] z-40 w-[290px] lg:w-[55%] h-[380px] lg:h-[450px] object-cover"
                alt="about study 1"
              />
              <img
                src={secondContent?.image_two}
                className="absolute left-0 lg:left-[20px] bottom-0 w-[55%] lg:w-[55%] h-[250px] lg:h-[330px] z-100 rounded-[25px] object-cover"
                alt="about study 2"
              />
              <img
                src={secondContent?.image_three}
                alt="brand logo"
                className="absolute w-[120px] bottom-[100px] right-[35px] lg:right-[20%] z-110"
              />
              <div className="about_story"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
                {secondContent?.Title}
              </h1>
              <div
                className="__text text-sm md:text-lg text-white pl-2"
                dangerouslySetInnerHTML={{ __html: secondContent?.content }}
              />
            </div>
          </div>
        )}

        {/* <Gallery className={'__responsive_gap'} />   */}

        <EventGallery eventGallery={[gallery]} />

        <Testimonials testimonialsData={faqs} />
      </div>
    </div>
  );
};

export default About;
