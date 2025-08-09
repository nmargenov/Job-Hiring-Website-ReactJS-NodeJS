const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { get, patch } from "./requester";

const paths = {
    me: '/messages/me',
    message: '/messages/:id'
}

export const getMessages = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.me}?${params.toString()}`;
    return get(url);
}

export const readMessage = (messageID) => {
    const url = BASE_URL + paths.message.replace(':id', messageID);
    return patch(url);
}