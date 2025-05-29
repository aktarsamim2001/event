"use client";

import { useState } from "react";
import { IoIosArrowBack, IoIosHelpCircle } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../ui/Button";
import { useSelector } from "react-redux";

const EventDetailsFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const faqs = eventDetails?.faqs;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-10">
      <div className="md:col-span-2 w-full text-white">
        <div className="space-y-4">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-[#6e4938] rounded-xl overflow-hidden transition-all duration-300 shadow-lg`}
              >
                <button
                  className="w-full md:px-6 md:py-4 px-4 py-3 text-left flex justify-between cursor-pointer items-center gap-4"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-white __text">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-full border-2 border-[#FFFFFF26] transition-transform duration-300 hover:bg-[#FFFFFF26] ${
                      openIndex === index ? "rotate-180 " : ""
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
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="md:px-6 md:py-4 px-4 py-3 border-t border-[#6e4938] text-white __text">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <img className="w-25 h-25" src="/no-data.png" alt="no media" />
              <div className="text-lg font-semibold text-gray-300 mb-1">
                No FAQs Available
              </div>
              <div className="text-gray-400 text-base">
                There are currently no frequently asked questions for this event.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventDetailsFaq;
