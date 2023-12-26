import React from "react";
import { FiLogOut } from "react-icons/fi";
import { IoIosChatboxes } from "react-icons/io";

import profilepic from "../images/profilepic.jpg";
{
    /* <IoIosChatboxes color="#013A20" size="2em" /> */
}
function Navbar() {
    return (
        <>
            <div className="bg-[#FFD898] p-2 pl-4 pr-4  flex flex-wrap gap-2 justify-between items-center ">
                <h1 className=" font-bold">Chat</h1>
                <div className="flex  items-center  justify-center gap-3 ">
                    <img
                        className=" w-10 h-8 rounded-full object-cover"
                        src={profilepic}
                        alt=""
                    />
                    <p className="text-sm">User</p>
                    <span className=" cursor-pointer ">
                        <FiLogOut color="black" size="1em" />
                    </span>
                </div>
            </div>
        </>
    );
}

export default Navbar;
