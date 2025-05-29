import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;


const eventReviewSlice = createSlice({
  name: "eventReview",
  initialState: {
    data: {
      average_rating: 0,
      total_reviews: 0,
      positive_percentage: 0,
      rating_breakdown: {},
      reviews: [],
    },
    isLoading: true,
  },
  reducers: {
    setEventReviewData(state, action) {
      state.data = action.payload;
    },
    setEventReviewLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setEventReviewData, setEventReviewLoading } = eventReviewSlice.actions;
export default eventReviewSlice.reducer;

export const fetchEventReviewData = (eventId) => async (dispatch) => {
  dispatch(setEventReviewLoading(true));
  try {
    const response = await axios.get(`${rootUrl}api/web/event-review/list`, {
      params: { event_id: eventId },
    });
    if (response && response.data.error === 0) {
      dispatch(setEventReviewData(response.data.data));
    }
  } catch (error) {
    console.log(error.message || "Failed to fetch event reviews");
  } finally {
    dispatch(setEventReviewLoading(false));
  }
};