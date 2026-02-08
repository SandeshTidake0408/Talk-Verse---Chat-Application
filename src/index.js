import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import App from "./App";
import { setupAuthListener } from "./features/auth/services/authAPI";
import { initializeTheme } from "./store/slices/uiSlice";
import { ensureStateStructure } from "./store/slices/chatSlice";

// Initialize theme first
store.dispatch(initializeTheme());

// Ensure chat state structure is correct (for migration/rehydration)
store.dispatch(ensureStateStructure());

// Initialize auth listener
setupAuthListener(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
