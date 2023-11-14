import { configureStore } from "@reduxjs/toolkit";
import redCoord from "../reducers/generalCoord";
import filteredArticle from "../reducers/filteredArticle";

export default configureStore({
  reducer: {
    coord: redCoord,
    FilteredArticles: filteredArticle,
  },
});
