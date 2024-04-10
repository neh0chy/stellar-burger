import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: null;
  loading: boolean;
  error: string | null;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const getIngredientsThunk = createAsyncThunk(
  'burgerConstructor/post',
  orderBurgerApi
);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    }
  },
  selectors: {
    getConstructorStateSelector: (state) => state
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getIngredientsThunk.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(getIngredientsThunk.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message as string;
  //     })
  //     .addCase(getIngredientsThunk.fulfilled, (state, action) => {
  //       state.loading = false;
  //       console.log(action);
  //     });
  // }
});

export const { addIngredient } = constructorSlice.actions;
export const { getConstructorStateSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
