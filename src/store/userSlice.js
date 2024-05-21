import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let userObj = null;

export const fetchUserAuth = createAsyncThunk('user/fetchUser', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/users`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    userObj = await response.json();
    if (userObj) {
      localStorage.setItem('username', userObj.user?.username);
      localStorage.setItem('token', userObj.user?.token);
      localStorage.setItem('email', userObj.user?.email);
      localStorage.setItem('image', userObj.user?.image)
    }
  } catch (e) {
    return rejectWithValue(e.message);
  }
  return userObj.user;
});

export const fetchUserLogin = createAsyncThunk('user/fetchUser', async (data,{rejectWithValue}) => {
  try {
    const url = `https://blog.kata.academy/api/users/login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    userObj = await response.json();
    if (userObj) {
      localStorage.setItem('username', userObj.user?.username);
      localStorage.setItem('token', userObj.user?.token);
      localStorage.setItem('email', userObj.user?.email);
      localStorage.setItem('image', userObj.user?.image)
    }
  } catch (e) {
    return rejectWithValue(e.message)
  }
  return userObj.user;
});

export const fetchUserEditProfile = createAsyncThunk('user/fetchUser', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/user`;

    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    userObj = await response.json();
    if (userObj) {
      localStorage.setItem('username', userObj.user?.username);
      localStorage.setItem('token', userObj.user?.token);
      localStorage.setItem('email', userObj.user?.email);
      localStorage.setItem('image', userObj.user?.image);
    }
  } catch (e) {
    return rejectWithValue(e.message);
  }

  return userObj.user;
});

export const fetchUserReset = createAsyncThunk('user/fetchUser', async (data) => data);

const fetchUser = fetchUserAuth ?? fetchUserLogin ?? fetchUserEditProfile ?? fetchUserReset;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    email: null,
    username: null,
    image: '',
    error: false,
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.image = action.payload.image;
    });

    builder.addCase(fetchUser.rejected, (state,action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
