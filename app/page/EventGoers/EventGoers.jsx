import React, { useEffect } from 'react'
import HowItWorks from '../../components/EventGoers/How-it-works'
import EventGoersBanner from '../../components/EventGoers/EventGoersBanner'
import UpcomingEvents from '../../components/EventGoers/UpcomingEvents'
import PageBanner from '../../components/PageBanner/PageBanner'
import EventGoersGallery from '../../components/Home/EventGoersGallery'

function EventGoers({content}) {

  useEffect(()=>{
    localStorage.removeItem("filterFormValues");
  },[])

  const {breadcrumb,pageContent,cta,events} = content?.event_goers_page || {};
  const isHowItWorksVisible = pageContent?.visibility === "1";
  const isCtaVisible = cta?.visibility === "1";
  return (
    <div className='bg-black'>
        <PageBanner
        title={breadcrumb?.title}
        subtitle={breadcrumb?.content}
        button={breadcrumb?.button}
        buttonLink={breadcrumb?.button_url}
      />
       <div className=''>
       {isHowItWorksVisible && (
         <HowItWorks 
           pageContent={pageContent}
           className=""
         />
       )}
        <EventGoersGallery className={'__container __responsive_gap'} />
        {isCtaVisible && (
          <EventGoersBanner 
            cta={cta}
            className={'__responsive_gap'}
          />
        )}
        <UpcomingEvents
          event={events}
        />
       </div>
    </div>
  )
}

export default EventGoers