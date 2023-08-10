import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../pages/slices/produtoSlice";
import clientReducer from "../pages/slices/clienteSlice";
import userReducer from "../pages/slices/usuarioSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        client: clientReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch