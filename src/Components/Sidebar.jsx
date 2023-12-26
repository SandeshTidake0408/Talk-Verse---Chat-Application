import React from "react";
import Navbar from "./navbar";
import Friends from "./Friends";
import SearchBar from "./SearchBar";
function Sidebar() {
    return (
        <>
            <div className="lg:w-[30%] sm:w-[42%] bg-[#F9EAC2] overflow-hidden border-r-2 border-zinc-300">
                <Navbar />
                <SearchBar />
                <Friends />
            </div>
        </>
    );
}

export default Sidebar;
