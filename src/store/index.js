import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice';
import userReducer from './userSlice';
import * as appSelectors from './selectors';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});

export { appSelectors };
