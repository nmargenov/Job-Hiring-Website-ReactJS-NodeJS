const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { get, post } from "./requester";

const paths = {
    me: '/messages/me'
}

export const getMessages = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.me}?${params.toString()}`;
    return get(url);
}

export const readMessages = () => {
    const url = BASE_URL + paths.me;
    return post(url);
}