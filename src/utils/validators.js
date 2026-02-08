/**
 * Validate email format
 */
export const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return "Please enter a valid email address";
    }
    return null;
};

/**
 * Validate password
 */
export const validatePassword = (password, minLength = 6) => {
    if (!password) return "Password is required";
    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters`;
    }
    return null;
};

/**
 * Validate display name
 */
export const validateDisplayName = (name) => {
    if (!name || !name.trim()) return "Name is required";
    if (name.trim().length < 2) {
        return "Name must be at least 2 characters";
    }
    return null;
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = "This field") => {
    if (!value || (typeof value === "string" && !value.trim())) {
        return `${fieldName} is required`;
    }
    return null;
};

/**
 * Validate file
 */
export const validateFile = (file, options = {}) => {
    const { maxSize = 5 * 1024 * 1024, allowedTypes = ["image/jpeg", "image/png", "image/gif"] } = options;

    if (!file) return "File is required";

    if (!allowedTypes.includes(file.type)) {
        return `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`;
    }

    if (file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
        return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
};

/**
 * Validate login form
 */
export const validateLoginForm = (email, password) => {
    const errors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate register form
 */
export const validateRegisterForm = (displayName, email, password, file) => {
    const errors = {};
    const nameError = validateDisplayName(displayName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const fileError = validateFile(file);

    if (nameError) errors.displayName = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (fileError) errors.file = fileError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

