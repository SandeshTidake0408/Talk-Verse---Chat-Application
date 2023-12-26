import React from "react";
import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";
function Home() {
    return (
        <div className="bg-[#ECFDF1] h-lvh flex items-center justify-center ">
            <div className=" border-solid border-zinc-50 border-2 rounded-xl  h-[90%] flex shadow-xl overflow-hidden lg:w-[80%] sm: w-[95%]">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home;
