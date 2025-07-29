const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { post } from "./requester";

const paths = {
    login:'/users/login'
}

export const login = (email) =>{
    if(!email){
        return;
    }
    const url = BASE_URL + paths.login;
    return post(url,{email});
}

