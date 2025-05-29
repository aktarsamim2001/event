import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Initial state for event details
const initialState = {
  data: {},
  loading: false,
  error: null,
};

// Create the event details slice
const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState,
  reducers: {
    setPageData(state, action) {
      state.data = action.payload;
    },
    setPageLoading(state, action) {
      state.loading = action.payload;
    },
    setPageError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setPageData, setPageLoading, setPageError } =
  eventDetailsSlice.actions;
export default eventDetailsSlice.reducer;

// Thunk to fetch event details
export const fetchEventDetails = (slug) => async (dispatch) => {
  dispatch(setPageLoading(true));
  try {
    const response = await axios.get(
      `${rootUrl}api/web/events/details/${slug}`
    );
    if (response) {
      dispatch(setPageData(response.data.data));
    } else {
      dispatch(setPageError(response.data.message));
    }
  } catch (error) {
    dispatch(
      setPageError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching event details"
      )
    );
  } finally {
    dispatch(setPageLoading(false));
  }
};
