import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, initializeTheme } from "../store/slices/uiSlice";
import { getSystemTheme, applyTheme } from "../utils/theme";

/**
 * Custom hook for theme management
 */
export const useTheme = () => {
    const dispatch = useDispatch();
    const { theme, effectiveTheme } = useSelector((state) => state.ui);

    // Initialize theme on mount
    useEffect(() => {
        dispatch(initializeTheme());
    }, [dispatch]);

    // Listen to system theme changes
    useEffect(() => {
        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = () => {
                const systemTheme = getSystemTheme();
                applyTheme(systemTheme);
            };

            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [theme]);

    // Apply theme when it changes
    useEffect(() => {
        applyTheme(effectiveTheme);
    }, [effectiveTheme]);

    const toggleTheme = () => {
        const newTheme = effectiveTheme === "dark" ? "light" : "dark";
        dispatch(setTheme(newTheme));
    };

    const setThemeMode = (mode) => {
        dispatch(setTheme(mode));
    };

    return {
        theme,
        effectiveTheme,
        toggleTheme,
        setTheme: setThemeMode,
        isDark: effectiveTheme === "dark",
    };
};

