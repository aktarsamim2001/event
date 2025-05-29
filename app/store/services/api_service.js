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
