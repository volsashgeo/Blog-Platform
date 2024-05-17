import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// let userObj = null;

// export const fetchTokenAuth = createAsyncThunk('token/fetchTokenAuth', async (data) => {
//   try {
//     const url = `https://blog.kata.academy/api/users`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: data,
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     userObj = await response.json();
//     if (userObj) {
//       localStorage.setItem('user', JSON.stringify(userObj.user));
//     }
//     console.log('userObj.user', userObj.user);
//   } catch (e) {
//     console.log(e.message);
//   }
//   return userObj.user.token;
// });

// export const fetchTokenLogin = createAsyncThunk('token/fetchTokenLogin', async (data,{rejectWithValue}) => {
//   try {
//     const url = `https://blog.kata.academy/api/users/login`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: data,
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     userObj = await response.json();
//     if (userObj) {
//       localStorage.setItem('user', JSON.stringify(userObj.user));
//     }
//   } catch (e) {
//     // console.log(e.message);
//     return rejectWithValue(e.message)
//   }
//   return userObj.user.token;
// });

// export const fetchTokenEditProfile = createAsyncThunk('token/fetchTokenEditProfile', async (data) => {
//   const token = JSON.parse(localStorage.getItem('user'))?.token;

//   try {
//     const url = `https://blog.kata.academy/api/user`;
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Token ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: data,
//     });

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, received ${response.status}`);
//     }

//     userObj = await response.json();
//     console.log('userObj', userObj);
//     if (userObj) {
//       localStorage.setItem('user', JSON.stringify(userObj.user));
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
//   return userObj.user.token;
// });

// export const fetchTokenReset = createAsyncThunk('token/fetchTokenReset', async (data) => data);

export const fetchTokenAuth = createAsyncThunk('token/fetchToken', async (data) => {
  const response = await fetch(`https://blog.kata.academy/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  const userObj = await response.json();
  if (userObj) {
    localStorage.setItem('user', JSON.stringify(userObj.user));
  }
  console.log('userObj.user', userObj.user);
  return userObj.user.token;
});

export const fetchTokenLogin = createAsyncThunk('token/fetchToken', async (data) => {
  const response = await fetch(`https://blog.kata.academy/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  const userObj = await response.json();
  if (userObj) {
    localStorage.setItem('user', JSON.stringify(userObj.user));
  }
  return userObj.user.token;
});

export const fetchTokenEditProfile = createAsyncThunk('token/fetchToken', async (data) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token

  const response = await fetch(`https://blog.kata.academy/api/user`, {
    method: 'PUT',
    headers: {
      "Authorization": `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: data,
  });

  const userObj = await response.json();
  console.log("userObj",userObj);
  if (userObj) {
    localStorage.setItem('user', JSON.stringify(userObj.user));
  }
  return userObj.user.token;
});

export const fetchTokenReset = createAsyncThunk('token/fetchToken', async (data) => data);

const fetchToken = fetchTokenAuth ?? fetchTokenLogin ?? fetchTokenReset;

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
    error: false,
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchToken.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      // if (action.payload) {
      // }
    });

    builder.addCase(fetchToken.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default tokenSlice.reducer;
