import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  code: number;
  isActive: boolean;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string
}

const initialState: ProductState = {
    code: 0,
    isActive: true,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateCode: (state, action: PayloadAction<number>) => {
      state.code = action.payload;
    },
    updateIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updatePrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    updateStock: (state, action: PayloadAction<number>) => {
      state.stock = action.payload;
    },
    updateImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const { updateCode, updateIsActive, updateName, updateDescription, updatePrice, updateStock, updateImage, resetForm } = productSlice.actions;

export default productSlice.reducer;
