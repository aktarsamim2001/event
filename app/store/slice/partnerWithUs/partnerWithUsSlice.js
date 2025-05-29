import { createSlice } from "@reduxjs/toolkit";
import { postPartnerWithUs } from "../../services/api_service"; // make sure this exists or create it

const partnerWithUsSlice = createSlice({
  name: "partnerWithUs",
  initialState: {
    data: {},
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    isSubmitted: false,
    message: "",
  },
  reducers: {
    setPartnerData(state, action) {
      state.data = action.payload;
      state.isSubmitted = true;
      state.message = "Enquiry submitted successfully";
    },
    setPartnerLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setPartnerError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetPartnerRequest(state) {
      state.data = {};
      state.status = "idle";
      state.error = null;
      state.isSubmitted = false;
      state.message = "";
    },
  },
});

export const {
  setPartnerData,
  setPartnerLoading,
  setPartnerError,
  resetPartnerRequest,
} = partnerWithUsSlice.actions;

export default partnerWithUsSlice.reducer;

// Handle response
export const handlePartnerRequestResponse = (response) => async (dispatch) => {
  try {
    if (response?.data?.error === 0) {
      dispatch(setPartnerData(response.data.data));
      return true;
    } else {
      dispatch(setPartnerError(response.data.message || "Request failed"));
      return false;
    }
  } catch (error) {
    dispatch(setPartnerError(error.message || "Unexpected error"));
    return false;
  } finally {
    dispatch(setPartnerLoading(false));
  }
};

// Submit Partner Enquiry
export const submitPartnerRequest = (formData) => async (dispatch) => {
  dispatch(setPartnerLoading(true));
  try {
    const response = await postPartnerWithUs(formData);
    return dispatch(handlePartnerRequestResponse(response));
  } catch (error) {
    dispatch(setPartnerError(error.message || "Failed to submit enquiry"));
    return false;
  }
};
