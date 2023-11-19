import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const filteredArticle = createSlice({
  name: "FilteredArticles",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {
    setArticles: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setArticles, setError, setLoading } = filteredArticle.actions;

// Azione asincrona per ottenere gli articoli
export const getArticles = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log(payload);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/post/byLocation`,
      payload
    );
    dispatch(setArticles(response.data.payload));
    console.log(response.data.payload);
  } catch (err) {
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export default filteredArticle.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const filteredArticle = createSlice({
//   name: "FilteredArticles",
//   initialState: {
//     data: null,
//     error: null,
//     loading: null,
//   },
//   reducers: {
//     getArticles: async (state, action) => {
//       console.log(action);
//       try {
//         state.loading = true;
//         const response = await axios.get(
//           `${process.env.REACT_APP_URL}/post/byLocation`,
//           action.payload
//         );
//         state.data = response.data;
//       } catch (err) {
//         state.data = err;
//       } finally {
//         state.loading = false;
//       }
//     },
//   },
//   //
// });

// export const { getArticles } = filteredArticle.actions;

// export default filteredArticle.reducer;
