import React from "react";
import Sidebar from "../../features/chat/components/Sidebar";
import Chat from "../../features/chat/components/Chat";

function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-7xl h-[90vh] bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Layout;

