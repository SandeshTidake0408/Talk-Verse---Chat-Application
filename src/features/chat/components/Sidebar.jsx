import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Friends from "./Friends";
import SearchBar from "./SearchBar";

function Sidebar() {
    return (
        <div className="w-full sm:w-96 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col h-full">
            <Navbar />
            <SearchBar />
            <Friends />
        </div>
    );
}

export default Sidebar;

