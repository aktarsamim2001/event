import { createSlice } from "@reduxjs/toolkit";
import { fetchEventsAPI } from "../../services/api_service";

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        data: {
            events: [],
            currentPage: 1,
            perPage: 10,
            total: 0,
            totalPages: 0,
        },
        status: "idle",
        error: null,
        filters: {
            search: "",
            dateFrom: "",
            dateTo: "",
            category: "",
            sortBy: "date_asc",
            cityId: "",
            area: "",
            ticketType: [],
            subCategory: [],
        },
    },
    reducers: {
        setEvents(state, action) {
            state.data = action.payload;
        },
        setEventsLoading(state, action) {
            state.status = action.payload ? "loading" : "idle";
        },
        setEventsError(state, action) {
            state.status = "failed";
            state.error = action.payload;
        },
        updateFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters(state) {
            state.filters = {
                search: "",
                dateFrom: "",
                dateTo: "",
                category: "",
                sortBy: "date_asc",
                cityId: "",
                area: "",
                ticketType: [],
                subCategory: [],
            };
        },
        setPage(state, action) {
            state.data.currentPage = action.payload;
        },
    },
});

export const {
    setEvents,
    setEventsLoading,
    setEventsError,
    updateFilters,
    resetFilters,
    setPage,
} = eventsSlice.actions;

export default eventsSlice.reducer;


export const fetchEvents = () => async (dispatch, getState) => {
    dispatch(setEventsLoading(true));
    try {
        const state = getState();
        const { data: { currentPage, perPage }, filters } = state.events;

        const data = await fetchEventsAPI({
            page: currentPage,
            perPage,
            search: filters.search,
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo,
            category: filters.category,
            cityId: filters.cityId,
            area: filters.area,
            ticketType: filters.ticketType,
            sort: filters.sortBy,
            subCategory: filters.subCategory,
        });

        if (data.error === 0) {
            dispatch(setEvents({
                events: data.events,
                currentPage: data.currentPage,
                perPage: data.perPage,
                total: data.total,
                totalPages: data.totalPages,
            }));
        } else {
            dispatch(setEventsError(data.message || "Failed to fetch events"));
        }
    } catch (error) {
        dispatch(setEventsError(error.message || "Something went wrong"));
    } finally {
        dispatch(setEventsLoading(false));
    }
};

// Apply filters and fetch events
export const applyFilters = (filters) => async (dispatch) => {
    dispatch(updateFilters(filters));
    dispatch(setPage(1));
    dispatch(fetchEvents());
};

// Reset filters and fetch events
export const clearFilters = () => async (dispatch) => {
    dispatch(resetFilters());
    dispatch(setPage(1));
    dispatch(fetchEvents());
};

// Selectors
export const selectEventsLoading = (state) => state.events.status === "loading";
export const selectPaginationInfo = (state) => ({
    currentPage: state.events.data.currentPage,
    totalPages: state.events.data.totalPages,
    total: state.events.data.total,
    perPage: state.events.data.perPage,
});
export const selectFilters = (state) => state.events.filters;