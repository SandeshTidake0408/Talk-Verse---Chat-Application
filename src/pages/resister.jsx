import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const Resister = () => {
    const [err, serErr] = useState(false); // for displaying errors while signing up
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target[1].value);
        const userName = e.target[0].value.trim();
        const userEmail = e.target[1].value;
        const userPass = e.target[2].value;
        const userProfilePic = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                userEmail,
                userPass
            );
            //for uploading profile picrure
            const storageRef = ref(storage, userName);
            const uploadTask = uploadBytesResumable(storageRef, userProfilePic);

            uploadTask.on(
                (error) => {
                    serErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            // console.log('');
                            await updateProfile(res.user, {
                                displayName: userName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName: userName,
                                email: userEmail,
                                photoURL: downloadURL,
                            });
                            // console.log(res.user);
                        }
                    );
                }
            );
        } catch (error) {
            console.log(error);
            serErr(true);
        }
    };
    return (
        <div className="relative bg-violet-300 h-lvh flex flex-col justify-center items-center overflow-hidden ">
            <div className=" w-[200px] h-[200px] rounded-full bg-violet-500 absolute top-[7%] left-[35%] z-0 blur-2xl "></div>
            {/* //design circles */}
            <div className=" w-[200px] h-[200px] rounded-full bg-violet-500 absolute top-[70%] left-[55%] z-0 blur-2xl"></div>
            {/* //design circles */}
            <div
                className="flex justify-center items-start flex-col bg-opacity-15 bg-white rounded-lg py-10 px-9
             z-10 overflow-hidden"
            >
                <span className=" text-white text-3xl font-bold mb-4">
                    Sign Up
                </span>

                <form
                    action=""
                    className="flex flex-col gap-[1px]"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="userName">Name</label>
                    <input
                        type="text"
                        id="userName"
                        className=" p-1 border border-gray-500 !important rounded appearance-none required focus:outline-none focus:border-violet-500"
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="p-1   border border-gray-500 !important rounded required focus:outline-none focus:border-violet-500"
                    />
                    <label htmlFor="userPass">Password</label>
                    <input
                        type="password"
                        id="userPass"
                        className="p-1  border border-gray-500 !important rounded required focus:outline-none focus:border-violet-500"
                    />
                    <label htmlFor="userPic">Profile Pic</label>
                    <input
                        type="file"
                        id="userPic"
                        className="w-[70%]  mb-2 required"
                    />
                    <div>
                        <button className="bg-violet-500 text-white p-2 rounded w-full">
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-white mt-3">
                    Already have an account?{" "}
                    <a href="" className="text-zinc-900">
                        Login
                    </a>
                </p>
                {err && <p>Something Went Wrong !!</p>}
            </div>
        </div>
    );
};

export default Resister;
