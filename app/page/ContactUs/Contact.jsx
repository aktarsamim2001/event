import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaPhone,
} from "react-icons/fa";
import { MdEmail, MdAccessTimeFilled } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { toast } from "react-toastify";
import PageBanner from "../../components/PageBanner/PageBanner";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralSettings } from "../../store/slice/settings/generalSettingsSlice";
import { resetCallRequest, setCallData, setCallError, setCallLoading } from "../../store/slice/callRequest/callRequestSlice";

const Contact = ({ content }) => {
  const option = content?.support_page?.reasons || [];
  useEffect(() => {
    localStorage.removeItem("filterFormValues");
  }, []);

  const { breadcrumb, supportTypes } = content?.support_page || {};
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.generalSettings);
  const formRequest = useSelector((state) => state.callRequest);
  const {
    status = "idle",
    error = null,
    isSubmitted = false,
    message = null,
    data: successData = null,
  } = formRequest || {};
  const isLoading = status === "loading";

  const initialFormState = {
    name: "",
    email: "",
    mobile: "",
    reasons: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchGeneralSettings());
    dispatch(resetCallRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitted) {
      setFormData(initialFormState);
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.location.href = "/contact-success";
    }
  }, [isSubmitted, message, successData]);

  useEffect(() => {
    if (error) {
      const errorMessage = error === "Reason is required" ? "Please select a query type" : error;
      toast.error(errorMessage || "An error occurred");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.mobile.trim()) errors.mobile = "Phone number is required";
    if (!formData.reasons) errors.reasons = "Please select a query type";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        enquiry: formData.reasons, 
        message: formData.message,
      };
      dispatch(setCallLoading(true));
      // Simulate async call, replace with actual API call if needed
      setTimeout(() => {
        // Simulate success
        dispatch(setCallData(payload));
        dispatch(setCallLoading(false));
      }, 1000);
      // If you want to use the real async thunk, replace above with:
      // dispatch(submitCallRequest(payload));
    } else {
      toast.error("Form validation failed. Please check your input.");
    }
  };

  const onReset = () => {
    setFormData(initialFormState);
    setFormErrors({});
  };

  return (
    <div className="bg-black">
      <PageBanner title={breadcrumb?.title} subtitle={breadcrumb?.content} />

      <div className="__responsive_gap">
        <div className="__container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTypes?.types?.map((card, index) => (
              <Link
                key={index}
                href={card?.redirection_page}
                className="__gradient p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] justify-center">
                  <div
                    className="w-8 h-8"
                    style={{
                      WebkitMaskImage: `url(${card?.icon})`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      backgroundColor: "#FFE100",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 __heading">
                    {card?.support_type}
                  </h3>
                  <p className="text-white text-sm leading-relaxed __text">
                    {card?.content}
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                  <span className="__accent_color group-hover:translate-x-1 transition-transform duration-200">
                    <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="__container __responsive_gap grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="__gradient p-5 md:p-8 rounded-2xl pb-[60px]">
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-white __heading">
              Connect with Us
            </h2>
            <div className="w-[160px] md:w-[240px] h-1 __accent_bg rounded-full mb-4 md:mb-8"></div>

            <p className="text-white mb-8 __text">
              {data?.contact_information?.contact_content || "Loading..."}
            </p>

            <div className="flex flex-col items-start justify-start mb-8 space-y-5">
              <div className="flex items-start space-x-3">
                <a
                  href={`tel:${data?.contact_information?.contact_phone}`}
                  className="border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] p-3 rounded-full cursor-pointer"
                  aria-label="Call us"
                >
                  <FaPhone size={22} className="__accent_color" />
                </a>
                <div>
                  <h3 className="font-semibold mb-1 text-white __heading">
                    Phone Number
                  </h3>
                  <p className="text-white __text">
                    <a
                      href={`tel:${data?.contact_information?.contact_phone}`}
                      className="hover:underline"
                    >
                      {data?.contact_information?.contact_phone || "N/A"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <a
                  href={`mailto:${data?.contact_information?.contact_email}`}
                  className="border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] p-3 rounded-full cursor-pointer"
                  aria-label="Email us"
                >
                  <MdEmail size={22} className="__accent_color" />
                </a>
                <div>
                  <h3 className="font-semibold mb-1 text-white __heading">
                    Email
                  </h3>
                  <p className="text-white __text">
                    <a
                      href={`mailto:${data?.contact_information?.contact_email}`}
                      className="hover:underline"
                    >
                      {data?.contact_information?.contact_email || "N/A"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] p-3 rounded-full cursor-pointer">
                  <MdAccessTimeFilled size={22} className="__accent_color" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white __heading">
                    Work Time
                  </h3>
                  <p className="text-white __text">
                    {data?.contact_information?.contact_worktime || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 font-semibold mb-1 text-white __heading">
              <h3>Stay Connected</h3>
              <div className="flex gap-2 md:gap-4">
                {data?.social_icons?.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] p-3 rounded-full"
                    aria-label="Social media link"
                  >
                    <div
                      className="w-6 h-6"
                      style={{
                        WebkitMaskImage: `url(${social?.icon})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        backgroundColor: "#FFE100",
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:p-8 p-3 rounded-2xl __gradient">
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-white __heading">
              Leave a Message
            </h2>
            <div className="w-[170px] md:w-[250px] h-1 __accent_bg rounded-full mb-5 md:mb-8"></div>
            <p className="text-white mb-4 __text">We are ready to help you!</p>

            <form className="space-y-4 pt-3" id="contact-form" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="!rounded-xl w-full"
                  />
                  {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="!rounded-xl w-full"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="!rounded-xl w-full"
                  />
                  {formErrors.mobile && <p className="text-red-500 text-sm">{formErrors.mobile}</p>}
                </div>
                <div className="relative">
                  <Select
                    name="reasons"
                    value={formData.reasons}
                    onChange={handleChange}
                    className={`!rounded-xl w-full ${formErrors.reasons ? "border-red-500" : ""}`}
                  >
                    <option className="text-black" value="">
                      Select Your Query
                    </option>
                    {option?.filter(opt => opt.status === "Show").map((opt, index) => (
                      <option key={index} className="text-black" value={opt.name}>
                        {opt.name}
                      </option>
                    ))}
                  </Select>
                  <span className="absolute right-5 top-5 text-white">
                    <GoChevronDown />
                  </span>
                  {formErrors.reasons && <p className="text-red-500 text-sm">{formErrors.reasons}</p>}
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type Your Message"
                  rows={4}
                  className="px-3 py-[14px] rounded-xl w-full outline-none bg-[#ffffff1b] text-white border custom_input_component"
                ></textarea>
                {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
              </div>

              <div className="flex justify-center pt-7">
                <Button varient={"fill"} type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;