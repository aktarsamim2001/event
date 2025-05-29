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
    }
  },
});

export const { setCallData, setCallLoading, setCallError, resetCallRequest } = callRequestSlice.actions;
export default callRequestSlice.reducer;

// Action to handle the call request response
export const handleCallRequestResponse = (response) => async (dispatch) => {
  try {
    if (response?.data?.error === 0) {
      dispatch(setCallData(response.data.data));
      return true;
    } else {
      dispatch(setCallError(response.data.message || "Request failed"));
      return false;
    }
  } catch (error) {
    dispatch(setCallError(error.message || "An unexpected error occurred"));
    return false;
  } finally {
    dispatch(setCallLoading(false));
  }
};

// Action to submit a call request
export const submitCallRequest = (formData) => async (dispatch) => {
  dispatch(setCallLoading(true));
  try {
    const response = await postSupportForm(formData);
    return dispatch(handleCallRequestResponse(response));
  } catch (error) {
    dispatch(setCallError(error.message || "Failed to submit request"));
    return false;
  }
};
