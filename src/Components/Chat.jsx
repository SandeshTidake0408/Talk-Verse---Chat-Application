import React from "react";
import profilepic from "../images/profilepic.jpg";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import Messages from "./Messages";
import InputPannel from "./InputPannel";
function Chat() {
    return (
        <>
            <div className="lg:w-[70%] sm:w-[58%] bg-[#B4F8C8] flex flex-col relative">
                <div className="bg-[#7CF3A0] p-[12px] pl-4 pr-4 flex flex-wrap gap-2 justify-between items-center ">
                    <h4 className="bg-contain font-b">To.....</h4>
                    <div className="flex  items-center gap-5 ">
                        <IoVideocamOutline size="1.5em" cursor="pointer" />
                        <MdPersonAddAlt1 size="1.5em" cursor="pointer" />
                        <CiMenuKebab size="1.3em" cursor="pointer" />
                    </div>
                </div>
                <Messages  />
                <InputPannel />
            </div>
        </>
    );
}

export default Chat;
