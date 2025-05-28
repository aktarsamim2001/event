import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  address: null,
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setGlobalData: (state, action) => {
      state.data = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export default globalSlice.reducer;
export const { setLoading, setGlobalData, setAddress } = globalSlice.actions;
