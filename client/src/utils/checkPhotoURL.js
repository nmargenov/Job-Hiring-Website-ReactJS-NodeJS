const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const checkPhotoURL = (photoURL) => {
    if (photoURL.startsWith('src')) {
        const url = BASE_URL + "/" + photoURL;
        return url;
    }
    return photoURL;
}