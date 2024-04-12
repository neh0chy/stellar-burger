import { TOrder, TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '@api';

export type TUserState = {
  userData: TUser | null;
  userOrders: TOrder[];
  userError: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export const initialState: TUserState = {
  userData: null,
  userOrders: [],
  userError: null,
  isLoading: false,
  isAuthenticated: false
};

export const registerUserThunk = createAsyncThunk(
  'burgerUser/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'burgerUser/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const getUserThunk = createAsyncThunk('burgerUser/get', getUserApi);

export const getUserOrdersThunk = createAsyncThunk(
  'burgerUser/orders',
  getOrdersApi
);

export const getUserLogout = createAsyncThunk('burgerUser/logout', logoutApi);

export const constructorSlice = createSlice({
  name: 'burgerUser',
  initialState,
  reducers: {},
  selectors: {
    getUserStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.userError = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.userError = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userError = null;
        state.userData = action.payload.user;
        state.isAuthenticated = false;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userError = null;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userError = null;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = false;
        state.userError = null;
        state.isAuthenticated = false;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userError = null;
        state.userOrders = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(getUserLogout.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
        state.isAuthenticated = true;
      })
      .addCase(getUserLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.error.message as string;
        state.isAuthenticated = true;
      })
      .addCase(getUserLogout.fulfilled, (state) => {
        state.userData = null;
        state.userOrders = [];
        state.userError = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  }
});

export const {} = constructorSlice.actions;
export const { getUserStateSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
