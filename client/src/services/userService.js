const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { t } from "i18next";
import { get, patch, post } from "./requester";

const paths = {
    setupProfile: "/users/profile-setup",
    profile: '/users/profile',
    userID: "/users/:userID",
    email: "/users/email",
    verifyEmailCode: "/users/email-code",
}

export const verifyProfile = (firstName, lastName, phone, countryCode) => {
    const url = BASE_URL + paths.setupProfile;
    return post(url, { firstName, lastName, phone, countryCode });
}

export const getProfile = () => {
    const url = BASE_URL + paths.profile;
    return get(url);
}

export const updateName = (userID, firstName, lastName) => {
    const url = BASE_URL + paths.userID.replace(':userID', userID);
    return patch(url, { firstName, lastName });
}

export const updatePhone = (userID, phone, countryCode) => {
    const url = BASE_URL + paths.userID.replace(':userID', userID);
    return patch(url, { phone, countryCode });
}

export const generateChangeEmailCode = (newEmail) => {
    const url = BASE_URL + paths.email;
    return post(url, { newEmail });
}

export const verifyEmailChange = (code) => {
    const url = BASE_URL + paths.verifyEmailCode;
    return post(url, { code });
}