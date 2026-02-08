import { createSlice } from "@reduxjs/toolkit";
import { transformMessages, transformChatsList, transformTimestamp } from "../../utils/serialization";

const initialState = {
    currentChat: null,
    selectedUser: null,
    messages: [], // Current chat messages
    messagesByChatId: {}, // Store messages per chatId for persistence
    chatsList: {},
    currentUserId: null, // Store current user ID for chatId generation
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // Ensure state structure is correct (useful for migration/rehydration)
        ensureStateStructure: (state) => {
            if (!state.messagesByChatId) {
                state.messagesByChatId = {};
            }
            if (!state.messages) {
                state.messages = [];
            }
            if (!state.chatsList) {
                state.chatsList = {};
            }
        },
        setSelectedUser: (state, action) => {
            // Ensure messagesByChatId exists (in case of rehydration from old state)
            if (!state.messagesByChatId) {
                state.messagesByChatId = {};
            }
            
            state.selectedUser = action.payload;
            if (action.payload) {
                // Generate chatId
                const currentUserId = state.currentUserId || "";
                const selectedUserId = action.payload.uid || "";
                const chatId =
                    currentUserId > selectedUserId
                        ? currentUserId + selectedUserId
                        : selectedUserId + currentUserId;
                state.currentChat = chatId;
                
                // Load existing messages for this chat if available
                if (state.messagesByChatId[chatId]) {
                    state.messages = state.messagesByChatId[chatId];
                } else {
                    state.messages = [];
                }
            } else {
                state.currentChat = null;
                // Don't clear messages - keep them in messagesByChatId
            }
        },
        setCurrentChat: (state, action) => {
            // Ensure messagesByChatId exists (in case of rehydration from old state)
            if (!state.messagesByChatId) {
                state.messagesByChatId = {};
            }
            
            const chatId = action.payload;
            state.currentChat = chatId;
            
            // Load existing messages for this chat if available
            if (chatId && state.messagesByChatId[chatId]) {
                state.messages = state.messagesByChatId[chatId];
            } else if (chatId) {
                state.messages = [];
            }
        },
        setMessages: (state, action) => {
            // Ensure messagesByChatId exists (in case of rehydration from old state)
            if (!state.messagesByChatId) {
                state.messagesByChatId = {};
            }
            
            // Transform messages, converting Firebase Timestamps
            const transformedMessages = transformMessages(action.payload || []);
            state.messages = transformedMessages;
            
            // Also store messages by chatId for persistence
            if (state.currentChat) {
                state.messagesByChatId[state.currentChat] = transformedMessages;
            }
        },
        addMessage: (state, action) => {
            // Ensure messagesByChatId exists (in case of rehydration from old state)
            if (!state.messagesByChatId) {
                state.messagesByChatId = {};
            }
            
            // Transform message timestamp before adding
            const transformedMessage = {
                ...action.payload,
                date: transformTimestamp(action.payload.date),
            };
            state.messages.push(transformedMessage);
            
            // Also update messagesByChatId
            if (state.currentChat) {
                if (!state.messagesByChatId[state.currentChat]) {
                    state.messagesByChatId[state.currentChat] = [];
                }
                state.messagesByChatId[state.currentChat].push(transformedMessage);
            }
        },
        setChatsList: (state, action) => {
            // Transform chatsList, converting Firebase Timestamps
            state.chatsList = transformChatsList(action.payload || {});
        },
        setCurrentUserId: (state, action) => {
            state.currentUserId = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetChat: (state) => {
            state.currentChat = null;
            state.selectedUser = null;
            // Don't clear messages - they're stored in messagesByChatId
            state.messages = [];
        },
        clearMessagesForChat: (state, action) => {
            // Ensure messagesByChatId exists (in case of rehydration from old state)
            if (!state.messagesByChatId) {
                state.messagesByChatId = {};
            }
            
            const chatId = action.payload;
            if (chatId && state.messagesByChatId[chatId]) {
                delete state.messagesByChatId[chatId];
            }
            if (state.currentChat === chatId) {
                state.messages = [];
            }
        },
        clearCurrentUserId: (state) => {
            state.currentUserId = null;
        },
    },
});

export const {
    setSelectedUser,
    setCurrentChat,
    setMessages,
    addMessage,
    setChatsList,
    setCurrentUserId,
    setLoading,
    setError,
    clearError,
    resetChat,
    clearCurrentUserId,
    clearMessagesForChat,
    ensureStateStructure,
} = chatSlice.actions;
export default chatSlice.reducer;

