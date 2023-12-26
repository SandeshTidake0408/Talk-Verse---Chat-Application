import React from "react";
import { VscSend } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";

function InputPannel() {
    return (
        <div className="bg-[#B4F8C8] w-full absolute bottom-0 left-0 pl-2 pr-2 pb-2 pt-1 ">
            <div className="flex items-center justify-between gap-3 bg-zinc-50 rounded-full overflow-hidden ">
                <input
                    type="text"
                    className=" outline-none p-3 w-full "
                    placeholder="Enter message here.."
                />

                <div className="flex items-center justify-center">
                    <input type="file" id="addFile" hidden />
                    <label htmlFor="addFile" className=" p-3">
                        <ImAttachment size="1.3em" cursor="pointer" />
                    </label>
                    <button className="p-3">
                        <VscSend size="1.3em" cursor="pointer" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputPannel;
