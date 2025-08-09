const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { get } from "./requester";

const paths = {
    pending: '/admin/pending-businesses'
}

export const getPendingBusinesses = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.pending}?${params.toString()}`;
    return get(url);
}
