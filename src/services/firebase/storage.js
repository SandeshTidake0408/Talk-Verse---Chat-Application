import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

/**
 * Upload file to Firebase Storage
 */
export const uploadFile = (path, file, onProgress) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                if (onProgress) {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress(progress);
                }
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

/**
 * Upload profile picture
 */
export const uploadProfilePicture = async (uid, file, onProgress) => {
    const path = `profilePictures/${uid}`;
    return uploadFile(path, file, onProgress);
};

/**
 * Upload chat image
 */
export const uploadChatImage = async (fileName, file, onProgress) => {
    const path = `chatImages/${fileName}`;
    return uploadFile(path, file, onProgress);
};

