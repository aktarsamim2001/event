import React, { useEffect } from 'react'
import WhyChooseRallyUp from '../../components/EventHost/WhyChooseRallyUp'
import PageBanner from '../../components/PageBanner/PageBanner'
import CTABanner from '../../components/EventHost/CtaBanner'
import FeaturesSection from '../../components/EventHost/FeaturesSection'
import EventHostGallery from '../../components/Home/EventHostGallery'

function EventHostPage({content}) {

  useEffect(()=>{
    localStorage.removeItem("filterFormValues");
  },[])
  const {breadcrumb,feature,cta,pageContent} = content?.event_host_page || {};
  const isFeatureVisible = feature?.visibility === "1";
  const isCtaVisible = cta?.visibility === "1";
  const isPageContentVisible = pageContent?.visibility === "1";

  return (
    <div className='bg-black'>
      <PageBanner
        title={breadcrumb?.title}
        subtitle={breadcrumb?.content}
        button={breadcrumb?.button}
        buttonLink={breadcrumb?.button_url}
      />
      <div className="__responsive_gap">
        {isFeatureVisible && (
          <WhyChooseRallyUp 
            title={feature?.title}
            features={feature?.features}
          />
        )}
        <EventHostGallery 
          className={'__container __responsive_gap'}
        />
        {isCtaVisible && (
          <CTABanner 
            title={cta?.title}
            button={cta?.button}
            buttonLink={cta?.button_url}
            background={cta?.background}
            className={'__responsive_gap'} 
          />
        )}
        {isPageContentVisible && (
          <FeaturesSection 
            title={pageContent?.title}
            details={pageContent?.details}
          />
        )}
      </div>
    </div>
  )
}

export default EventHostPage;