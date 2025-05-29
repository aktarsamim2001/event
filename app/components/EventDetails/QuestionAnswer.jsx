"use client";

import { useState } from "react";
import { IoIosArrowBack, IoIosHelpCircle, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Button = ({ children, variant, className, ...props }) => {
  const baseStyles = "px-6 py-2 rounded-md text-white";
  const styles = `${baseStyles} ${variant === "fill" ? "bg-[#6e4938] hover:bg-[#8b5a3f]" : "border border-[#ffffff26] hover:bg-[#ffffff26]"} ${className || ""}`;
  return <button className={styles} {...props}>{children}</button>;
};

export default function QuestionAnswer() {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();
  const eventDetails = useSelector((state) => state.eventDetails?.data);
  const faqs = eventDetails?.faqs;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-10">
      <div className="w-full text-white">
        <div className="space-y-4">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#6e4938] rounded-xl overflow-hidden transition-all duration-300 shadow-lg"
              >
                <button
                  className="w-full md:px-6 md:py-4 px-4 py-3 text-left flex justify-between cursor-pointer items-center gap-4"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-full border-2 border-[#ffffff26] transition-transform duration-300 hover:bg-[#ffffff26] ${openIndex === index ? "rotate-180" : ""}`}
                  >
                    {openIndex === index ? (
                      <IoIosArrowUp className="w-4 h-4 text-[#6e4938]" />
                    ) : (
                      <IoIosArrowDown className="w-4 h-4 text-[#6e4938]" />
                    )}
                  </div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="md:px-6 md:py-4 px-4 py-3 border-t border-[#6e4938] text-white">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <img className="w-25 h-25" src="/no-data.png" alt="no media" />
              <div className="text-lg font-semibold text-gray-300 mb-1">No FAQs Available</div>
              <div className="text-gray-400 text-base">There are currently no frequently asked questions for this event.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}