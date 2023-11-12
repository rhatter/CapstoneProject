import { createSlice } from "@reduxjs/toolkit";

export const redCoord = createSlice({
  name: "coord",
  initialState: {
    value: { latitude: null, longitude: null },

    error: null,
  },
  reducers: {
    CoordUpdate: (state, action) => {
      state.value = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { CoordUpdate } = redCoord.actions;

export default redCoord.reducer;
