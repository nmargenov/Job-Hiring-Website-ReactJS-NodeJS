const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { del, get, post } from "./requester";

const paths = {
    pending: '/admin/pending-businesses',
    acceptBusiness: "/admin/:businessID/accept",
    declineBusiness: "/admin/:businessID/decline",
    business: "/admin/business/:businessID",
    businesses: "/admin/businesses",
    acceptEdit: "/admin/:businessID/accept-edit",
    declineEdit: "/admin/:businessID/decline-edit",
    admin: "/admin/",
    makeAdmin: "/admin/make",
    oneAdmin: "/admin/:email"
}

export const getPendingBusinesses = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.pending}?${params.toString()}`;
    return get(url);
}

export const getBusinesses = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.businesses}?${params.toString()}`;
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

export const acceptBusinessEdit = (businessID) => {
    const url = BASE_URL + paths.acceptEdit.replace(':businessID', businessID);
    return post(url);
}

export const declineBusinessEdit = (businessID) => {
    const url = BASE_URL + paths.declineEdit.replace(':businessID', businessID);
    return post(url);
}

export const getAdmin = (page) => {
    const params = new URLSearchParams({ page, limit: 5 });
    const url = `${BASE_URL}${paths.admin}?${params.toString()}`;
    return get(url);
}

export const removeAdmin = (email) => {
    const url = BASE_URL + paths.oneAdmin.replace(":email", email);
    return del(url);
}