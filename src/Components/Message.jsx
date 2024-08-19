import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <>
            <div
                ref={ref}
                className={`flex  gap-5 p-3 items-start  ${
                    message.senderId === currentUser.uid
                        ? "flex-row-reverse"
                        : ""
                }`}
            >
                <div className="flex flex-col leading-5 justify-center items-center">
                    <img
                        className="w-[40px] h-[40px] rounded-full object-cover"
                        src={
                            message.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.photoURL
                        }
                        alt=""
                    />
                    <p>time</p>
                </div>

                <div className="flex flex-col items-end">
                    <p
                        className={`p-2 px-4  text-sm rounded-b-lg w-fit ${
                            message.senderId === currentUser.uid
                                ? "bg-zinc-100 rounded-tl-lg"
                                : "bg-green-300 rounded-tr-lg"
                        }`}
                    >
                        {message.text}
                    </p>
                    {message.img && (
                        <img
                            className="w-[50%] max-w-[60%] mt-2 rounded-lg" // Set width and margin-top
                            src={message.img}
                            alt="Message attachment"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Message;

{
    /* <div className="flex flex-row-reverse  items-center  gap-2 p-3 ">
                    <div className="flex flex-col leading-5  justify-center items-center">
                        <img
                            className=" w-12 h-12 rounded-full object-cover"
                            src={profilepic}
                            alt=""
                        />
                        <p>time</p>
                    </div>
                    <p className="bg-zinc-100 p-2 pl-4 max-w-[80%] rounded-tl-lg rounded-b-lg rounded-bl-lg text-sm ">
                        Hey there, what you are doing ..
                    </p>
                </div> */
}
