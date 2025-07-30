const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { get, post } from "./requester";

const paths = {
    login:'/users/login',
    verifyCode:'/users/login/code/:codeID'
}

export const login = (email) =>{
    if(!email){
        return;
    }
    const url = BASE_URL + paths.login;
    return post(url,{email});
}

export const getEmailByID = (codeID) =>{
    if(!codeID){
        return;
    }
    const url = BASE_URL + paths.verifyCode.replace(':codeID',codeID);
    return get(url);z
}