import { createSlice } from "@reduxjs/toolkit";

export const redCoord = createSlice({
  name: "coord",
  initialState: {
    value: { latitude: null, longitude: null },
  },
  reducers: {
    CoordUpdate: (state, action) => {
      const getGeo = () => {
        try {
          if (navigator.geolocation) {
            const result = navigator.geolocation.getCurrentPosition(
              success,
              error
            );
          } else {
            console.log("Geolocation not supported");
          }
        } catch (error) {}
      };

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(
          `dal custom hook Latitude: ${latitude}, Longitude: ${longitude}`
        );
        state.value.latitude = latitude;
        state.value.longitude = longitude;
      }
      function error() {
        console.log("Unable to retrieve your location");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { CoordUpdate } = redCoord.actions;

export default redCoord.reducer;
