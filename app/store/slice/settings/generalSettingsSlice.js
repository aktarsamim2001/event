// features/settings/generalSettingsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

const initialState = {
  data: {},
  status: false,
  error: null,
};

const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    setGeneralSettings(state, action) {
      state.data = action.payload;
    },
    setSettingsLoading(state, action) {
      state.status = action.payload;
    },
    setSettingsError(state, action) {
      state.status = false;
      state.error = action.payload;
    },
  },
});

export const {
  setGeneralSettings,
  setSettingsLoading,
  setSettingsError,
} = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;

// Thunk function
export const fetchGeneralSettings = () => {
  return async (dispatch) => {
    dispatch(setSettingsLoading(true));
    try {
      const response = await axios.get(`${rootUrl}api/web/general-settings`);
      if (response?.data?.data) {
        dispatch(setGeneralSettings(response.data.data));
      } else {
        dispatch(setSettingsError("No data found"));
      }
    } catch (error) {
      dispatch(setSettingsError(error.message || "Something went wrong"));
    } finally {
      dispatch(setSettingsLoading(false));
    }
  };
};
