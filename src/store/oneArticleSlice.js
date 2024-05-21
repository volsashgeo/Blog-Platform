// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// let articleObj = null;

// export const fetchOneArticle = createAsyncThunk('articles/fetchOneArticle', async (slug, { rejectWithValue }) => {
//   try {
//     const url = `https://blog.kata.academy/api/articles/${slug}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     articleObj = await response.json();
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }
//   return articleObj.article;
// });

// export const fetchCreateArticle = createAsyncThunk('articles/fetchOneArticle', async (data, { rejectWithValue }) => {
//   try {
//     const url = `https://blog.kata.academy/api/articles`;

//     const token = localStorage.getItem('token');

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: `Token ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: data,
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     articleObj = await response.json();
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }
//   return articleObj.article;
// });

// export const fetchEditArticle = createAsyncThunk(
//   'articles/fetchOneArticle',
//   async ([slug, data], { rejectWithValue }) => {
//     try {
//       const url = `https://blog.kata.academy/api/articles/${slug}`;

//       const token = localStorage.getItem('token');

//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: data,
//       });

//       if (!response.ok) {
//         throw new Error(`Could not fetch ${url}, received ${response.status}`);
//       }

//       articleObj = await response.json();
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//     return articleObj.article;
//   }
// );

// export const fetchSetLike = createAsyncThunk('articles/fetchOneArticle', async (slug, { rejectWithValue }) => {
//   const token = localStorage.getItem('token');
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

//     articleObj = await response.json();
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }

//   return articleObj.article;
// });

// export const fetchDeleteLike = createAsyncThunk('articles/fetchOneArticle', async (slug, { rejectWithValue }) => {
//   const url = `https://blog.kata.academy/api/articles/${slug}/favorite `;
//   const token = localStorage.getItem('token');

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

//     articleObj = await response.json();
//   } catch (e) {
//     return rejectWithValue(e.message);
//   }

//   return articleObj.article;
// });

// const fetchArticle = fetchOneArticle ?? fetchCreateArticle ?? fetchEditArticle ?? fetchSetLike ?? fetchDeleteLike;

// const oneArticleSlice = createSlice({
//   name: 'article',
//   initialState: {
//     // article: null,
//     error: false,
//     loading: false,
//   },

//   extraReducers: (builder) => {
//     builder.addCase(fetchArticle.pending, (state) => {
//       state.error = false;
//       state.loading = true;
//     });

//     builder.addCase(fetchArticle.fulfilled, (state, action) => {
//       // console.log('action.payload oneArticle', action.payload);
//       state.loading = false;
//       // state.article = { ...action.payload };
//       state.author = action.payload.author;
//       state.createdAt = action.payload.createdAt;
//       state.title = action.payload.title;
//       state.description = action.payload.description;
//       state.body = action.payload.body;
//       state.tagList = action.payload.tagList;
//       // state.username = action.payload.author.username;
//       // state.image = action.payload.author.image;
//       state.favoritesCount = action.payload.favoritesCount;
//       state.favorited = action.payload.favorited;
//     });

//     builder.addCase(fetchArticle.rejected, (state) => {
//       state.error = true;
//       state.loading = false;
//     });
//   },
// });

// export default oneArticleSlice.reducer;

// // .addCase(postLike.fulfilled, (state, action) => {
// //   state.isLoading = false
// //   const { slug, isLiked, data } = action.payload
// //   if (state.currentPost?.article?.slug === slug) {
// //     state.currentPost.article.favorited = isLiked
// //     state.currentPost.article.favoritesCount = data.article.favoritesCount
// //   }
// //   const index = state.posts.findIndex((post) => post.slug === slug)
// //   if (index !== -1) {
// //     state.posts[index].favorited = isLiked
// //     state.posts[index].favoritesCount = data.article.favoritesCount
// //   }
// // })
