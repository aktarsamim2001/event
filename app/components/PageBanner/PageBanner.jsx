import Button from "../ui/Button";
import Input from "../ui/Input";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const PageBanner = ({ title, subtitle, button, search, buttonLink }) => {
  return (
    <div className="__gradient __responsive_gap_page_banner w-full overflow-hidden">
      {/* Content */}
      <div className="__container">
        {/* Title */}
        <h1 className="text-[30px] md:text-5xl __heading __heading_gap2 text-white">
          {title}
        </h1>

        {/* Subtitle, Button, and Search */}
        <div>
          {subtitle && (
            <p className="text-sm md:text-xl __text text-white/90 leading-[28px]">
              {subtitle}
            </p>
          )}
          {button && (
            <Link target="_blank" href={buttonLink}>
              <Button variant={"fill"} className="mt-4 flex items-center gap-2">
                {button}
                <IoIosArrowForward size={18} />
              </Button>
            </Link>
          )}

          {/* Search Input */}
          {search && (
            <div className="space-y-2 mt-4">
              <div className="relative max-w-[620px]">
                <Input
                  type="email"
                  placeholder={search}
                  className="bg-[#FFFFFF26] pr-10 !rounded-3xl"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer"
                  aria-label="Search"
                >
                  <IoSearchOutline size={28} className="__accent_color" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List Section */}
        {/* {list && list.length > 0 && (
          <ul className="mt-4 space-y-2">
            {list.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-white">
                <item.icon className="text-green-400 w-5 h-5" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default PageBanner;
