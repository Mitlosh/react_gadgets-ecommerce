import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

const initialState: Product[] = JSON.parse(
  localStorage.getItem('favorites') || '[]',
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (_, action: PayloadAction<Product[]>) => {
      localStorage.setItem('favorites', JSON.stringify(action.payload));

      return action.payload;
    },
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const updated = [...state, action.payload];

      localStorage.setItem('favorites', JSON.stringify(updated));

      return updated;
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const updated = state.filter(item => item.id !== Number(action.payload));

      localStorage.setItem('favorites', JSON.stringify(updated));

      return updated;
    },
  },
});

export const { setFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
