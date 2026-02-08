import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../services/chatAPI";
import { uploadChatImage } from "../../../services/firebase/storage";
import { updateUserChats } from "../../../services/firebase/firestore";
import { v4 as uuid } from "uuid";

function InputPanel() {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { currentChat, selectedUser } = useSelector((state) => state.chat);
    const [sendMessage] = useSendMessageMutation();

    const handleSend = async () => {
        if (!text.trim() && !img) {
            return;
        }

        if (!currentChat || currentChat === "null" || !selectedUser?.uid) {
            console.error("Cannot send message: Invalid chat data");
            return;
        }

        if (!user?.uid) {
            console.error("Cannot send message: User not authenticated");
            return;
        }

        try {
            let imageURL = null;
            if (img) {
                imageURL = await uploadChatImage(uuid(), img);
            }

            // Send message
            await sendMessage({
                chatId: currentChat,
                text: text.trim(),
                senderId: user.uid,
                img: imageURL,
            }).unwrap();

            // Update userChats for both users
            const lastMessageText = text.trim() || (imageURL ? "Image" : "");
            await updateUserChats(user.uid, currentChat, {
                userInfo: {
                    uid: selectedUser.uid,
                    displayName: selectedUser.displayName,
                    photoURL: selectedUser.photoURL,
                },
                lastMessage: { text: lastMessageText },
            });

            await updateUserChats(selectedUser.uid, currentChat, {
                userInfo: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                lastMessage: { text: lastMessageText },
            });

            // Clear inputs
            setText("");
            setImg(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2">
                <input
                    type="file"
                    id="addFile"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="addFile" className="p-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors">
                    <ImAttachment size="18" className="text-slate-600 dark:text-slate-300" />
                </label>
                <input
                    type="text"
                    className="flex-1 outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 text-sm"
                    placeholder="Type a message..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <button 
                    onClick={handleSend}
                    className="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded transition-colors"
                    disabled={!text.trim() && !img}
                >
                    <VscSend size="18" className={`${text.trim() || img ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                </button>
            </div>
        </div>
    );
}

export default InputPanel;

