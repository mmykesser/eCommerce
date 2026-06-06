import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IAuthResponse, IApiError } from '../../types';
import { authApi } from './authApi';
import type { ILoginCredentials } from './auth.validation';

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  loading: false,
  error: null,
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
    const error = err as { response?: { data?: IApiError } };
    const message = error.response?.data?.message ?? 'Login failed. Please try again';
    return rejectWithValue(message);
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
