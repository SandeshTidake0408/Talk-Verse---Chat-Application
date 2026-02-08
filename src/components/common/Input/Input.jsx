import React from "react";

const Input = ({
    type = "text",
    placeholder = "",
    value,
    onChange,
    onKeyDown,
    className = "",
    error = false,
    disabled = false,
    ...props
}) => {
    const baseClasses = "w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm";
    
    const stateClasses = error
        ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20";
    
    const disabledClasses = disabled
        ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800"
        : "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500";
    
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
            {...props}
        />
    );
};

export default Input;

