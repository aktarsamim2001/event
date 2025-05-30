"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavState } from "@/store/navbar/navbarSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { RootState } from "@/store";

const Sidebar = () => {
  const toggleNavbar = useSelector((state) => state.navbarSlice.toggleNavbar);
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.data);
  const logo = useSelector((state) => state?.generalSettings?.data?.logo);

  const pathname = usePathname();

  const handleClose = () => {
    dispatch(toggleNavState());
  };

  return (
    <aside
      id="navbar-sidebar"
      className={`sidebar-main ${
        toggleNavbar ? "!left-0" : "!left-[-100%]"
      } grid grid-cols-[280px_auto]`}
      aria-label="Sidebar"
    >
      <div className="sidebar-content">
        <div className="flex justify-between items-center">
          <Image
            src={logo}
            className="block w-15 object-cover"
            alt="logo"
            width={120}
            height={40}
          />
          <span
            className="bg-[#ffffff22] p-[6px] rounded-md backdrop:blur-[3px] __primaryColor_hov text-white"
            onClick={handleClose}
          >
            <IoMdClose className="text-[20px]" />
          </span>
        </div>

        {menus?.map((item) => {
          const href = item.slugData
            ? `/${item.slugData.slug === "home" ? "" : item.slugData.slug}`
            : "#";

          return (
            <Link
              key={item.id}
              href={href}
              onClick={handleClose}
              className={`text-white flex items-center text-[19px] py-2 rounded-[4px] gap-x-[10px] pl-2 mt-2 __text ${
                pathname === href ? "bg-[#312f2f]" : "transparent"
              }`}
            >
              <div className="leading-4 mt-[1px]">{item.title}</div>
            </Link>
          );
        })}
      </div>

      <div
        className="sidebar-overlay"
        style={{
          width: toggleNavbar ? "100%" : "0",
          transition: "all .3s ease-in",
        }}
        onClick={handleClose}
      ></div>
    </aside>
  );
};

export default Sidebar;
