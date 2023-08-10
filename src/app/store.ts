import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../pages/slices/produtoSlice";
import clientReducer from "../pages/slices/clienteSlice";
import userReducer from "../pages/slices/usuarioSlice";

// redux-persist
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    product: productReducer,
    client: clientReducer,
    user: userReducer,
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)