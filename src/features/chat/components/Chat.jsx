import React, { useEffect } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import Messages from "./Messages";
import InputPanel from "./InputPanel";
import { useSelector } from "react-redux";

function Chat() {
    const { selectedUser } = useSelector((state) => state.chat);

    if (!selectedUser || !selectedUser.uid) {
        return (
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Select a conversation to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-slate-50 dark:bg-slate-900 flex flex-col relative">
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedUser?.displayName || "Unknown User"}
                    </h4>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <IoVideocamOutline size="20" className="text-slate-600 dark:text-slate-300" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <MdPersonAddAlt1 size="20" className="text-slate-600 dark:text-slate-300" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <CiMenuKebab size="18" className="text-slate-600 dark:text-slate-300" />
                    </button>
                </div>
            </div>
            <Messages />
            <InputPanel />
        </div>
    );
}

export default Chat;

