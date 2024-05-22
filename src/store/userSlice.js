import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let userObj = null;

export const fetchUserAuth = createAsyncThunk('user/fetchUserAuth', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/users`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    userObj = await response.json();

    if (userObj.user) {
      localStorage.setItem('username', userObj.user?.username);
      localStorage.setItem('email', userObj.user?.email);
      localStorage.setItem('token', userObj.user?.token);
      localStorage.setItem('image', userObj.user?.image);
    }
  } catch (e) {
    return rejectWithValue(e.errors);
  }
  return userObj.user ?? userObj.errors;
});

export const fetchUserLogin = createAsyncThunk('user/fetchUserLogin', async (data, { rejectWithValue }) => {
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
      localStorage.setItem('image', userObj.user?.image);
    }
  } catch (e) {
    return rejectWithValue(e.message);
  }
  return userObj.user;
});

export const fetchUserEditProfile = createAsyncThunk('user/fetchUserEditProfile', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/user`;

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

export const fetchUserReset = createAsyncThunk('user/fetchUserReset', async (data) => data);

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
    builder.addCase(fetchUserAuth.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.token) {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.image = action.payload.image;
      } else {
        state.errors = { ...action.payload };
      }
    });

    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.username = action.payload.username;
    });

    builder.addCase(fetchUserEditProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.image = action.payload.image;
    });

    builder.addCase(fetchUserReset.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.email = null;
      state.username = null;
      state.image = null;
    });

    builder.addCase(fetchUserAuth.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchUserLogin.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },

});

export default userSlice.reducer;
