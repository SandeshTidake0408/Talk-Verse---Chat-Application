import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazySearchUsersQuery, useCreateChatMutation } from "../services/chatAPI";
import { setSelectedUser } from "../../../store/slices/chatSlice";
import Avatar from "../../../components/common/Avatar/Avatar";
import Input from "../../../components/common/Input/Input";

function SearchBar() {
    const [userName, setUserName] = useState("");
    const [searchUsers, { data: users, isLoading, error }] = useLazySearchUsersQuery();
    const [createChat] = useCreateChatMutation();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleSearch = async () => {
        if (!userName.trim()) {
            return;
        }
        await searchUsers(userName.trim());
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSelect = async () => {
        const foundUser = users?.[0];
        if (!foundUser || !foundUser.uid || !user?.uid || foundUser.uid === user.uid) {
            return;
        }

        try {
            const combinedId = user.uid > foundUser.uid ? user.uid + foundUser.uid : foundUser.uid + user.uid;

            // Create chat if it doesn't exist
            await createChat({
                chatId: combinedId,
                currentUserId: user.uid,
                selectedUserId: foundUser.uid,
                currentUser: user,
                selectedUser: foundUser,
            }).unwrap();

            // Select the user
            dispatch(setSelectedUser(foundUser));

            // Clear search
            setUserName("");
        } catch (error) {
            console.error("Error selecting user:", error);
        }
    };

    const foundUser = users && users.length > 0 && users[0].uid !== user?.uid ? users[0] : null;

    return (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search users..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKey}
                    className="w-full text-sm bg-slate-100 dark:bg-slate-700 border-0 rounded-lg"
                />
                {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">User not found</p>
            )}
            {foundUser && (
                <div
                    className="mt-3 flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    onClick={handleSelect}
                >
                    <Avatar src={foundUser.photoURL} size="md" />
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                            {foundUser.displayName || "Unknown User"}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Click to start conversation
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;

