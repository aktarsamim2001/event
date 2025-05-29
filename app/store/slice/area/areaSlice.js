import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

const areaSlice = createSlice({
  name: "areas",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setAreas(state, action) {
      state.data = action.payload;
    },
    setAreasLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setAreasError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default areaSlice.reducer;
export const { setAreas, setAreasLoading, setAreasError } = areaSlice.actions;

export const fetchAreas = () => async (dispatch) => {
  dispatch(setAreasLoading(true));
  try {
    const response = await axios.get(`${rootUrl}api/web/events/area`);
    if (response.data && response.data.error === 0) {
      dispatch(setAreas(response.data.data));
    } else {
      dispatch(setAreasError(response.data.message || "Failed to fetch areas"));
    }
  } catch (error) {
    console.error("API Request failed:", error);
    dispatch(setAreasError(error.message || "Something went wrong"));
  } finally {
    dispatch(setAreasLoading(false));
  }
};


