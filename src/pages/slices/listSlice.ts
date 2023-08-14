import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ClientState } from "./clienteSlice";
import { ProductState } from "./produtoSlice";
import { AddressState } from "./assistenteSlice";

export interface PurchaseState {
  client: ClientState;
  product: ProductState;
  address: AddressState;
  totalPrice: number;
}

export interface ListState {
  clients: ClientState[];
  products: ProductState[];
  productSearch: ProductState[];
  searchInput: string;
  purchases: PurchaseState[];
}

const initialState: ListState = {
  clients: [],
  products: [],
  productSearch: [],
  searchInput: "",
  purchases: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<ClientState>) => {
      state.clients.push(action.payload);
    },
    addProduct: (state, action: PayloadAction<ProductState>) => {
      if(!!action.payload.image) { action.payload.image = 'https://picsum.photos/300/200' }
      state.products.push(action.payload);
    },
    addPurchase: (state, action: PayloadAction<PurchaseState>) => {
      state.purchases.push(action.payload);
    },
    updateSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    updateProductSearch: (state) => {
      state.productSearch = state.products.filter((product) =>
        product.name.toLowerCase().includes(state.searchInput.toLowerCase())
      );
    },
    clearClientList: (state) => {
      state.clients = [];
    },
    clearProductList: (state) => {
      state.products = [];
    },
    clearPurchaseList: (state) => {
      state.purchases = [];
    },
  },
});

export const { addClient, addProduct, addPurchase, updateSearchInput, updateProductSearch, clearClientList, clearProductList, clearPurchaseList } = listSlice.actions;
export default listSlice.reducer;
