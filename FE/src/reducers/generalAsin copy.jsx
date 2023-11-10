import { createSlice } from "@reduxjs/toolkit";

export const asinSlice = createSlice({
  name: "asin",
  initialState: {
    value: null,
  },
  reducers: {
    asinUpdate: (state, action) => {
      action.payload === state.value
        ? (state.value = null)
        : (state.value = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { asinUpdate } = asinSlice.actions;

export default asinSlice.reducer;
