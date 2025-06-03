"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { isValid } from "date-fns";
import { FaClock, FaUser, FaPhoneAlt, FaCalendar } from "react-icons/fa";
import { IoIosArrowBack, IoMdMail } from "react-icons/io";
import { BiSolidMessageSquare } from "react-icons/bi";
import "react-day-picker/dist/style.css";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  submitConsultation,
  resetConsultation,
} from "../../store/slice/consultation/consultationSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getLocalMidnightDate(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function BookConsultation({ content }) {
  const data = content?.consultation_form_page?.page_details;
  const timeSlot = content?.consultation_form_page?.booking_slots;
  const dispatch = useDispatch();
  const consultationStatus = useSelector((state) => state.consultation.status);
  const consultationError = useSelector((state) => state.consultation.error);

  const defaultDate = getLocalMidnightDate();
  const [selected, setSelected] = useState(defaultDate);

  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const isLoading = consultationStatus === "loading";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetConsultation());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selected && errors.date) {
      setErrors((prev) => ({ ...prev, date: null }));
    }
  }, [selected, errors.date]);

  useEffect(() => {
    if (selectedTime && errors.time) {
      setErrors((prev) => ({ ...prev, time: null }));
    }
  }, [selectedTime, errors.time]);

  useEffect(() => {
    if (consultationStatus === "succeeded") {
      // setIsSubmitted(true);
      // setIsSubmitting(false);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (consultationStatus === "failed") {
      setIsSubmitting(false);
      if (consultationError) {
        setErrors((prev) => ({ ...prev, api: consultationError }));
        toast.error(consultationError);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    // If status is idle, reset isSubmitting
    if (consultationStatus === "idle") {
      setIsSubmitting(false);
    }
  }, [consultationStatus, consultationError]);

  // Show toast only when isSubmitted changes to true
  useEffect(() => {
    if (isSubmitted) {
      toast.success(
        data?.successMessage ||
          "Your consultation request has been submitted successfully!"
      );
    }
  }, [isSubmitted, data?.successMessage]);

  // Ensure local isSubmitted is false when redux status is reset
  // useEffect(() => {
  //   if (consultationStatus === "idle" && isSubmitted) {
  //     // setIsSubmitted(false);
  //   }
  // }, [consultationStatus, isSubmitted]);

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Description is required";

    // Email format validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone format validation (basic check)
    if (formData.phone && formData.phone.length < 10) {
      newErrors.phone =
        "Please enter a valid phone number with at least 10 digits";
    }

    // Date validation - must be selected and valid
    if (!selected) {
      newErrors.date = "Please select a consultation date";
    } else if (!isValid(selected)) {
      newErrors.date = "Selected date is invalid";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedCopy = new Date(selected);
      selectedCopy.setHours(0, 0, 0, 0);

      if (selectedCopy < today) {
        newErrors.date = "Cannot select a date in the past";
      }
    }
    // Time validation - must be selected
    if (!selectedTime || selectedTime.trim() === "") {
      newErrors.time = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForServer = (date) => {
    if (!date) return "";

    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, api: null }));
    if (!validateForm()) {
      return;
    }

    const formattedDate = formatDateForServer(selected);

    if (!formattedDate) {
      setErrors((prev) => ({
        ...prev,
        date: "Valid consultation date is required",
      }));
      return;
    }

    let formattedTime = "";
    if (selectedTime) {
      const timeParts = selectedTime.match(/(\d+):(\d+)\s(AM|PM)/);
      if (timeParts) {
        let hours = parseInt(timeParts[1]);
        const minutes = timeParts[2];
        const period = timeParts[3];

        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        formattedTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
      }
    }

    const selectedSlot = timeSlot?.slots.find((time) => {
      const slotLabel = `${formatTo12Hour(
        time.slot_start_time
      )} - ${formatTo12Hour(time.slot_end_time)}`;
      return slotLabel === selectedTime;
    });

    const formPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.phone.trim(),
      message: formData.message.trim(),
      consultation_date: formattedDate,
      consultation_time: selectedTime, // Send the AM/PM label directly
    };

    console.log("Submitting formPayload:", formPayload);
    setIsSubmitting(true);

    try {
      dispatch(
        submitConsultation(formPayload, () => {
          setIsSubmitted(true);
        })
      );
    } catch (error) {
      console.error("Error submitting consultation", error);
      setIsSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        api: error.message || "An unexpected error occurred",
      }));
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    const resetTomorrow = new Date();
    resetTomorrow.setDate(resetTomorrow.getDate() + 1);
    setSelected(resetTomorrow);

    setSelectedTime("");
    setErrors({});
    dispatch(resetConsultation());
  };

  console.log("is submitted:", isSubmitted);

  if (isSubmitted) {
    return (
      <div className="bg-black relative">
        <div className="__container bg-black pt-[90px]">
          <div className="__gradient rounded-2xl shadow-lg overflow-hidden">
            <div className="text-center py-10 flex flex-col items-center justify-center">
              <div className="bg-[#22F106] bg-opacity-20 border border-[#22F106] rounded-full p-4 mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 __heading">
                {data?.successMessage ||
                  "Your consultation request has been submitted successfully!"}
              </h2>
              <Button
                variant="fill" // Changed varient to variant
                onClick={handleReset}
                className="inline-flex items-center gap-2"
              >
                Book Another Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black relative">
      <div className="__container pt-[90px]">
        <div className="__gradient rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-white __heading inline-flex pb-3 __position_border __heading_gap pr-2">
              {data?.title}
            </h2>
            <p className="text-white text-left __text">{data?.content}</p>
          </div>

          {/* API Error Display */}
          {errors.api && (
            <div className="mx-4 md:mx-8 my-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-center">{errors.api}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-4 md:px-8 mt-2"
          >
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg text-white mb-2 __heading">
                  Personal Information
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <FaUser className="absolute left-4 top-4.5 w-5 h-5 __accent_color" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`!pl-11 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="relative">
                    <IoMdMail className="absolute left-4 top-4.5 w-5 h-5 __accent_color" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`!pl-11 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-4.5 w-5 h-5 __accent_color" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`!pl-11 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-md text-white mb-2 __heading">
                  Additional Information
                </label>
                <div className="relative flex items-center">
                  <BiSolidMessageSquare className="absolute left-4 top-4.5 w-5 h-5 __accent_color" />
                  <textarea
                    name="message"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="px-3 py-[14px] rounded-xl w-full block outline-none bg-[#ffffff1b] text-white pl-10 border custom_input_component"
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            {/* Right Column - Calendar & Time */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-white mb-2 __text">
                <FaCalendar className="inline-block w-4 h-4 mr-2 __accent_color" />
                Select Date & Time
                {errors.date && (
                  <span className="text-red-500 text-xs ml-2">
                    {errors.date}
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row lgflex-col gap-4">
                <div className="order-2 lg:order-1 grow">
                  <div className="w-[auto] lg:w-auto bg-[#5c2c12] rounded-xl border-2 border-[#8B4513] p-4">
                    <label className="block text-sm items-center font-medium text-white mb-3 __text">
                      <div className="flex items-center">
                        <FaClock className="inline-block w-4 h-4 mr-2 __accent_color" />
                        Time Slots
                      </div>
                      {errors.time && (
                        <span className="text-red-500 text-xs ml-2">
                          {errors.time}
                        </span>
                      )}
                    </label>
                    <div className="space-y-2 max-h-[310px] overflow-y-auto custom-scrollbar grid grid-cols-1 gap-y-2">
                      {timeSlot?.slots.map((time, index) => {
                        const slotLabel = `${formatTo12Hour(
                          time.slot_start_time
                        )} - ${formatTo12Hour(time.slot_end_time)}`;
                        const isSelected = selectedTime === slotLabel;
                        return (
                          <div
                            key={index}
                            className="flex items-center w-full px-1.5"
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedTime(slotLabel)}
                              className={`w-full cursor-pointer py-2 px-3 rounded-full text-sm font-medium transition-all duration-200 border text-center ${
                                isSelected
                                  ? "bg-[#CD853F] text-white border-[#CD853F]"
                                  : "text-white border-[#8B4513] hover:bg-[#8B4513]"
                              }`}
                            >
                              {slotLabel}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Calendar */}
                <div
                  className={`relative py-[15px] px-[20px] rounded-xl ${
                    errors.date
                      ? "bg-red-500 bg-opacity-20 border border-red-500"
                      : "bg-[#ffffff1b]"
                  } text-white flex justify-center`}
                >
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={(date) => {
                      if (date) {
                        const normalized = new Date(date);
                        normalized.setHours(0, 0, 0, 0);
                        setSelected(normalized);
                      } else {
                        const fallback = getLocalMidnightDate(
                          new Date(Date.now() + 24 * 60 * 60 * 1000)
                        );
                        setSelected(fallback);
                      }
                    }}
                    today={getLocalMidnightDate()}
                    disabled={{
                      before: (() => {
                        const d = getLocalMidnightDate();
                        d.setDate(d.getDate() - 1);
                        return d;
                      })(),
                    }}
                    className="book-consultation"
                    classNames={{
                      root: "text-white",
                      day: "hover:bg-[#ffffff1b]",
                      caption_label: "text-white font-semibold mb-3",
                      nav: "absolute right-0 p-2 text-white",
                      nav_button: "",
                    }}
                    modifiersStyles={{
                      selected: {
                        backgroundColor: "#1ABB00",
                        color: "white",
                        borderRadius: "50%",
                        fontSize: "15px",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Submit Controls */}
          <div className="flex justify-between items-center pb-4 px-4 md:px-8 md:pb-8 mt-10">
            <Button variant="outline" className="!p-0 !rounded-[50%]">
              <Link href="/support" className="p-3 block">
                <IoIosArrowBack className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              type="submit"
              variant="fill" // Changed varient to variant
              disabled={isLoading || isSubmitting}
              onClick={handleSubmit}
            >
              {isLoading || isSubmitting ? "Submitting..." : "Submit Message"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTo12Hour(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

export default BookConsultation;
