import { createApi } from "@reduxjs/toolkit/query/react";
import { signIn, register, signOut, subscribeToAuthState } from "../../../services/firebase/auth";
import { setUser, setLoading, setError, clearUser } from "../../../store/slices/authSlice";
import { setCurrentUserId, clearCurrentUserId } from "../../../store/slices/chatSlice";
import { setUser as setUserInFirestore, initializeUserChats } from "../../../services/firebase/firestore";
import { transformFirebaseUser } from "../../../utils/serialization";

// Create API slice
export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: () => ({ data: null }), // Firebase doesn't use baseQuery
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation({
            queryFn: async ({ email, password }, { dispatch }) => {
                dispatch(setLoading(true));
                const { user, error } = await signIn(email, password);
                
                if (error) {
                    dispatch(setError(error));
                    dispatch(setLoading(false));
                    return { error: { status: "CUSTOM_ERROR", error } };
                }
                
                dispatch(setUser(user));
                dispatch(setCurrentUserId(user.uid));
                return { data: user };
            },
        }),
        
        register: builder.mutation({
            queryFn: async ({ email, password, displayName, photoURL, file }, { dispatch, getState }) => {
                dispatch(setLoading(true));
                
                let finalPhotoURL = photoURL;
                
                // If file is provided, upload it first (but we need uid, so register without photo first)
                // Register user first
                const { user, error: authError } = await register(email, password, displayName, null);
                
                if (authError) {
                    dispatch(setError(authError));
                    dispatch(setLoading(false));
                    return { error: { status: "CUSTOM_ERROR", error: authError } };
                }
                
                // Upload photo if file provided
                if (file && user.uid) {
                    try {
                        const { uploadProfilePicture } = await import("../../../services/firebase/storage");
                        finalPhotoURL = await uploadProfilePicture(user.uid, file);
                        // Update user profile with photoURL
                        const { updateProfile } = await import("firebase/auth");
                        const { auth } = await import("../../../services/firebase/config");
                        await updateProfile(auth.currentUser, { photoURL: finalPhotoURL });
                    } catch (uploadError) {
                        console.error("Error uploading profile picture:", uploadError);
                        // Continue without photoURL
                    }
                }
                
                // Save user to Firestore
                const { error: firestoreError } = await setUserInFirestore(user.uid, {
                    uid: user.uid,
                    displayName: user.displayName || displayName,
                    email: user.email,
                    photoURL: finalPhotoURL || user.photoURL,
                });
                
                if (firestoreError) {
                    console.error("Error saving user to Firestore:", firestoreError);
                }
                
                // Initialize userChats
                await initializeUserChats(user.uid);
                
                // Update user object with final photoURL
                const updatedUser = { ...user, photoURL: finalPhotoURL || user.photoURL };
                dispatch(setUser(updatedUser));
                dispatch(setCurrentUserId(updatedUser.uid));
                return { data: updatedUser };
            },
        }),
        
        signOut: builder.mutation({
            queryFn: async (_, { dispatch }) => {
                const { error } = await signOut();
                
                if (error) {
                    dispatch(setError(error));
                    return { error: { status: "CUSTOM_ERROR", error } };
                }
                
                dispatch(clearUser());
                dispatch(clearCurrentUserId());
                return { data: null };
            },
        }),
        
        getCurrentUser: builder.query({
            queryFn: () => ({ data: null }), // Handled by auth state listener
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useSignOutMutation } = authAPI;

// Auth state listener setup (to be called in App or index.js)
export const setupAuthListener = (dispatch) => {
    dispatch(setLoading(true));
    
    return subscribeToAuthState((user) => {
        if (user) {
            dispatch(setUser(user));
            dispatch(setCurrentUserId(user.uid));
        } else {
            dispatch(clearUser());
            dispatch(clearCurrentUserId());
        }
    });
};

