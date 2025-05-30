import { useState } from "react";
import { IoIosArrowBack, IoIosHelpCircle } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../ui/Button";
import Link from "next/link";

const FaqSection = ({ content }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClick = () => {
    // For Next.js, use window.location for navigation with state
    if (typeof window !== 'undefined') {
      window.location.href = content?.support_faq_page?.page_details?.redirection_url;
    }
  }

  return (
    <div className="bg-black pt-[90px]">
      <div className="__container md:col-span-2 w-full p-6 __gradient rounded-2xl shadow-2xl text-white">
        <div className="inline-flex items-center gap-1 pb-3 __position_border __heading_gap pr-2">
          <IoIosHelpCircle className="w-8 h-8 __accent_color" />
          <h2 className="text-xl md:text-2xl font-bold __heading text-white">
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
            <Button variant={'outline'} className={'!p-0 mt-0 md:mt-7.5 !rounded-[50%]'}>
              <Link href={content?.support_faq_page?.page_details?.redirection_url} className="p-3 block">
                <IoIosArrowBack className="w-5 h-5" />
              </Link>
            </Button>

            <div className="flex items-center flex-col">
              <p className="text-white mb-2 __text hidden md:block">
                {content?.support_faq_page?.page_details?.button_above_text}
              </p>
              <Button
                variant="fill"
                className="inline-flex items-center gap-2 ml-auto !px-5 rounded-full text-sm md:text-lg"
                onClick={handleClick}
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
export default FaqSection;
