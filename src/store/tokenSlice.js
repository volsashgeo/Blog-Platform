import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    });
  },
});

export default tokenSlice.reducer;
