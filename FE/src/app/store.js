import { configureStore } from "@reduxjs/toolkit";
import redCoord from "../reducers/generalCoord";

export default configureStore({
  reducer: {
    coord: redCoord,
  },
});
