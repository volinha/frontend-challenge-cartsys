import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/produtoSlice";
import clientReducer from "./slices/clienteSlice";
import userReducer from "./slices/usuarioSlice";
import assistantReducer from "./slices/assistenteSlice";
import listReducer from "./slices/listSlice";
import statusReducer from "./slices/statusSlice";

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