/**
 * Get system theme preference
 */
export const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

/**
 * Apply theme to document
 */
export const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
};

/**
 * Get stored theme preference
 */
export const getStoredTheme = () => {
    return localStorage.getItem("theme") || "system";
};

/**
 * Set stored theme preference
 */
export const setStoredTheme = (theme) => {
    localStorage.setItem("theme", theme);
};

/**
 * Get effective theme (resolves 'system' to actual theme)
 */
export const getEffectiveTheme = (theme) => {
    if (theme === "system") {
        return getSystemTheme();
    }
    return theme;
};

