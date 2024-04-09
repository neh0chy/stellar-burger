// import { TIngredient, TConstructorIngredient } from '@utils-types';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '@api';

// export type TConstructorState = {
//   constructorItems:{
//     bun: TConstructorIngredient,
//     ingredients: TConstructorIngredient[]
//   },
//   orderRequest:,
//   orderModalData:,
//   loading: boolean;
//   error: string | null;
// };

// // export const initialState: TIngredientState = {
// //   ingredients: [],
// //   loading: false,
// //   error: null
// // };

// export const getIngredientsThunk = createAsyncThunk(
//   'ingredients/get',
//   getIngredientsApi
// );

// export const constructorSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {},
//   selectors: {
//     getConstructorStateSelector: (state) => state
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getIngredientsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getIngredientsThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message as string;
//       })
//       .addCase(getIngredientsThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ingredients = action.payload;
//       });
//   }
// });

// export const { getIngredientsSelector } = constructorSlice.selectors;
// export default constructorSlice.reducer;
