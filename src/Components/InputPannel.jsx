import React, { useState, useContext } from "react";
import { VscSend } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function InputPannel() {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            // Start upload task
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Progress function, if needed (optional)
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        }),
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        // Clear the input fields after sending the message
        setText("");
        setImg(null);
    };
    return (
        <div className="bg-[#B4F8C8] w-full absolute bottom-0 left-0 pl-2 pr-2 pb-2 pt-1 ">
            <div className="flex items-center justify-between gap-3 bg-zinc-50 rounded-full overflow-hidden ">
                <input
                    type="text"
                    className=" outline-none p-3 w-full "
                    placeholder="Enter message here.."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />

                <div className="flex items-center justify-center">
                    <input
                        type="file"
                        id="addFile"
                        hidden
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label htmlFor="addFile" className=" p-3">
                        <ImAttachment size="1.3em" cursor="pointer" />
                    </label>
                    <button className="p-3">
                        <VscSend
                            size="1.3em"
                            cursor="pointer"
                            onClick={handleSend}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputPannel;
