import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/common/Avatar/Avatar";
import { formatTime } from "../../../utils/formatters";

const Message = ({ message }) => {
    const { user } = useSelector((state) => state.auth);
    const { selectedUser } = useSelector((state) => state.chat);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    if (!message || !user?.uid) {
        return null;
    }

    const isOwnMessage = message.senderId === user.uid;
    const senderPhotoURL = isOwnMessage
        ? user.photoURL || ""
        : selectedUser?.photoURL || "";
    const messageTime = formatTime(message.date);

    return (
        <div
            ref={ref}
            className={`flex gap-3 items-start ${isOwnMessage ? "flex-row-reverse" : ""}`}
        >
            <Avatar src={senderPhotoURL} size="sm" />
            <div className={`flex flex-col gap-1 max-w-[70%] ${isOwnMessage ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {isOwnMessage ? "You" : selectedUser?.displayName || "User"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500">{messageTime || ""}</span>
                </div>
                {message.text && (
                    <div
                        className={`px-4 py-2 rounded-2xl text-sm ${
                            isOwnMessage
                                ? "bg-indigo-600 text-white rounded-br-sm"
                                : "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-sm border border-slate-200 dark:border-slate-600"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
                {message.img && (
                    <img
                        className="max-w-[280px] rounded-xl mt-1"
                        src={message.img}
                        alt="Message attachment"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Message;

