import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice';
import userReducer from './userSlice';
import oneArticleReducer from './oneArticleSlice';
import * as appSelectors from './selectors';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
    oneArticle: oneArticleReducer,
  },
});

export { appSelectors };
