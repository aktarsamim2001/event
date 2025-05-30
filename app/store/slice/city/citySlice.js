import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_BASE_URL;

const citySlice = createSlice({
  name: "cities",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 10
  },
  reducers: {
    setCities(state, action) {
      state.data = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.total = action.payload.total;
      state.perPage = action.payload.perPage;
    },
    setCitiesLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setCitiesError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default citySlice.reducer;
export const { setCities, setCitiesLoading, setCitiesError } = citySlice.actions;

// Fetch all cities for a specific state
export const fetchCitiesByState = (stateId) => async (dispatch) => {
  dispatch(setCitiesLoading(true));
  try {
    const response = await axios.get(`${rootUrl}api/web/cities/list?state_id=${stateId}`);
    if (response.data && response.data.error === 0) {
      dispatch(setCities({
        data: response.data.data,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
        perPage: response.data.perPage
      }));
    } else {
      dispatch(setCitiesError(response.data.message || "Failed to fetch cities"));
    }
  } catch (error) {
    console.error("API Request failed:", error);
    dispatch(setCitiesError(error.message || "Something went wrong"));
  } finally {
    dispatch(setCitiesLoading(false));
  }
};