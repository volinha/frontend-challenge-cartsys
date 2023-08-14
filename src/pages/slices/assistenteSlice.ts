import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ParcelState  {
  number: number;
  total: number;
}
export interface AssistantState {
  screen: number;
  selectedClientCode: number;
  productSearch: string;
  selectedProductCode: number;
  paymentMethod: number;
  parcels: ParcelState[];
  street: string;
  neighborhood: string;
  city: string;
  number: number;
  complement: string;
}

export interface AddressState {
  street: string;
  neighborhood: string;
  city: string;
  number: number;
  complement: string;
}

const initialState: AssistantState = {
  screen: 1,
  selectedClientCode: 0,
  productSearch: '',
  selectedProductCode: 0,
  paymentMethod: 0,
  parcels: [],
  street: '',
  neighborhood: '',
  city: '',
  number: 0,
  complement: '',
}

export const assistantSlice = createSlice({
  name: 'assistant',
  initialState,
  reducers: {
    incrementPage: (state) => {
      if(state.screen < 3) state.screen += 1
    },
    decrementPage: (state) => {
      if(state.screen > 1) state.screen -= 1
    },
    updateSelectedClientCode: (state, action: PayloadAction<number>) => {
      state.selectedClientCode = action.payload;
    },
    updateSelectedProductCode: (state, action: PayloadAction<number>) => {
      state.selectedProductCode = action.payload;
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.productSearch = action.payload;
    },
    updatePaymentMethod: (state, action: PayloadAction<number>) => {
      state.paymentMethod = action.payload;
    },
    updateParcels: (state, action: PayloadAction<ParcelState[]>) => {
      state.parcels = action.payload;
    },
    updateStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload;
    },
    updateNeighborhood: (state, action: PayloadAction<string>) => {
      state.neighborhood = action.payload;
    },
    updateCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    updateNumber: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
    updateComplement: (state, action: PayloadAction<string>) => {
      state.complement = action.payload;
    },
    finishBuy: (state) => {
      state.screen = 1;
      state.selectedClientCode = 0;
      state.productSearch = '';
      state.selectedProductCode = -1;
      state.paymentMethod = -1;
      state.parcels = [];
      state.street = '';
      state.neighborhood = '';
      state.city = '';
      state.number = 0;
      state.complement = '';
    },
  },
})

export const {
  incrementPage,
  decrementPage,
  updateSearch,
  updateSelectedClientCode,
  updateSelectedProductCode,
  updatePaymentMethod,
  updateParcels,
  updateStreet,
  updateNeighborhood,
  updateCity,
  updateNumber,
  updateComplement,
  finishBuy
} = assistantSlice.actions;

export default assistantSlice.reducer;
