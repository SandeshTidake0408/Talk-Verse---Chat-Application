/**
 * Utility functions to transform Firebase objects to plain serializable objects
 */

/**
 * Transform Firebase User object to plain object
 */
export const transformFirebaseUser = (user) => {
    if (!user) return null;
    
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
    };
};

/**
 * Transform Firebase Timestamp to plain object
 */
export const transformTimestamp = (timestamp) => {
    if (!timestamp) return null;
    
    // If it's already a plain object, return it
    if (typeof timestamp === 'object' && !timestamp.toDate && !timestamp.toMillis) {
        return timestamp;
    }
    
    // If it's a Firestore Timestamp
    if (timestamp.toDate) {
        const date = timestamp.toDate();
        return {
            seconds: Math.floor(date.getTime() / 1000),
            nanoseconds: (date.getTime() % 1000) * 1000000,
            toDate: () => date,
            toMillis: () => date.getTime(),
        };
    }
    
    // If it has toMillis method
    if (timestamp.toMillis) {
        const millis = timestamp.toMillis();
        const date = new Date(millis);
        return {
            seconds: Math.floor(millis / 1000),
            nanoseconds: (millis % 1000) * 1000000,
            toDate: () => date,
            toMillis: () => millis,
        };
    }
    
    return timestamp;
};

/**
 * Transform array of messages, converting timestamps
 */
export const transformMessages = (messages) => {
    if (!Array.isArray(messages)) return [];
    
    return messages.map((message) => ({
        ...message,
        date: transformTimestamp(message.date),
    }));
};

/**
 * Transform chatsList object, converting timestamps
 */
export const transformChatsList = (chatsList) => {
    if (!chatsList || typeof chatsList !== 'object') return {};
    
    const transformed = {};
    for (const [key, chat] of Object.entries(chatsList)) {
        // Skip if chat is null or undefined
        if (!chat || typeof chat !== 'object') {
            continue;
        }
        
        transformed[key] = {
            ...chat,
            date: transformTimestamp(chat.date),
        };
    }
    
    return transformed;
};

