import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let articleObj = null;

export const fetchOneArticle = createAsyncThunk('articles/fetchOneArticle', async (slug, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }
  return articleObj.article;
});

export const fetchCreateArticle = createAsyncThunk('articles/fetchOneArticle', async (data, { rejectWithValue }) => {
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
  'articles/fetchOneArticle',
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

// export const fetchDeleteArticle = createAsyncThunk('articles/fetchOneArticle', async (slug, { rejectWithValue }) => {
//   try {
//     const url = `https://blog.kata.academy/api/articles/${slug}`;

//     const token = localStorage.getItem('token');

//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }
//   return articleObj.article;
// });

const fetchArticle = fetchOneArticle ?? fetchCreateArticle ?? fetchEditArticle;

const oneArticleSlice = createSlice({
  name: 'article',
  initialState: {
    article: null,
    error: false,
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticle.pending, (state) => {
      state.error = false;
      state.loading = true;
    });


    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      // console.log('action.payload', action.payload);
      state.loading = false;
      state.article = { ...action.payload };
    });

    builder.addCase(fetchArticle.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default oneArticleSlice.reducer;
