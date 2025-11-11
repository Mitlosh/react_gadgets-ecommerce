import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
