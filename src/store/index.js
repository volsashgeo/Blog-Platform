import { configureStore } from "@reduxjs/toolkit";

import articlesReducer from "./articlesSlice";
import tokenReducer from './tokenSlice';
// import ticketsReducer from './ticketsSlice';
import * as appSelectors from "./selectors";

export default configureStore({
  reducer: {
    articles: articlesReducer,
    token: tokenReducer,
    // tickets: ticketsReducer,
  },
});

export { appSelectors };
