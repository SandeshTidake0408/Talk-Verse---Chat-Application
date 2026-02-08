import { useState, useEffect } from "react";

/**
 * Custom hook to detect media query matches
 */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(query);
        const handleChange = (event) => {
            setMatches(event.matches);
        };

        // Set initial value
        setMatches(mediaQuery.matches);

        // Listen for changes
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
};

