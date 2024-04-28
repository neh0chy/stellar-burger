import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import feedSlice from './slices/feedSlice';
import orderByNumberSlice from './slices/orderByNumberSlice';
import constructorSlice from './slices/constructorSlice';
import userSlice from './slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
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
