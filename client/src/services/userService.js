const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { t } from "i18next";
import { post } from "./requester";

const paths = {
    setupProfile: "/users/profile-setup"
}

export const verifyProfile = (firstName, lastName, phone) => {
    const url = BASE_URL + paths.setupProfile;
    return post(url, {firstName, lastName, phone});
}