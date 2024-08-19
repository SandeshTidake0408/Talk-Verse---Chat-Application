import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [err, serErr] = useState(false); // for displaying errors while signing up
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
            serErr(true);
        }
    };
    return (
        <div className="relative bg-[#7CF3A0] h-lvh flex flex-col justify-center items-center overflow-hidden ">
            <div className=" w-[200px] h-[200px] rounded-full bg-[#3bd76a]  absolute top-[7%] left-[35%] z-0 blur-2xl "></div>
            {/* //design circles */}
            <div className=" w-[200px] h-[200px] rounded-full bg-[#3bd76a] absolute top-[70%] left-[55%] z-0 blur-2xl"></div>
            {/* //design circles */}
            <div
                className="flex justify-center items-start flex-col bg-opacity-15 bg-white rounded-lg py-8 px-8
             z-10 overflow-hidden"
            >
                <span className=" text-white text-3xl font-bold mb-4">
                    Login
                </span>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[1px]"
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="p-1   border border-gray-500 !important rounded required focus:outline-none focus:border-violet-500"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="p-1  border border-gray-500 !important rounded required focus:outline-none focus:border-violet-500"
                    />

                    <div>
                        <button className="bg-[#65e28a] text-white p-2 rounded w-full mt-2">
                            Login
                        </button>
                    </div>

                    <p className="text-white mt-2">
                        You don't have an account?{" "}
                        <a href="" className="text-zinc-900">
                            <Link to="/register">Register</Link>
                        </a>
                        {err && <p>Something Went Wrong !!</p>}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
