const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { get } from "./requester";

const paths = {
    me: '/messages/me'
}

export const get5LastMessages = () => {
    const url = BASE_URL + paths.me;
    return get(url);
}
