const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { post, get, patch } from "./requester";

const PATHS = {
    apply: "/business/",
    getEdit: "/business/:businessID/edit",
    editBusiness: "/business/:businessID"
}

export const apply = (businessName, bio, employeeCount) => {
    const url = BASE_URL + PATHS.apply;
    return post(url, { businessName, bio, employeeCount });
}

export const getEdit = (businessID) => {
    const url = BASE_URL + PATHS.getEdit.replace(":businessID", businessID);
    return get(url);
}

export const editBusiness = (businessID, businessName, bio, employeeCount) => {
    const url = BASE_URL + PATHS.editBusiness.replace(':businessID', businessID);
    return patch(url, { businessName, bio, employeeCount });
}