import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { setupChatSubscription } from "../services/chatAPI";
import { setMessages } from "../../../store/slices/chatSlice";

function Messages() {
    const dispatch = useDispatch();
    const { currentChat, messages } = useSelector((state) => state.chat);

    useEffect(() => {
        if (!currentChat || currentChat === "null") {
            // Don't clear messages - just don't show them
            return;
        }

        // Set up subscription to load and update messages
        const unsubscribe = setupChatSubscription(currentChat, dispatch);
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentChat, dispatch]);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-4">
            {messages.length > 0 ? (
                messages.map((m) => (m && m.id ? <Message message={m} key={m.id} /> : null))
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
                        No messages yet. Start the conversation!
                    </p>
                </div>
            )}
        </div>
    );
}

export default Messages;

