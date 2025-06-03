import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleNavbar: false,
  navbarSearch: false,
};

const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState,
  reducers: {
    toggleNavState: (state) => {
      console.log("Toggling navbar state", state.toggleNavbar);
      state.toggleNavbar = !state.toggleNavbar;
    },
    toggleNavSearchState: (state) => {
      state.navbarSearch = !state.navbarSearch;
    },
  },
});

export const { toggleNavState, toggleNavSearchState } = navbarSlice.actions;
export default navbarSlice.reducer;
