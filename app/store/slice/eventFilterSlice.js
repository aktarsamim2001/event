import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    toggleEvent: false
}

const eventFilterSlice = createSlice({
    name: 'eventFilter',
    initialState,
    reducers: {
        toggleEventState: (state) => {
            state.toggleEvent = !state.toggleEvent;
        }
    }
});

export const { toggleEventState } = eventFilterSlice.actions;
export default eventFilterSlice.reducer;