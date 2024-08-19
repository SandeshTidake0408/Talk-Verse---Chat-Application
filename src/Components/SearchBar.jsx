import React, { useContext, useState } from "react";
import profilepic from "../images/profilepic.jpg";
import {
    collection,
    query,
    where,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function SearchBar() {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", userName)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            setErr(true);
        }
    };
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        //check if this two people had chat before in firestore if not create new one

        //create user chats
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create new chat
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create userchat

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                // for friend too
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (error) {
            console.log(error)
            setErr(true);
        }

        setUser(null);
        setUserName("");
    };
    return (
        <div className=" mt-1 p-2 ">
            <input
                type="text"
                placeholder="Find User...."
                className=" p-1 w-full text-zinc-500 text-sm outline-none border-b-[1px] border-zinc-400 bg-[#F9EAC2] placeholder:text-zinc-400"
                onKeyDown={handleKey}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
            />
            {err && <span>User not Found !!</span>}
            {user && (
                <div
                    className="flex gap-4 items-center p-2  cursor-pointer"
                    onClick={handleSelect}
                >
                    <img
                        src={user.photoURL}
                        alt=""
                        className=" w-10 h-10 rounded-full object-cover"
                    />
                    <div className=" leading-3">
                        <h4 className="font-bold text-sm ">
                            {user.displayName}
                        </h4>
                        <p className="text-[0.8rem] font-thin">
                            Hello, how you're doing ?
                        </p>
                    </div>
                </div>
            )}
            <div className="h-[0.2px] w-full bg-black"></div>
        </div>
    );
}

export default SearchBar;
