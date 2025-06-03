import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

const dynamicPageSlice = createSlice({
  name: "dynamicPage",
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    setPageData(state, action) {
      state.data = action.payload;
    },
    setPageLoading(state, action) {
      state.isLoading = action.payload;
    },
    clearPageData(state) {
      state.data = null;
      state.isLoading = true;
    },
  },
});

export const { setPageData, setPageLoading, clearPageData } = dynamicPageSlice.actions;
export default dynamicPageSlice.reducer;

export const fetchPageData = (slug = "", latitude = "", longitude = "") => async (dispatch) => {
  dispatch(setPageLoading(true));
  try {
    const response = await axios.get(`${rootUrl}api/web/pages/list`, {
      params: { slug, latitude, longitude },
    });
    if (response) {
      dispatch(setPageData(response.data.data));
    }
  } catch (error) {
    console.log(error.message || "Something went wrong");
  } finally {
    dispatch(setPageLoading(false));
  }
};
