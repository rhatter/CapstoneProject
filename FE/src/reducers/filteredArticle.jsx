import { createSlice } from "@reduxjs/toolkit";

export const filteredArticle = createSlice({
  name: "FilteredArticles",
  initialState: {
    data: [],
    error: null,
    loading: null,
  },
  reducers: {
    getArticles: async (state, action) => {
      try {
        setLoading(true);
        const response = await axios.get(action.payload.url);
        state.data = response.data;
      } catch (err) {
        state.data = err;
      } finally {
        state.loading = false;
      }
      return { data, error, loading };
    },
  },
  //
});

export const { getArticles } = filteredArticle.actions;

export default filteredArticle.reducer;
