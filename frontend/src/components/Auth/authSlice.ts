import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from './Types/State';
import { loginSubmit, regSubmit, logOut, checkUser } from './api';
import { User } from './Types/User';

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async (credentials: { name: string; password: string }) => {
    const res = await loginSubmit(credentials);
    return res;
  },
);

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async (userData: { name: string; password: string }) => {
    const res = await regSubmit(userData);
    return res;
  },
);

export const checkUserAsync = createAsyncThunk<User>('auth/checkUser', async () => {
  const res = await checkUser();
  return res;
});

export const logOutAsync = createAsyncThunk('auth/logOut', async () => {
  await logOut();
});

const initialState: State = {
  userName: '...',
  auth: undefined,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.userName = action.payload.name;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.auth = undefined;
      });
  },
});

export default authSlice.reducer;
