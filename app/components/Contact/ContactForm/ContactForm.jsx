import React, { useState, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = ({
  title,
  subtitle,
  select,
  option,
  button,
  onSubmit,
  isLoading,
  isSubmitted,
  error,
  successData,
  successMessage,
  onReset
}) => {
  const initialFormState = {
    name: "",
    email: "",
    mobile: "",
    reason: "",
    message: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isSubmitted) {
      setFormData(initialFormState);
      toast.success(successMessage || "Form submitted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.mobile.trim()) errors.mobile = "Phone number is required";
    if (!formData.reason) errors.reason = "Please select a reason";
    if (!formData.message) errors.message = "Please select a reason";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-black pt-[90px]">
        <div className="__container md:p-8 p-3 rounded-2xl __gradient">
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <div className="bg-[#22F106] bg-opacity-20 border border-[#22F106] rounded-full p-4 mb-6">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
  
            <h2 className="text-2xl font-bold text-white mb-3 __heading">{successMessage}</h2>
  
            <Button
              varient="fill"
              onClick={() => {
                setFormData(initialFormState);
                onReset();
              }}
              className="inline-flex items-center gap-2"
            >
              Submit Another Form
            </Button>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="bg-black pt-[60px]">
      <div className="__container md:p-8 p-3 rounded-2xl __gradient">
        <h2 className="text-xl md:text-2xl font-bold text-white __heading inline-flex pb-3 __position_border __heading_gap pr-2">
          {title}
        </h2>

        <p className="text-white mb-6 text-left __text">{subtitle}</p>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4 pt-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`!rounded-xl w-full ${formErrors.name ? "border-red-500" : ""}`}
              />
              {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`!rounded-xl w-full ${formErrors.email ? "border-red-500" : ""}`}
              />
              {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <Input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`!rounded-xl w-full ${formErrors.mobile ? "border-red-500" : ""}`}
              />
              {formErrors.mobile && <p className="text-red-400 text-sm mt-1">{formErrors.mobile}</p>}
            </div>

            <div className="relative">
              <Select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`!rounded-xl w-full ${formErrors.reason ? "border-red-500" : ""}`}
              >
                {select && (
                  <option className="text-black" value="">
                    {select}
                  </option>
                )}
                {option?.filter(opt => opt.status === "Show").map((opt, index) => (
                  <option key={index} className="text-black" value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </Select>
              <span className="absolute right-5 top-5 text-white">
                <GoChevronDown />
              </span>
              {formErrors.reason && <p className="text-red-400 text-sm mt-1">{formErrors.reason}</p>}
            </div>

            <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type Your Message"
              rows={4}
              className="col-span-2 px-3 py-[14px] rounded-xl w-full block outline-none bg-[#ffffff1b] text-white pl-[25px] border custom_input_component"
            ></textarea>
             {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button type="button" varient="outline" className="!p-0 !rounded-[50%]">
              <Link href="/support" className="p-3 block">
                <IoIosArrowBack className="w-5 h-5" />
              </Link>
            </Button>

            {button && (
              <Button type="submit" varient="fill" className="inline-flex items-center gap-2" disabled={isLoading}>
                {isLoading ? "Submitting..." : button}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
