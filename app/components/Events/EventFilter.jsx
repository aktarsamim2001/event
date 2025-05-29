"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoChevronDown } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";
import DatePicker from "react-datepicker";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { fetchAreas } from "../../store/slice/area/areaSlice";
import { fetchTicketTypes } from "../../store/slice/ticketType/ticketTypeSlice";
import "react-datepicker/dist/react-datepicker.css";
import {
  getEventFilterData,
  resetFilterFormValues,
  setFilterFormValues,
} from "../../store/slice/eventFilter/eventFilterSlice";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useSearchParams, usePathname } from "next/navigation";

// Custom CSS for date pickers
const datePickerStyles = `
.react-datepicker {
    background: #22F106;
    border: 2px solid #ffffff33;
    border-radius: 8px;
    overflow: hidden;
    color: white;
    font-family: inherit;
  }
  .react-datepicker__header {
    background: #2a2a2a;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    padding: 12px 0;
  }
  .react-datepicker__day, .react-datepicker__day-name {
    color: white;
    font-size: 14px;
  }
  .react-datepicker__day:hover {
    background: red;
    border-radius: 6px;
    color: black;
    transition: background 0.2s ease;
  }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background: green !important;
    color: white !important;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .react-datepicker__day--today {
    background: none;
    border-radius: 4px;
    font-weight: bold;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__navigation-icon::before {
    border-color: #22F106;
  }
  .react-datepicker__month-container {
    background: #1a1a1a;
  }
  .react-datepicker__current-month {
    color: white;
    font-size: 16px;
  }
  .react-datepicker-popper {
    z-index: 999;
  }
  .react-datepicker__input-container input {
    background: #22F106 !important;
    color: white !important;
    border: 1px solid transparent;
    border-radius: 7px;
    padding: 8px 12px;
    width: 100%;
    font-size: 14px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .react-datepicker__input-container input:focus {
  border-color: #22F106 !important;
    outline: none !important;
    
  }
  .react-datepicker__input-container input::placeholder {
    color: #ffffff80;
  }
  .react-datepicker__input-container input.has-date {
    border-color: #22F106 !important;
  }
@media (max-width: 768px) {
 .datepicker-left-popup {
    position: absolute !important;
    left: 0 !important;
    right: auto !important;
    top: 40px !important;
    transform: none !important;
    z-index: 9999 !important;
  }
  .datepicker-right-popup {
    position: absolute !important;
    right: 0 !important;
    left: auto !important;
    top: 40px !important;
    transform: none !important;
    z-index: 9999 !important;
  }
}
`;

