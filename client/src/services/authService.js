const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { t } from "i18next";
import { get, post } from "./requester";

const paths = {
    login: '/users/login',
    getEmail: '/users/login/code/:codeID',
    verifyCode: '/users/login/code'
}

export const login = (email) => {
    if (!email) {
        return Promise.reject(new Error(t('required-email')));
    }
    const url = BASE_URL + paths.login;
    return post(url, { email });
}

export const getEmailByID = (codeID) => {
    if (!codeID) {
        return Promise.reject(new Error(t('required-code')));
    }
    const url = BASE_URL + paths.getEmail.replace(':codeID', codeID);
    return get(url);
}

export const verifyCode = (email, code) => {
    if (!email) {
        return Promise.reject(new Error(t('required-email')));
    }
    if (!code) {
        return Promise.reject(new Error(t('required-code')));
    }
    const url = BASE_URL + paths.verifyCode;
    return post(url, { email, code });
}