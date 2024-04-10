import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

export type TIngredientState = {
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  orderData: null,
  loading: false,
  error: null
};

export const getOrderByNumberThunk = createAsyncThunk(
  'orderByNumber/get',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    getOrderByNumberSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { getOrderByNumberSelector } = orderByNumberSlice.selectors;
export default orderByNumberSlice.reducer;
