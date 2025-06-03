import axios from "axios";
const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchEventsAPI = async ({
  page = 1,
  perPage = 10,
  search = "",
  dateFrom = "",
  dateTo = "",
  category = "",
  city = "",
  area = "",
  ticketType = [],
  sort = "date_asc",
  subCategory = [],
}) => {
  try {
    const url = `${rootUrl}api/web/events/list`;

    const response = await axios.get(url, {
      params: {
        page,
        perPage,
        search,
        date_from: dateFrom,
        date_to: dateTo,
        event_category_id: category,
        city_slug: city,
        area,
        ticket_type_id: ticketType.join(",") || "",
        sort,
        sub_category_id: subCategory.join(",") || "",
      },
    });

    if (response.data.error !== 0) {
      throw new Error(response.data.message || "API returned an error");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const getGenaralSettings = async () => {
  return await axios.get(`${rootUrl}api/web/general-settings`);
};

export const fetchEventDetailsAPI = async (slug) => {
  const url = `${rootUrl}api/web/events/details/${slug}`;
  const response = await axios.get(url);
  return response.data;
};

export const postCallRequest = async (data) => {
  return await axios.post(
    `${rootUrl}api/web/enquiry-call-request/create`,
    data
  );
};

// Add this function to your api_service.js
export const postBookConsultation = async (data) => {
  return await axios.post(
    `${rootUrl}api/web/enquiry-book-consultation/create`,
    data
  );
};

export const postPartnerWithUs = async (data) => {
  return await axios.post(
    `${rootUrl}api/web/enquiry-partner-withus/create`,
    data
  );
};

export const postEventEnquiry = async (data) => {
  return await axios.post(`${rootUrl}api/web/event-enquiry/create`, data);
};

export const postSupportForm = async (formData) => {
  try {
    const data = await axios.post(
      `${rootUrl}api/web/support-enquiry/create`,
      formData
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit request"
    );
  }
};

export const getEventReviews = async () => {
  const response = await axios.get(
    `${rootUrl}api/web/event-review/list?event_id=${event_id}`
  );
  return response.data;
};
