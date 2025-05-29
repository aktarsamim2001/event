export default function HowItWorks({pageContent}) {

  
  return (
    <section className="w-full ">
      <div className="__container __responsive_gap">
        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight __heading __heading_gap">
          {pageContent?.Title}
        </h1>

        <div className=" min-h-screen">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between ">
            {/* Left Side - Sticky Image */}
            <div className="md:sticky top-[180px] h-fit">
              <div className="rounded-2xl shadow-lg overflow-hidden ">
                <img
                  src={pageContent?.section_image}
                  alt="Event mockup"
                  className="w-full object-contain"
                />
              </div>
            </div>

            {/* Right Side - Scrollable Content */}

            <div className="md:ml-20">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <div className="space-y-12">
                  {pageContent?.steps?.map((item, index) => (
                    <div key={index} className="flex items-center gap-6">
                      <div className="text-white text-7xl md:text-8xl font-bold leading-none __heading">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 __heading">
                          {item?.title}
                        </h3>
                        <p className="text-white text-sm md:text-lg __text">
                          {item?.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
