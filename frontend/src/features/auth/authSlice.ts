import axios from 'axios';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IAuthResponse, IApiError } from '../../types';
import { authApi } from './authApi';
import type { ILoginCredentials, IRegisterCredentials } from './auth.validation';

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isInitializing: boolean;
}

const initialState: IAuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  loading: false,
  error: null,
  isInitializing: !!localStorage.getItem('accessToken'),
};

export const loginUser = createAsyncThunk<
  IAuthResponse,
  ILoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.login(credentials);
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  } catch (err) {
    if (axios.isAxiosError<IApiError>(err)) {
      const message = err.response?.data?.message ?? 'Login failed. Please try again';
      return rejectWithValue(message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const registerUser = createAsyncThunk<
  IAuthResponse,
  IRegisterCredentials,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.register(credentials);
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  } catch (err) {
    if (axios.isAxiosError<IApiError>(err)) {
      const message = err.response?.data?.message ?? 'Registration failed. Please try again';
      return rejectWithValue(message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
