const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { post, get } from "./requester";

const PATHS = {
    apply: "/business/",
    getEdit: "/business/:businessID/edit"
}

export const apply = (businessName, bio, employeeCount) => {
    const url = BASE_URL + PATHS.apply;
    return post(url, { businessName, bio, employeeCount });
}

export const getEdit = (businessID) => {
    const url = BASE_URL + PATHS.getEdit.replace(":businessID", businessID);
    return get(url);
}