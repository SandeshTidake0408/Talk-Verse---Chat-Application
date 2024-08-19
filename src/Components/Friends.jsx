import React, { useEffect, useState, useContext } from "react";
import profilepic from "../images/profilepic.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import { db } from "../firebase";

function Friends() {
    const [friends, setFriends] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getFriend = () => {
            const unsub = onSnapshot(
                doc(db, "userChats", currentUser.uid),
                (doc) => {
                    setFriends(doc.data());
                }
            );
            return () => {
                unsub();
            };
        };
        currentUser.uid && getFriend();
    }, [currentUser.uid]);

    const handleSelectFriend = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });
    };
    return (
        <div className=" h-[85%] p-2 overflow-y-scroll no-scrollbar">
            {friends &&
                Object.entries(friends)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((friend) => (
                        <div
                            className=" flex justify-between items-end flex-wrap p-3 cursor-pointer"
                            key={friend[0]}
                            onClick={() =>
                                handleSelectFriend(friend[1]?.userInfo)
                            }
                        >
                            <div className="flex gap-4 items-center flex-wrap">
                                <img
                                    src={friend[1].userInfo.photoURL}
                                    alt=""
                                    className=" w-10 h-10 rounded-full object-cover"
                                />
                                <div className="leading-3">
                                    <h4 className="font-bold text-sm ">
                                        {friend[1].userInfo.displayName}
                                    </h4>
                                    <p className="text-[0.8rem] font-thin">
                                        {friend[1].lastMessage?.text}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[0.8rem] font-thin   ">
                                2.00 am
                            </p>
                        </div>
                    ))}
        </div>
    );
}

export default Friends;
