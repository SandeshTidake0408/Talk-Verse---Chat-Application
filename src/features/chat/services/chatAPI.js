import { createApi } from "@reduxjs/toolkit/query/react";
import {
    searchUsers,
    getChat,
    createChat,
    subscribeToChat,
    sendMessage as sendMessageToFirestore,
    subscribeToUserChats,
    updateUserChats,
    getUserChats,
} from "../../../services/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/config";
import { setMessages, setChatsList } from "../../../store/slices/chatSlice";
import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

// Create API slice
export const chatAPI = createApi({
    reducerPath: "chatAPI",
    baseQuery: () => ({ data: null }), // Firebase doesn't use baseQuery
    tagTypes: ["Chat", "Message", "UserChats"],
    endpoints: (builder) => ({
        searchUsers: builder.query({
            queryFn: async (displayName) => {
                const { users, error } = await searchUsers(displayName);
                if (error) {
                    return { error: { status: "CUSTOM_ERROR", error } };
                }
                return { data: users };
            },
        }),
        
        getChat: builder.query({
            queryFn: async (chatId) => {
                const { data, error } = await getChat(chatId);
                if (error) {
                    return { error: { status: "CUSTOM_ERROR", error } };
                }
                return { data };
            },
        }),
        
        createChat: builder.mutation({
            queryFn: async ({ chatId, currentUserId, selectedUserId, currentUser, selectedUser }, { dispatch }) => {
                // Create chat document only if it doesn't exist (preserves existing messages)
                const { error: chatError } = await createChat(chatId);
                if (chatError) {
                    return { error: { status: "CUSTOM_ERROR", error: chatError } };
                }
                
                // Update userChats for current user (only if not already exists)
                const currentUserChatsRef = doc(db, "userChats", currentUserId);
                const currentUserChatsSnap = await getDoc(currentUserChatsRef);
                if (!currentUserChatsSnap.exists() || !currentUserChatsSnap.data()[chatId]) {
                    await updateUserChats(currentUserId, chatId, {
                        userInfo: {
                            uid: selectedUser.uid,
                            displayName: selectedUser.displayName,
                            photoURL: selectedUser.photoURL,
                        },
                    });
                }
                
                // Update userChats for selected user (only if not already exists)
                const selectedUserChatsRef = doc(db, "userChats", selectedUserId);
                const selectedUserChatsSnap = await getDoc(selectedUserChatsRef);
                if (!selectedUserChatsSnap.exists() || !selectedUserChatsSnap.data()[chatId]) {
                    await updateUserChats(selectedUserId, chatId, {
                        userInfo: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        },
                    });
                }
                
                return { data: { chatId } };
            },
        }),
        
        sendMessage: builder.mutation({
            queryFn: async ({ chatId, text, senderId, img }, { dispatch }) => {
                const message = {
                    id: uuid(),
                    text: text || "",
                    senderId,
                    img: img || null,
                };
                
                const { error } = await sendMessageToFirestore(chatId, message);
                if (error) {
                    return { error: { status: "CUSTOM_ERROR", error } };
                }
                
                return { data: message };
            },
        }),
        
        getUserChats: builder.query({
            queryFn: () => ({ data: null }), // Handled by subscription
        }),
    }),
});

export const {
    useSearchUsersQuery,
    useLazySearchUsersQuery,
    useGetChatQuery,
    useCreateChatMutation,
    useSendMessageMutation,
} = chatAPI;

// Chat subscription setup
export const setupChatSubscription = (chatId, dispatch) => {
    if (!chatId || chatId === "null") {
        return () => {};
    }
    
    // First, try to load existing messages immediately from Firestore
    getChat(chatId).then(({ data, error }) => {
        if (!error && data && data.messages) {
            dispatch(setMessages(data.messages));
        } else if (!error && data && !data.messages) {
            // Chat exists but has no messages
            dispatch(setMessages([]));
        }
    }).catch((error) => {
        console.error("Error loading chat messages:", error);
    });
    
    // Then set up real-time subscription for updates
    return subscribeToChat(chatId, (chatData) => {
        if (chatData && chatData.messages) {
            dispatch(setMessages(chatData.messages));
        } else if (chatData === null) {
            // Chat doesn't exist yet, set empty array
            dispatch(setMessages([]));
        }
    });
};

// User chats subscription setup
export const setupUserChatsSubscription = (uid, dispatch) => {
    if (!uid) {
        dispatch(setChatsList({}));
        return () => {};
    }
    
    // First, load existing chats immediately from Firestore
    getUserChats(uid).then(({ data, error }) => {
        if (!error && data) {
            dispatch(setChatsList(data || {}));
        }
    }).catch((error) => {
        console.error("Error loading user chats:", error);
    });
    
    // Then set up real-time subscription for updates
    return subscribeToUserChats(uid, (chatsData) => {
        dispatch(setChatsList(chatsData || {}));
    });
};

