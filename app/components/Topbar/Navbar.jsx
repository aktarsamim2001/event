"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HiOutlineBars3BottomRight } from "react-icons/hi2"
import { usePathname } from "next/navigation"
import { toggleNavState } from "../../store/navbar/navbarSlice"
import { fetchMenuList } from "../../store/slice/menu/headerSlice"
import UserLocation from "./UserLocation"
import Image from "next/image"

const Navbar = () => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0)
  const [scroll, setScroll] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const menus = useSelector((state) => state.header.data)
  const logo = useSelector((state) => state?.generalSettings?.data?.logo)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    dispatch(fetchMenuList(1))
  }, [dispatch])

  return (
    <>
      <nav
        className={`sticky z-300 top-[0px] left-0 w-full ${
          scroll <= 190
            ? pathname === "/" || pathname === "/home" || pathname === "/events"
              ? "bg-black"
              : "__gradient"
            : "bg-[#11111195] backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between px-0 __container py-2 -my-0.5">
          {/* Logo and City Selector */}
          <div className="flex items-center justify-start">
            {logo === undefined ? (
              <div className="animate-pulse bg-gray-700 rounded w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[100px] xl:h-[100px] mr-2 md:mr-0 xl:mr-[60px]" />
            ) : (
              <Link href="/">
                <Image
                  src={logo}
                  alt="rally-up"
                  className="block transition-all duration-300 w-[60px] lg:w-[70px] xl:w-[100px] mr-2 md:mr-0 xl:mr-[60px] object-cover"
                  width={100}
                  height={100}
                />
              </Link>
            )}
            <div className={`text-white ${width < 850 ? "block" : "hidden"}`}>
              <div className="md:hidden __heading text-[18px]">Your Location:</div>
              <div
                className="flex items-center relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="md:hidden flex items-center justify-between gap-x-2 relative __text">
                  <UserLocation />
                </div>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <div
            className={`${
              width < 850 ? "hidden" : "flex"
            } items-center flex-nowrap gap-x-3 lg:gap-x-[20px] lg:mr-0`}
          >
            {menus === undefined ? (
              <>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse bg-gray-700 rounded h-[24px] w-[80px] mx-2"
                  />
                ))}
              </>
            ) : (
              menus.map((item) => {
                const href =
                  item.slugData?.slug === "home"
                    ? "/"
                    : `/${item.slugData?.slug ?? "#"}`
                const isActive = pathname === href

                return (
                  <li
                    key={item.id}
                    className="list-none leading-[20px] lg:leading-[25px]"
                  >
                    <Link
                      href={href}
                      className={`text-[14px] xl:text-[16px] font-bold px-[12px] block py-[2px] __text __primaryColor_hov [letter-spacing:0.5px] ${
                        isActive
                          ? "text-green-500 border-b-2 border-green-500"
                          : "text-gray-300"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })
            )}
          </div>

          {/* Mobile Toggle */}
          {width < 850 && (
            <button
              onClick={() => dispatch(toggleNavState())}
              className="text-white ml-4 block bg-[#ffffff22] p-2 backdrop:blur-[3px] __primaryColor_hov rounded-sm"
            >
              <HiOutlineBars3BottomRight className="text-[20px]" />
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
