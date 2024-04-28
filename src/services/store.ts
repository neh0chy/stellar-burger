import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice/ingredientsSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import orderByNumberSlice from './slices/orderByNumberSlice/orderByNumberSlice';
import constructorSlice from './slices/constructorSlice/constructorSlice';
import userSlice from './slices/userSlice/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsSlice,
  burgerFeed: feedSlice,
  burgerOrderByNumber: orderByNumberSlice,
  burgerConstructor: constructorSlice,
  burgerUser: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
