import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

const initialState: Product[] = JSON.parse(
  localStorage.getItem('cart') || '[]',
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (_, action: PayloadAction<Product[]>) => {
      localStorage.setItem('cart', JSON.stringify(action.payload));

      return action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const updated = [...state, action.payload];

      localStorage.setItem('cart', JSON.stringify(updated));

      return updated;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const updated = state.filter(item => item.id !== +action.payload);

      localStorage.setItem('cart', JSON.stringify(updated));

      return updated;
    },
  },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
