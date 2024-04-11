import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { TLoginData, TRegisterData, loginUserApi, registerUserApi } from '@api';

export type TUserState = {
  userData: TUser | null;
  userOrders: TOrder | null;
  userError: string | null;
  // userRequest: boolean;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
};

export const initialState: TUserState = {
  userData: null, // данныые юзера, нужны для последующего редактирования (?)
  userOrders: null, // данные с заказами юзера
  userError: null, // ошибка с уникальным именем, чтобы не было конфликта при деструктуризации в компонентах
  // userRequest: false, //
  isAuthChecked: false, // нужен для отображения прелоадера
  isAuthenticated: false // наличие токена
};

export const registerUserThunk = createAsyncThunk(
  'burgerUser/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'burgerUser/login',
  async (data: TLoginData) => await loginUserApi(data)
);

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
        // state.userRequest = true;
        state.userError = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        // state.userRequest = false;
        state.userError = action.error.message as string;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        // state.userRequest = false;
        state.userError = null;
      })
      .addCase(loginUserThunk.pending, (state) => {
        // state.userRequest = true;
        state.isAuthChecked = true;
        state.userError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        // state.userRequest = false;
        state.userError = action.error.message as string;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        // state.userRequest = false;
        state.isAuthChecked = false;
        state.userError = null;
        state.userData = action.payload.user;
      });
  }
});

export const {} = constructorSlice.actions;
export const { getUserStateSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
