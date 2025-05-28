import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;


const initialState = {
  data: [],
};

const footerSlice = createSlice({
  name: "footerMenu",
  initialState,
  reducers: {
    setFooterData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setFooterData } = footerSlice.actions;
export default footerSlice.reducer;

export const getFooterMenuList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${rootUrl}api/web/menu/list?menu_id=2`);
    if (response?.data?.error === 0) {
      dispatch(setFooterData(response.data.data));
    } else {
      console.error("Error:", response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
