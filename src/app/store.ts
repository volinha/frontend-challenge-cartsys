import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../pages/slices/produtoSlice";
import clientReducer from "../pages/slices/clienteSlice";
import userReducer from "../pages/slices/usuarioSlice";
import assistantReducer from "../pages/slices/assistenteSlice";
import listReducer from "../pages/slices/listSlice";
import statusReducer from "../pages/slices/statusSlice";

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
    assistant: assistantReducer,
    list: listReducer,
    status: statusReducer,
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)