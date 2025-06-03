// callRequestSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { postSupportForm } from "../../services/api_service";

const callRequestSlice = createSlice({
  name: "formRequest",
  initialState: {
    data: {},
    status: "idle",
    error: null,
    isSubmitted: false,
    message: "",
  },
  reducers: {
    setCallData(state, action) {
      state.data = action.payload;
      state.isSubmitted = true;
      state.message = "Support enquiry submitted successfully";
    },
    setCallLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setCallError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetCallRequest(state) {
      state.data = {};
      state.status = "idle";
      state.error = null;
      state.isSubmitted = false;
      state.message = "";
    },
  },
});

export const { setCallData, setCallLoading, setCallError, resetCallRequest } =
  callRequestSlice.actions;
export default callRequestSlice.reducer;

export const handleCallRequestResponse = (response) => async (dispatch) => {
  // We will remove setCallLoading(false) from here initially
  try {
    if (response?.data?.error === 0) {
      dispatch(setCallData(response.data.data));
      dispatch(setCallLoading(false)); // Moved to submitCallRequest
      return true;
    } else {
      dispatch(setCallError(response.data.message || "Request failed"));
      // dispatch(setCallLoading(false)); // Moved to submitCallRequest
      return false;
    }
  } catch (error) {
    dispatch(setCallError(error.message || "An unexpected error occurred"));
    dispatch(setCallLoading(false)); // Moved to submitCallRequest
    return false;
  }
  // 'finally' block removed from here to control loading state more precisely
};

export const submitCallRequest = (formData) => async (dispatch) => {
  dispatch(setCallLoading(true));
  try {
    const response = await postSupportForm(formData);
    console.log("Response from API:", response.data);
    dispatch(setCallData(response.data.data));
    // dispatch(handleCallRequestResponse(response.data));
  } catch (error) {
    dispatch(setCallError(error.message || "Failed to submit request"));
    return false;
  } finally {
    dispatch(setCallLoading(false));
  }
};
