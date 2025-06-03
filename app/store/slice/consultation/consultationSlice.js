import { createSlice } from "@reduxjs/toolkit";
import { postBookConsultation } from "../../services/api_service";

const consultationSlice = createSlice({
  name: "consultation",
  initialState: {
    data: {},
    status: "idle",
    error: null,
    isSubmitted: false,
    message: "",
  },
  reducers: {
    setConsultationData(state, action) {
      state.data = action.payload;
      state.isSubmitted = true;
      state.status = "succeeded";
      state.error = null;
    },
    setConsultationLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setConsultationError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetConsultation(state) {
      state.data = {};
      state.status = "idle";
      state.error = null;
      state.isSubmitted = false;
      state.message = "";
    },
  },
});

export const {
  setConsultationData,
  setConsultationLoading,
  setConsultationError,
  resetConsultation,
} = consultationSlice.actions;

export default consultationSlice.reducer;

// Action to handle the consultation booking response
export const handleConsultationResponse = (response) => async (dispatch) => {
  try {
    // Check if we have a successful response
    if (response && response.data && response.data.error === 0) {
      dispatch(setConsultationData(response.data.data || {}));
      return true;
    } else {
      // Handle error format from your API
      const errorMessage = response?.data?.message || "Request failed";
      dispatch(setConsultationError(errorMessage));
      return false;
    }
  } catch (error) {
    dispatch(
      setConsultationError(error.message || "An unexpected error occurred")
    );
    return false;
  } finally {
    dispatch(setConsultationLoading(false));
  }
};

// Action to submit a consultation booking
export const submitConsultation = (formData, isOk) => async (dispatch) => {
  dispatch(setConsultationLoading(true));

  try {
    const response = await postBookConsultation(formData);
    dispatch(handleConsultationResponse(response));
    isOk?.();
  } catch (error) {
    // Handle axios error response
    if (error.response && error.response.data) {
    } else {
      dispatch(
        setConsultationError(error.message || "Failed to book consultation")
      );
    }
    return false;
  } finally {
    dispatch(setConsultationLoading(false));
  }
};
