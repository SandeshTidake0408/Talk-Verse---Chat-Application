import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config";

/**
 * Sign in with email and password
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

/**
 * Register new user with email and password
 */
export const register = async (email, password, displayName, photoURL) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile
        if (displayName || photoURL) {
            await updateProfile(userCredential.user, {
                displayName,
                photoURL,
            });
        }
        
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

