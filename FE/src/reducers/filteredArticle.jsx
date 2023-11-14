import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const filteredArticle = createSlice({
  name: "FilteredArticles",
  initialState: {
    data: [],
    error: null,
    loading: null,
  },
  reducers: {
    getArticles: async (state, action) => {
      console.log(action);
      try {
        state.loading = true;
        const response = await axios.get(action.payload.url);
        state.data = response.data;
      } catch (err) {
        state.data = err;
      } finally {
        state.loading = false;
      }
    },
  },
  //
});

export const { getArticles } = filteredArticle.actions;

export default filteredArticle.reducer;
