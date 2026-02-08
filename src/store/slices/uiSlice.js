import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    // Check localStorage first
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        return storedTheme;
    }
    // Default to system
    return "system";
};

const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

const initialState = {
    theme: getInitialTheme(),
    effectiveTheme: getSystemTheme(), // The actual theme being used (light or dark)
    sidebarOpen: true,
    modals: {
        // Add modal states here as needed
    },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            const theme = action.payload;
            state.theme = theme;
            localStorage.setItem("theme", theme);
            
            if (theme === "system") {
                state.effectiveTheme = getSystemTheme();
            } else {
                state.effectiveTheme = theme;
            }
            
            // Apply theme class to document
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(state.effectiveTheme);
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setModal: (state, action) => {
            const { name, isOpen } = action.payload;
            state.modals[name] = isOpen;
        },
        initializeTheme: (state) => {
            // Initialize theme on app load
            const systemTheme = getSystemTheme();
            if (state.theme === "system") {
                state.effectiveTheme = systemTheme;
            } else {
                state.effectiveTheme = state.theme;
            }
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(state.effectiveTheme);
        },
    },
});

export const { setTheme, setSidebarOpen, toggleSidebar, setModal, initializeTheme } = uiSlice.actions;
export default uiSlice.reducer;

