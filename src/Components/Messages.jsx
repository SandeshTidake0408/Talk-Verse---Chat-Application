import React, { useState, useContext, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        if (data.chatId) {
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                if (doc.exists()) {
                    const chatData = doc.data();
                    console.log("Document data:", chatData);
                    if (chatData.messages) {
                        setMessages(chatData.messages);
                    } else {
                        console.log("No messages found in document.");
                        setMessages([]); // Reset messages if not found
                    }
                } else {
                    console.log("Document does not exist.");
                    setMessages([]); // Reset messages if document doesn't exist
                }
            });

            return () => {
                unsub();
            };
        }
    }, [data.chatId]);

    console.log("Messages state:", messages);

    return (
        <div className="overflow-y-scroll custom-scrollbar p-4 h-[82%]">
            {messages.length > 0 ? (
                messages.map((m) => <Message message={m} key={m.id} />)
            ) : (
                <p>No messages available.</p>
            )}
        </div>
    );
}

export default Messages;
