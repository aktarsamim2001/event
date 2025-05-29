import { createSlice } from "@reduxjs/toolkit";
import { postEventEnquiry } from "../../services/api_service";

const eventEnquirySlice = createSlice({
  name: "eventEnquiry",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    isSubmitted: false,
    message: "",
    event_id: "",
  },
  reducers: {
    setEventEnquiryData(state, action) {
      state.data = action.payload;
      state.isSubmitted = true;
      state.message = "Event enquiry submitted successfully";
      state.event_id = action.payload?.event_id || "";
    },
    setEventEnquiryLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setEventEnquiryError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetEventEnquiry(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
      state.isSubmitted = false;
      state.message = "";
      state.event_id = "";
    },
  },
});

export const {
  setEventEnquiryData,
  setEventEnquiryLoading,
  setEventEnquiryError,
  resetEventEnquiry,
} = eventEnquirySlice.actions;

export default eventEnquirySlice.reducer;

// Handle response
export const handleEventEnquiryResponse = (response) => async (dispatch) => {
  try {
    if (response?.data?.error === 0) {
      dispatch(setEventEnquiryData(response.data.data));
      return true;
    } else {
      dispatch(setEventEnquiryError(response.data.message || "Request failed"));
      return false;
    }
  } catch (error) {
    dispatch(setEventEnquiryError(error.message || "Unexpected error"));
    return false;
  } finally {
    dispatch(setEventEnquiryLoading(false));
  }
};

// Action to submit an event enquiry
export const submitEventEnquiry = (data) => async (dispatch) => {
  dispatch(setEventEnquiryLoading(true));
  try {
    const response = await postEventEnquiry(data);
    return dispatch(handleEventEnquiryResponse(response));
  } catch (error) {
    dispatch(setEventEnquiryError(error.message || "Failed to submit enquiry"));
    return false;
  }
};
