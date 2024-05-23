import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let articlesObj = null;
let articleObj = null;

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  articlesObj = await response.json();
  return articlesObj;
});

export const fetchSetLike = createAsyncThunk('articles/fetchSetLike', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite `;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }

  return articleObj.article;
});

export const fetchDeleteLike = createAsyncThunk('articles/fetchDeleteLike', async (slug, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite `;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }

  return articleObj.article;
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token');

  try {
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }
  return articleObj.article;
});

export const fetchCreateArticle = createAsyncThunk('articles/fetchCreateArticle', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/articles`;

    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }
  return articleObj.article;
});

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ([slug, data], { rejectWithValue }) => {
    try {
      const url = `https://blog.kata.academy/api/articles/${slug}`;

      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }

      articleObj = await response.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
    return articleObj.article;
  }
);

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
      state.loading = true;
    });

    builder.addCase(fetchSetLike.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchDeleteLike.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCreateArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchEditArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.articles) {
        state.articles = [...action.payload.articles];
        state.articlesCount = action.payload.articlesCount;
      }
    });

    builder.addCase(fetchSetLike.fulfilled, (state, action) => {
      state.loading = false;
      const { slug, favorited, favoritesCount } = action.payload;

      const index = state.articles.findIndex((article) => article.slug === slug);
      state.articles[index].favorited = favorited;
      state.articles[index].favoritesCount = favoritesCount;
    });

    builder.addCase(fetchDeleteLike.fulfilled, (state, action) => {
      state.loading = false;
      const { slug, favorited, favoritesCount } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      state.articles[index].favorited = favorited;
      state.articles[index].favoritesCount = favoritesCount;
    });

    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.loading = false;
      const { slug } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      if (index !== -1) {
        state.articles[index] = { ...action.payload };
      }
      state.articles[0] = { ...action.payload };
    });

    builder.addCase(fetchCreateArticle.fulfilled, (state, action) => {
      state.loading = false;
      const { slug } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      state.articles[index] = { ...action.payload };
    });

    builder.addCase(fetchEditArticle.fulfilled, (state, action) => {
      state.loading = false;
      const { slug } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      state.articles[index] = { ...action.payload };
    });

    builder.addCase(fetchArticles.rejected, (state) => {
      state.error = true;
    });
  },
});

export default articlesSlice.reducer;
