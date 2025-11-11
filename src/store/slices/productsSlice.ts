import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { Phone, Tablet, Accessory } from '../../types/ProductDetails';
import { setError, setLoading } from './uiSlice';

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  phones: Phone[];
  tablets: Tablet[];
  accessories: Accessory[];
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  phones: [],
  tablets: [],
  accessories: [],
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const [products, phones, tablets, accessories] = await Promise.all([
        fetch('/api/products.json').then(res => res.json()),
        fetch('/api/phones.json').then(res => res.json()),
        fetch('/api/tablets.json').then(res => res.json()),
        fetch('/api/accessories.json').then(res => res.json()),
      ]);

      return { products, phones, tablets, accessories };
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }

      return;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      return { ...state, selectedProduct: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { products, phones, tablets, accessories } = action.payload;

      return {
        ...state,
        products,
        phones,
        tablets,
        accessories,
      };
    });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
