import React from "react";

const Button = ({
    children,
    onClick,
    disabled = false,
    variant = "primary",
    size = "md",
    type = "button",
    className = "",
    ...props
}) => {
    const baseClasses = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm hover:shadow",
        secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    };
    
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };
    
    const disabledClasses = disabled
        ? "opacity-50 cursor-not-allowed"
        : "";
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

