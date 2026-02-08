import { createSlice } from "@reduxjs/toolkit";
import { transformFirebaseUser } from "../../utils/serialization";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // Transform Firebase User to plain object
            state.user = transformFirebaseUser(action.payload);
            state.isAuthenticated = !!state.user;
            state.loading = false;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setUser, clearUser, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;

