import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: null;
  loginUserRequest: false;
  userData: null;
  loading: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false,
  userData: null,
  loading: false,
  error: null
};

// export const postOrderThunk = createAsyncThunk(
//   'burgerConstructor/post',
//   async (array: string[]) => orderBurgerApi(array)
// );

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    getConstructorStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder;
    // .addCase(postOrderThunk.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(postOrderThunk.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message as string;
    // })
    // .addCase(postOrderThunk.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.orderModalData = action.payload.order;
    //   state.constructorItems = initialState.constructorItems;
    // });
  }
});

export const {} = constructorSlice.actions;
export const { getConstructorStateSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
