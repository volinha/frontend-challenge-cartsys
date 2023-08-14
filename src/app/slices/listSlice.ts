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
  finishedAt: Date;
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
    removeClient: (state, action: PayloadAction<number>) => {
      state.clients = state.clients.filter((client) => client.code !== action.payload);
    },
    addProduct: (state, action: PayloadAction<ProductState>) => {
      if(action.payload.image === '') { action.payload.image = 'https://picsum.photos/300/200' }
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.code !== action.payload);
    },
    addPurchase: (state, action: PayloadAction<PurchaseState>) => {
      // get purchased product item and subtract 1 from stock
      state.products = state.products.map((product) => {
        if (product.code === action.payload.product.code) {
          product.stock--;
        }
        return product;
      })
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

export const { addClient, removeClient, addProduct, removeProduct, addPurchase, updateSearchInput, updateProductSearch, clearClientList, clearProductList, clearPurchaseList } = listSlice.actions;
export default listSlice.reducer;
