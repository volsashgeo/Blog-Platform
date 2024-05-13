import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice';
// import pageReducer from './pageSlice';
// import ticketsReducer from './ticketsSlice';
import * as appSelectors from './selectors';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    // page: pageReducer,
    // tickets: ticketsReducer,
  },
});

export { appSelectors };
