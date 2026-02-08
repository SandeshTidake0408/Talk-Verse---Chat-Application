import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authAPI";
import { useSelector } from "react-redux";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import { validateLoginForm } from "../../../utils/validators";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [login, { isLoading }] = useLoginMutation();
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
        const validation = validateLoginForm(email, password);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setErrors({});

        try {
            await login({ email, password }).unwrap();
            navigate("/");
        } catch (error) {
            setErrors({ general: error?.error || "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Welcome back</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sign in to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                placeholder="••••••••"
                                className="w-full"
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        {errors.general && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading} className="w-full mt-6">
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

