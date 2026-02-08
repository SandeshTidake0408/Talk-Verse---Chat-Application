import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import uiReducer from "./slices/uiSlice";
import { authAPI } from "../features/auth/services/authAPI";
import { chatAPI } from "../features/chat/services/chatAPI";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "ui", "chat"], // Persist auth, ui, and chat state
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    ui: uiReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "auth/setUser",
                    "chat/setMessages",
                    "chat/setChatsList",
                    "chat/addMessage",
                ],
                ignoredActionPaths: [
                    "payload.user",
                    "payload.0.date",
                    "payload.date",
                    "meta.arg",
                ],
                ignoredPaths: [
                    "auth.user",
                    "chat.messages",
                    "chat.chatsList",
                ],
            },
        })
            .concat(authAPI.middleware)
            .concat(chatAPI.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

// Create persistor
export const persistor = persistStore(store);

