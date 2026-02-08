import React from "react";
import profilepic from "../../../images/profilepic.jpg";

const Avatar = ({
    src,
    alt = "",
    size = "md",
    className = "",
    ...props
}) => {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    };
    
    const handleError = (e) => {
        if (e.target.src !== profilepic) {
            e.target.src = profilepic;
        }
    };
    
    return (
        <img
            src={src || profilepic}
            alt={alt}
            className={`${sizes[size]} rounded-full object-cover border border-slate-200 dark:border-slate-700 ${className}`}
            onError={handleError}
            {...props}
        />
    );
};

export default Avatar;

