// features/menu/menuSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;


const initialState = {
  data: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setData } = menuSlice.actions;
export default menuSlice.reducer;

// Thunk: API call & dispatch
export const fetchMenuList = (menu_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${rootUrl}api/web/menu/list?menu_id=${menu_id}`
      );

      if (response?.data?.error === 0) {
        dispatch(setData(response.data.data));
      } else {
        console.error("Menu error:", response.data.message);
      }
    } catch (error) {
      console.error("Menu API error:", error);
    }
  };
};
