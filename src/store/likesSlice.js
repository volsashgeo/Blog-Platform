// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// let likesObj = null;

// const token = localStorage.getItem('token');

// export const fetchSetLike = createAsyncThunk('likes/fetchLikes', async (slug, { rejectWithValue }) => {
//   const url = `https://blog.kata.academy/api/articles/${slug}/favorite `;
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     likesObj = await response.json();
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }
//   return {
//     favorited: likesObj.article.favorited,
//     favoritesCount: likesObj.article.favoritesCount,
//   };
// });

// export const fetchDeleteLike = createAsyncThunk('likes/fetchLikes', async (slug, { rejectWithValue }) => {
//   const url = `https://blog.kata.academy/api/articles/${slug}/favorite `;

//   try {
//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     likesObj = await response.json();
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }
//   return {
//     favorited: likesObj.article.favorited,
//     favoritesCount: likesObj.article.favoritesCount,
//   };
// });

// const fetchLikes = fetchSetLike ?? fetchDeleteLike;

// const likesSlice = createSlice({
//   name: 'likes',
//   initialState: {
//     favorited: null,
//     favoritesCount: null,
//     error: false,
//     loading: false,

//   },

//   extraReducers: (builder) => {
//     builder.addCase(fetchLikes.pending, (state) => {
//       state.error = false;
//       state.loading = true;
//     });

//     builder.addCase(fetchLikes.fulfilled, (state, action) => {
//       state.loading = false;
//       state.favorited = action.payload.favorited;
//       state.favoritesCount = action.payload.favoritesCount;
//     });

//     builder.addCase(fetchLikes.rejected, (state) => {
//       state.error = true;
//       state.loading = false;
//     });
//   },
// });

// export default likesSlice.reducer;
