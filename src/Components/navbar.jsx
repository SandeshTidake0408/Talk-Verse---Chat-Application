import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="bg-[#FFD898] p-2 pl-4 pr-4  flex flex-wrap gap-2 justify-between items-center ">
                <h1 className=" font-bold">Chat</h1>
                <div className="flex  items-center  justify-center gap-3 ">
                    <img
                        className=" w-10 h-8 rounded-full object-cover"
                        src={currentUser.photoURL}
                        alt=""
                    />
                    <p className="text-sm font-bold">{currentUser.displayName}</p>
                    <span
                        className=" cursor-pointer "
                        onClick={() => {
                            signOut(auth);
                        }}
                    >
                        <FiLogOut color="black" size="1em" />
                    </span>
                </div>
            </div>
        </>
    );
}

export default Navbar;
