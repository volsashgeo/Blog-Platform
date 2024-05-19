import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`);

  const articlesObj = await response.json();
  return articlesObj;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: null,
    error: false,
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.articles) {
        state.articles = [...action.payload.articles];
        state.articlesCount = action.payload.articlesCount;
      }
    });

    builder.addCase(fetchArticles.rejected, (state) => {
      state.error = true;
    });
  },
});

export default articlesSlice.reducer;
