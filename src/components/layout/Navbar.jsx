import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useSignOutMutation } from "../../features/auth/services/authAPI";
import { useSelector } from "react-redux";
import Avatar from "../common/Avatar/Avatar";
import { useTheme } from "../../hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";

function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const [signOut] = useSignOutMutation();
    const { effectiveTheme, toggleTheme } = useTheme();

    if (!user) {
        return null;
    }

    const handleSignOut = async () => {
        try {
            await signOut().unwrap();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Messages</h1>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    {effectiveTheme === "dark" ? (
                        <FiSun className="text-slate-600 dark:text-slate-300" size="18" />
                    ) : (
                        <FiMoon className="text-slate-600 dark:text-slate-300" size="18" />
                    )}
                </button>
                <div className="flex items-center gap-2">
                    <Avatar src={user.photoURL} size="sm" alt={user.displayName || "User"} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">
                        {user.displayName || "User"}
                    </span>
                </div>
                <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Sign out"
                >
                    <FiLogOut className="text-slate-600 dark:text-slate-300" size="18" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;

