/**
 * Format timestamp to readable time
 */
export const formatTime = (timestamp) => {
    if (!timestamp) return "";

    let date;
    if (timestamp.toDate) {
        // Firestore Timestamp
        date = timestamp.toDate();
    } else if (timestamp.toMillis) {
        // Firestore Timestamp (alternative)
        date = new Date(timestamp.toMillis());
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) return "";

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${displayHours}:${displayMinutes} ${ampm}`;
};

/**
 * Format timestamp for chat list (shows relative time)
 */
export const formatChatTime = (timestamp) => {
    if (!timestamp) return "";

    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else if (timestamp.toMillis) {
        date = new Date(timestamp.toMillis());
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = today - messageDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (diffDays === 0) {
        // Today - show time only
        return `${displayHours}:${displayMinutes} ${ampm}`;
    } else if (diffDays === 1) {
        // Yesterday
        return "Yesterday";
    } else if (diffDays < 7) {
        // This week - show day name
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    } else {
        // Older - show date
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}`;
    }
};

/**
 * Format date to readable string
 */
export const formatDate = (timestamp) => {
    if (!timestamp) return "";

    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else if (timestamp.toMillis) {
        date = new Date(timestamp.toMillis());
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString();
};

