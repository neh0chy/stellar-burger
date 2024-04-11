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
import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
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
  userData: null, // данныые юзера, нужны для последующего редактирования (?)
  userOrders: [], // данные с заказами юзера
  userError: null, // ошибка с уникальным именем, чтобы не было конфликта при деструктуризации в компонентах
  isLoading: false, // нужен для отображения прелоадера
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

export const getUserThunk = createAsyncThunk('burgerUser/get', getUserApi);

export const getUserOrdersThunk = createAsyncThunk(
  'burgerUser/orders',
  getOrdersApi
);

export const getUserLogout = createAsyncThunk(
  'burgerUser/logout',
  getOrdersApi
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
        state.userError = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.userError = action.error.message as string;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.userError = null;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.error.message as string;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userError = null;
        state.userData = action.payload.user;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.error.message as string;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userError = null;
        state.userData = action.payload.user;
      })

      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.error.message as string;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userError = null;
        state.userOrders = action.payload;
      });
  }
});

export const {} = constructorSlice.actions;
export const { getUserStateSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
