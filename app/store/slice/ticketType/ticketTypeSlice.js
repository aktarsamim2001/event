import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Ensure BASE_URL is correctly set in your environment variables
const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;


const ticketTypeSlice = createSlice({
  name: "ticketTypes",
  initialState: {
    data: [],       
    status: "idle", 
    error: null, 
  },
  reducers: {
    setTicketTypes(state, action) {
      state.data = action.payload;
    },
    setTicketTypesLoading(state, action) {
      state.status = action.payload ? "loading" : "idle";
    },
    setTicketTypesError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setTicketTypes, setTicketTypesLoading, setTicketTypesError } = ticketTypeSlice.actions;


export const fetchTicketTypes = () => async (dispatch) => {
  dispatch(setTicketTypesLoading(true));
  try {
    const response = await axios.get(`${rootUrl}api/web/ticket-types/list`);
    if (response.data && response.data.error === 0) {
      dispatch(setTicketTypes(response.data.data));
    }
  } catch (error) {
    console.error("API Request failed:", error);
    dispatch(setTicketTypesError(error.message || "Something went wrong"));
  } finally {
    dispatch(setTicketTypesLoading(false));
  }
};

export default ticketTypeSlice.reducer;