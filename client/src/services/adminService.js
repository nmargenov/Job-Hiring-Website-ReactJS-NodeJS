const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { get, post } from "./requester";

const paths = {
    pending: '/admin/pending-businesses',
    acceptBusiness: "/admin/:businessID/accept",
    declineBusiness: "/admin/:businessID/decline",
    business: "/admin/:businessID"
}

export const getPendingBusinesses = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.pending}?${params.toString()}`;
    return get(url);
}

export const acceptBusiness = (businessID) => {
    const url = BASE_URL + paths.acceptBusiness.replace(':businessID', businessID);
    return post(url);
}

export const declineBusiness = (businessID) => {
    const url = BASE_URL + paths.declineBusiness.replace(':businessID', businessID);
    return post(url);
}

export const getBusiness = (businessID) => {
    const url = BASE_URL + paths.business.replace(':businessID', businessID);
    return get(url);
}