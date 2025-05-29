import React from 'react'
import Button from '../ui/Button'
import Link from 'next/link'

function EventGoersBanner({ className,cta }) {
  return (
    <div className={`__container rounded-2xl text-center text-white overflow-hidden p-10 relative z-200 shadow-[0px_-2px_15px_8px_#313030] col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 ${className}`}>
      <img src={cta.background} alt="get started" className="absolute left-0 top-0 h-full w-full z-[-1] object-cover" />
      <div className="absolute w-full h-full bg-[#2f2d2d72] top-0 left-0 backdrop-blur-sm z-[-1]"></div>
      <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap mb-6">
      {cta.title}
      </h2>
      <Button varient={"fill"}>
        <Link target='_blank' href={cta.button_url}>{cta.button}</Link>
      </Button>
    </div>
  )
}

export default EventGoersBanner