const EventFilter = ({ search, isSearchVisible }) => {
  const dispatch = useDispatch();
  const { data: eventFilterData } = useSelector(
    (state) => state.eventFilterSlice
  );
  const filterFormValues = useSelector(
    (state) => state.eventFilterSlice.filterFormValues
  );
  const { data: areaData } = useSelector((state) => state.areas);
  const { data: ticketTypeData } = useSelector((state) => state.ticketTypes);

  // Next.js search params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [expand, setExpand] = useState(false);
  const [eventFilteredItems, setEventFilteredItems] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [categoryName, setCategoryName] = useState();
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormValues(JSON.parse(localStorage.getItem("filterFormValues")));
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchAreas());
    dispatch(fetchTicketTypes());
    dispatch(getEventFilterData);
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleExpand = () => setExpand(!expand);

  const handleEventCatChange = (e) => {
    const value = e.target.value;
    setValue("event_category_id", value);
    setCategoryName(
      eventFilterData.find((item) => item.id === value)?.title || []
    );
    setEventFilteredItems(
      eventFilterData.find((item) => item.id === value)?.children || []
    );
  };

  useEffect(() => {
    setEventFilteredItems(
      eventFilterData.flatMap((item) => item.children || [])
    );
  }, [eventFilterData]);

  useEffect(() => {
    if (formValues && Object.keys(formValues).length > 0) {
      if (formValues.dateFrom) {
        formValues.dateFrom = new Date(formValues.dateFrom);
      }
      if (formValues.dateTo) {
        formValues.dateTo = new Date(formValues.dateTo);
      }
      reset(formValues);
    }
  }, [formValues, reset]);

  const onSubmit = async (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("filterFormValues", JSON.stringify(data));
    }
    const selectedCategory = eventFilterData.find(
      (item) => item.id === data.event_category_id
    );
    const categoryTitle = selectedCategory?.title || "All Events";
    setCategoryName(categoryTitle);
    const cleanUrlData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "event_category_id") {
        cleanUrlData[key] = value;
      }
    });
    if (data.event_category_id && data.event_category_id !== "all-events") {
      cleanUrlData.event_category_id = data.event_category_id;
    }
    if (data.area) {
      const selectedArea = areaData.find((area) => area.name === data.area);
      if (selectedArea) {
        cleanUrlData.area = selectedArea.name;
      }
    }
    // Next.js: update URL search params
    if (typeof window !== "undefined") {
      const newParams = new URLSearchParams();
      Object.entries(cleanUrlData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          newParams.set(key, value);
        }
      });
      const url = `${pathname}?${newParams.toString()}`;
      window.history.replaceState(null, "", url);
    }
  };

  const handleReset = () => {
    reset({
      date_from: null,
      date_to: null,
      event_category_id: "all-events",
      sort: "",
      search: "",
      area: "",
      ticket_type_id: "",
      event_subcategory: "",
    });
    setEventFilteredItems([]);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathname);
      localStorage.removeItem("filterFormValues");
    }
    setEventFilteredItems(
      eventFilterData.flatMap((item) => item.children || [])
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const getFormdata = JSON.parse(localStorage.getItem("filterFormValues"));
    const urlParams = new URLSearchParams(window.location.search);
    const formValues = {
      date_from: urlParams.get("date_from") || getFormdata?.date_from || null,
      date_to: urlParams.get("date_to") || getFormdata?.date_to || null,
      event_category_id:
        urlParams.get("event_category_id") ||
        getFormdata?.event_category_id ||
        "all-events",
      sort: urlParams.get("sort") || getFormdata?.sort || "",
      search: urlParams.get("search") || getFormdata?.search || "",
      area: urlParams.get("area") || getFormdata?.area || "",
      event_type: urlParams.get("event_type") || getFormdata?.event_type || "",
      ticket_type_id:
        urlParams.get("ticket_type_id") || getFormdata?.ticket_type_id || "",
      event_subcategory:
        urlParams.get("event_subcategory") ||
        getFormdata?.event_subcategory ||
        "",
    };
    reset(formValues);
    const selectedCategory = eventFilterData.find(
      (item) => item.id === formValues.event_category_id
    );
    setCategoryName(selectedCategory?.title || "All Events");
    setEventFilteredItems(selectedCategory?.children || []);
    if (formValues.event_subcategory && selectedCategory?.children) {
      setTimeout(() => {
        setValue("event_subcategory", formValues.event_subcategory);
      }, 0);
    }
  }, [reset, eventFilterData]);

  return (
    <div className="__container __responsive_gap">
      <style>{datePickerStyles}</style>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSearchVisible && (
          <div>
            <div className="text-[clamp(32px,_6vw,_45px)] __heading leading-tight">
              {search?.title}
            </div>
            <div className="mb-6 __text text-[20px]">{search?.content}</div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:flex items-center gap-x-3 flex-wrap justify-center gap-y-2">
          <div className="grid grid-cols-2 lg:grid-cols-[180px_auto_180px] gap-x-2 items-center">
            <div className="relative">
              <Controller
                control={control}
                name="date_from"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      const formattedDate = dayjs(date).format("YYYY-MM-DD");
                      field.onChange(formattedDate);
                    }}
                    autoComplete="off"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="From"
                    showPopperArrow={true}
                    className="!py-2 !px-3 !bg-[#FFFFFF26] !text-white !rounded-[7px] w-full"
                    wrapperClassName="w-full"
                    ariaLabelledBy="date-from-label"
                    popperPlacement="auto"
                    popperClassName="datepicker-left-popup"
                  />
                )}
              />
              <MdOutlineCalendarMonth
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg cursor-pointer"
                onClick={() =>
                  document
                    .querySelector(".react-datepicker__input-container input")
                    ?.focus()
                }
              />
            </div>
            <div className="__text text-center hidden md:block">To</div>
            <div className="relative">
              <Controller
                control={control}
                name="date_to"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      const formattedDate = dayjs(date).format("YYYY-MM-DD");
                      field.onChange(formattedDate);
                    }}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="To"
                    minDate={
                      watch("date_from") ? new Date(watch("date_from")) : null
                    }
                    autoComplete="off"
                    showPopperArrow={true}
                    className="!py-2 !px-3 !bg-[#FFFFFF26] !text-white !rounded-[7px] w-full"
                    wrapperClassName="w-full"
                    ariaLabelledBy="date-to-label"
                    popperPlacement="auto"
                    popperClassName="datepicker-right-popup"
                  />
                )}
              />
              <MdOutlineCalendarMonth
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg cursor-pointer"
                onClick={() =>
                  document
                    .querySelectorAll(
                      ".react-datepicker__input-container input"
                    )[1]
                    ?.focus()
                }
              />
            </div>
          </div>

          <div className="relative lg:w-[200px]">
            <Select
              {...register("event_category_id")}
              onChange={handleEventCatChange}
              className="!text-white !bg-[#FFFFFF26] transition-all w-full appearance-none !py-2 !px-2 !pr-6 !rounded-[7px] overflow-auto"
            >
              <option value="all-events" className="text-black">
                All Events
              </option>
              {eventFilterData.map((item) => (
                <option key={item.id} value={item.id} className="text-black">
                  {item.title}
                </option>
              ))}
            </Select>
            <span className="absolute right-2 top-[14px] text-white">
              <GoChevronDown />
            </span>
          </div>

          <div className="relative lg:w-[200px]">
            <Select
              {...register("sort")}
              className="!text-white !bg-[#FFFFFF26] transition-all w-full appearance-none !py-2 !px-2 !pr-6 !rounded-[7px] overflow-auto"
            >
              <option value="" className="text-black">
                Sort By
              </option>
              <option value="date_asc" className="text-black">
                Events, Sooner to Later
              </option>
              <option value="date_desc" className="text-black">
                Events, Later to Sooner
              </option>
              <option value="price_asc" className="text-black">
                Price, Low to High
              </option>
              <option value="price_desc" className="text-black">
                Price, High to Low
              </option>
            </Select>
            <span className="absolute right-2 top-[14px] text-white">
              <GoChevronDown />
            </span>
          </div>

          <div className="min-w-[240px] max-w-[450px]" style={{ flexGrow: 1 }}>
            <Input
              type="text"
              {...register("search")}
              className="text-[14px] py-[10px] !px-4 !rounded-[7px] !w-full"
              placeholder="Look out for event name, artists, categories etc"
            />
          </div>

          <div>
            <button
              type="button"
              className="px-3 cursor-pointer h-full py-2 __accent_color inline-flex items-center gap-x-2"
              onClick={toggleExpand}
            >
              <span>More Filters</span>
              <FaChevronDown
                className="text-[14px]"
                style={{
                  transform: `rotate(${expand ? "180deg" : "0"})`,
                  transition: "all .3s ease",
                }}
              />
            </button>
          </div>
        </div>

        <div
          className="transition-all duration-300 ease-in-out overflow-hidden mt-4"
          style={{ height: expand ? "auto" : "0" }}
        >
          <div
            style={{
              transform: `scaleY(${expand ? "1" : "0"})`,
              transition: "all .3s ease",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full">
                <Select
                  {...register("area")}
                  className="!text-white !bg-[#FFFFFF26] transition-all w-full appearance-none !py-2 !px-2 !pr-6 !rounded-[7px] overflow-auto"
                  // onChange={(e) => getAreaId(e.target.value)}
                >
                  <option className="text-black" value="">
                    Select Area
                  </option>
                  {areaData?.map((item, i) => (
                    <option className="text-black" key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                <span className="absolute right-2 top-[14px] text-white">
                  <GoChevronDown />
                </span>
              </div>

              <div className="relative w-full">
                <Select
                  {...register("event_type")}
                  className="!text-white !bg-[#FFFFFF26] transition-all w-full appearance-none !py-2 !px-2 !pr-6 !rounded-[7px] overflow-auto"
                >
                  <option className="text-black" value="">
                    Event Type
                  </option>
                  <option value="trending-event" className="text-black">
                    Trending Event
                  </option>
                  <option value="featured-event" className="text-black">
                    Featured Event
                  </option>
                  <option value="upcoming-event" className="text-black">
                    Upcoming Event
                  </option>
                </Select>
                <span className="absolute right-2 top-[14px] text-white">
                  <GoChevronDown />
                </span>
              </div>

              <div className="relative w-full">
                <Select
                  {...register("ticket_type_id")}
                  className="!text-white !bg-[#FFFFFF26] transition-all w-full appearance-none !py-2 !px-2 !pr-6 !rounded-[7px] overflow-auto"
                  onChange={(e) => getTicketId(Number(e.target.value))}
                >
                  <option className="text-black" value="">
                    Select Ticket Type
                  </option>
                  {ticketTypeData.map((item, i) => (
                    <option
                      className="text-black"
                      key={item.id}
                      value={item.id}
                    >
                      {item.title}
                    </option>
                  ))}
                </Select>
                <span className="absolute right-2 top-[14px] text-white">
                  <GoChevronDown />
                </span>
              </div>

              <div className="relative w-full">
                <Select
                  {...register("event_subcategory")}
                  className="!text-white !bg-[#FFFFFF26] transition-all w-full appearance-none !py-2 !px-2 !pr-6 !rounded-[7px] overflow-auto"
                  // onChange={(e) => getSubCategoryId(e.target.value)}
                >
                  <option className="text-black" value="">
                    Select Sub Category
                  </option>
                  {eventFilteredItems.length ? (
                    eventFilteredItems.map((item) => (
                      <option
                        className="text-black"
                        key={item.id}
                        value={item.id}
                      >
                        {item.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>No subcategories available</option>
                  )}
                </Select>
                <span className="absolute right-2 top-[14px] text-white">
                  <GoChevronDown />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:justify-center justify-start mt-6 gap-x-3">
          <Button
            type="submit"
            varient={"fill"}
            className="!py-2.5 !rounded-[7px] block"
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            varient={"outline"}
            className="!py-2.5 !rounded-[7px] block"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventFilter;
