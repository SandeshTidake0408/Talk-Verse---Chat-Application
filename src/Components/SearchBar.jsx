import React from "react";
import profilepic from "../images/profilepic.jpg";
function SearchBar() {
    return (
        <div className=" mt-1 p-2 ">
            <input
                type="text"
                placeholder="Find User...."
                className=" p-1 w-full text-zinc-500 text-sm outline-none border-b-[1px] border-zinc-400 bg-[#F9EAC2] placeholder:text-zinc-400"
            />
            <div className="flex gap-4 items-center p-2 hidden ">
                <img
                    src={profilepic}
                    alt=""
                    className=" w-10 h-10 rounded-full object-cover"
                />
                <div className=" leading-3">
                    <h4 className="font-bold text-sm ">Onkar Kakde</h4>
                    <p className="text-[0.8rem] font-thin">Hello, how you're doing ?</p>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
