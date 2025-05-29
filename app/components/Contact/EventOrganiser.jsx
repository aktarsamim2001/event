import { useState } from "react";
import { IoIosArrowBack, IoIosHelpCircle } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const EventOrganiser = ({content}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black __responsive_gapY">
      <div className="__container md:col-span-2 w-full p-6 __gradient rounded-2xl shadow-2xl text-white">
        <div className=" inline-flex items-center gap-3 pb-3 __position_border __heading_gap pr-2">
          <IoIosHelpCircle className="w-8 h-8 __accent_color" />
          <h2 className="text-3xl font-bold __heading text-white">
          {content?.support_faq_page?.page_details?.title}
          </h2>
        </div>

        <div className="space-y-4">
          {content?.support_faq_page?.details?.faqs?.map((faq, index) => (
            <div
              key={index}
              className={`border border-[#6e4938] rounded-xl overflow-hidden transition-all duration-300 shadow-lg`}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between cursor-pointer items-center gap-4"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-white __text">
                  {faq.question}
                </span>
                <div
                  className={`p-2 rounded-full border-2 border-[#FFFFFF26] transition-transform duration-300 hover:bg-[#FFFFFF26] ${openIndex === index ? "rotate-180 " : ""
                    }`}
                >
                  {openIndex === index ? (
                    <IoIosArrowUp className="w-4 h-4 __accent_color" />
                  ) : (
                    <IoIosArrowDown className="w-4 h-4 __accent_color" />
                  )}
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-6 py-4 border-t border-[#6e4938] text-white __text">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative flex items-center justify-between w-full">
            <Button varient={'outline'} className={'!p-0 !rounded-[50%]'}>
              <Link to={content?.support_faq_page?.page_details?.redirection_url} className="p-3 block">
                <IoIosArrowBack className="w-5 h-5" />
              </Link>
            </Button>

            <div className="flex items-center flex-col">
              <p className="text-white mb-2 __text hidden md:block">
                {content?.support_faq_page?.page_details?.button_above_text}
              </p>
              <Button
                varient="fill"
                className="inline-flex items-center gap-2 ml-auto !px-5"
              >
               {content?.support_faq_page?.page_details?.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventOrganiser;
