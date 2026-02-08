import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/authAPI";
import { useSelector } from "react-redux";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import { validateRegisterForm } from "../../../utils/validators";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [register, { isLoading }] = useRegisterMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validation = validateRegisterForm(displayName, email, password, file);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setErrors({});

        try {
            // Register user with file
            await register({
                email,
                password,
                displayName,
                file,
            }).unwrap();

            navigate("/");
        } catch (error) {
            setErrors({
                general: error?.error || "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Create account</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="userName" className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                            <Input
                                type="text"
                                id="userName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                error={!!errors.displayName}
                                placeholder="John Doe"
                                className="w-full"
                            />
                            {errors.displayName && <p className="text-sm text-red-500">{errors.displayName}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                placeholder="you@example.com"
                                className="w-full"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="userPass" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            <Input
                                type="password"
                                id="userPass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                placeholder="••••••••"
                                className="w-full"
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="userPic" className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile Picture</label>
                            <input
                                type="file"
                                id="userPic"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                            />
                            {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                        </div>

                        {errors.general && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading} className="w-full mt-6">
                            {isLoading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

