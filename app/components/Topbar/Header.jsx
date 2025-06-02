"use client"

import React, { useEffect } from "react"
import UserLocation from "./UserLocation"

const Header = () => {
  useEffect(() => {
    // Your effect logic here
  }, [])

  return (
    <header className="header_gradient hidden md:block">
      <div className="w-[95%] mx-auto flex flex-nowrap justify-end items-end py-0.5 sm:py-3 text-white gap-x-[25px]">
        <div className="hidden md:block">
          <UserLocation />
        </div>
      </div>
    </header>
  )
}

export default Header
