import React from "react";

const Login = () => {
    return (
        <div className="relative bg-violet-300 h-lvh flex flex-col justify-center items-center overflow-hidden ">
            <div className=" w-[200px] h-[200px] rounded-full bg-violet-500 absolute top-[7%] left-[35%] z-0 blur-2xl "></div>
            {/* //design circles */}
            <div className=" w-[200px] h-[200px] rounded-full bg-violet-500 absolute top-[70%] left-[55%] z-0 blur-2xl"></div>
            {/* //design circles */}
            <div
                className="flex justify-center items-start flex-col bg-opacity-15 bg-white rounded-lg py-8 px-8
             z-10 overflow-hidden"
            >
                <span className=" text-white text-3xl font-bold mb-4">
                    Login
                </span>

                <form action="" className="flex flex-col gap-[1px]">
                    
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id=""
                        className="p-1   border border-gray-500 !important rounded required focus:outline-none focus:border-violet-500"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id=""
                        className="p-1  border border-gray-500 !important rounded required focus:outline-none focus:border-violet-500"
                    />
                    
                    <div>
                        <button className="bg-violet-500 text-white p-2 rounded w-full mt-2">
                            Register
                        </button>
                    </div>
                
                <p className="text-white mt-2">
                    You don't have an account?{" "}
                    <a href="" className="text-zinc-900">
                         Resister
                    </a>
                </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
