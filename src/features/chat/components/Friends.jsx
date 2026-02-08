import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUserChatsSubscription } from "../services/chatAPI";
import { setChatsList, setSelectedUser } from "../../../store/slices/chatSlice";
import Avatar from "../../../components/common/Avatar/Avatar";
import { formatChatTime } from "../../../utils/formatters";
import profilepic from "../../../images/profilepic.jpg";

function Friends() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { chatsList } = useSelector((state) => state.chat);

    useEffect(() => {
        if (!user || !user.uid) {
            dispatch(setChatsList({}));
            return;
        }

        const unsubscribe = setupUserChatsSubscription(user.uid, dispatch);
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [user, dispatch]);

    const handleSelectFriend = (userInfo) => {
        if (userInfo) {
            dispatch(setSelectedUser(userInfo));
        }
    };

    // Convert chatsList object to array and filter/sort
    const friendsList = Object.entries(chatsList || {})
        .filter(([_, chat]) => chat && chat.userInfo && chat.userInfo.uid)
        .sort((a, b) => {
            let dateA = 0;
            let dateB = 0;

            if (a[1]?.date) {
                if (a[1].date.toMillis) {
                    dateA = a[1].date.toMillis();
                } else if (a[1].date.toDate) {
                    dateA = a[1].date.toDate().getTime();
                } else if (a[1].date instanceof Date) {
                    dateA = a[1].date.getTime();
                } else {
                    dateA = new Date(a[1].date).getTime() || 0;
                }
            }

            if (b[1]?.date) {
                if (b[1].date.toMillis) {
                    dateB = b[1].date.toMillis();
                } else if (b[1].date.toDate) {
                    dateB = b[1].date.toDate().getTime();
                } else if (b[1].date instanceof Date) {
                    dateB = b[1].date.getTime();
                } else {
                    dateB = new Date(b[1].date).getTime() || 0;
                }
            }

            return dateB - dateA;
        });

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {friendsList.length > 0 ? (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {friendsList.map((friend) => (
                        <div
                            className="px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            key={friend[0]}
                            onClick={() => handleSelectFriend(friend[1]?.userInfo)}
                        >
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src={friend[1]?.userInfo?.photoURL || profilepic}
                                    size="md"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                                            {friend[1]?.userInfo?.displayName || "Unknown"}
                                        </h4>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                                            {formatChatTime(friend[1]?.date) || ""}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                                        {friend[1]?.lastMessage?.text || "No messages yet"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full px-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
                        No conversations yet. Search for a user to start chatting!
                    </p>
                </div>
            )}
        </div>
    );
}

export default Friends;

