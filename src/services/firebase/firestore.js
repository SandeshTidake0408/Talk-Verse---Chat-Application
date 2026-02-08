import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    onSnapshot,
    serverTimestamp,
    arrayUnion,
    Timestamp,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Get user document
 */
export const getUser = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return { data: userDoc.data(), error: null };
        }
        return { data: null, error: "User not found" };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

/**
 * Create or update user document
 */
export const setUser = async (uid, userData) => {
    try {
        await setDoc(doc(db, "users", uid), {
            ...userData,
            uid,
        }, { merge: true });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

/**
 * Search users by display name
 */
export const searchUsers = async (displayName) => {
    try {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", displayName.trim())
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return { users, error: null };
    } catch (error) {
        return { users: [], error: error.message };
    }
};

/**
 * Get chat document
 */
export const getChat = async (chatId) => {
    try {
        const chatDoc = await getDoc(doc(db, "chats", chatId));
        if (chatDoc.exists()) {
            return { data: chatDoc.data(), error: null };
        }
        return { data: null, error: "Chat not found" };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

/**
 * Create chat document (only if it doesn't exist)
 */
export const createChat = async (chatId) => {
    try {
        const chatDocRef = doc(db, "chats", chatId);
        const chatDocSnap = await getDoc(chatDocRef);
        
        // Only create the chat if it doesn't exist
        if (!chatDocSnap.exists()) {
            await setDoc(chatDocRef, { messages: [] });
        }
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

/**
 * Subscribe to chat messages
 */
export const subscribeToChat = (chatId, callback) => {
    if (!chatId || chatId === "null") {
        return () => {};
    }
    
    return onSnapshot(
        doc(db, "chats", chatId),
        (docSnapshot) => {
            if (docSnapshot.exists()) {
                callback(docSnapshot.data());
            } else {
                callback(null);
            }
        },
        (error) => {
            console.error("Error subscribing to chat:", error);
            callback(null);
        }
    );
};

/**
 * Send message to chat
 */
export const sendMessage = async (chatId, message) => {
    try {
        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
                ...message,
                id: message.id || Date.now().toString(),
                date: Timestamp.now(),
            }),
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

/**
 * Get user chats document
 */
export const getUserChats = async (uid) => {
    try {
        const userChatsDoc = await getDoc(doc(db, "userChats", uid));
        if (userChatsDoc.exists()) {
            return { data: userChatsDoc.data(), error: null };
        }
        return { data: {}, error: null };
    } catch (error) {
        return { data: {}, error: error.message };
    }
};

/**
 * Subscribe to user chats
 */
export const subscribeToUserChats = (uid, callback) => {
    if (!uid) {
        return () => {};
    }
    
    return onSnapshot(
        doc(db, "userChats", uid),
        (docSnapshot) => {
            if (docSnapshot.exists()) {
                callback(docSnapshot.data());
            } else {
                callback({});
            }
        },
        (error) => {
            console.error("Error subscribing to user chats:", error);
            callback({});
        }
    );
};

/**
 * Update user chats document
 */
export const updateUserChats = async (uid, chatId, chatData) => {
    try {
        await setDoc(
            doc(db, "userChats", uid),
            {
                [chatId + ".userInfo"]: chatData.userInfo,
                [chatId + ".date"]: serverTimestamp(),
                [chatId + ".lastMessage"]: chatData.lastMessage || null,
            },
            { merge: true }
        );
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

/**
 * Initialize user chats document
 */
export const initializeUserChats = async (uid) => {
    try {
        await setDoc(doc(db, "userChats", uid), {});
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

