import React from 'react'

function WhyChooseRallyUp({title,features}) {
  const iconClass=[
   '#1cd4b4',
   '#ffa726',
   '#ff7d6b'
  ]
  return (
    <section className="__container">
      <div className="text-left __heading_gap">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
        {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features?.map((feature, index) => (
          <div 
          key={index}
          className={`__gradient rounded-lg shadow-lg p-8`}>
          <div className="w-16 h-16 mb-6">
          <div
        className="w-16 h-16"
        style={{
          WebkitMaskImage: `url(${feature.icon})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          backgroundColor: iconClass[index % iconClass.length],
        }}
      />
          </div>
          <div className="__heading_gap2">
            {/* <span className="text-white text-lg __text font-medium">24X7</span> */}
            <h3 className="text-xl md:text-3xl font-bold text-white __heading">
              {feature.title}
            </h3>
          </div>
          <p className="text-white __text">
            {feature.content}
          </p>
        </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseRallyUp