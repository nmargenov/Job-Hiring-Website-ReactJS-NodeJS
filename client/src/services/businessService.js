const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { post } from "./requester";

const PATHS = {
    apply: "/business/"
}

export const apply = (businessName, bio, employeeCount) => {
    const url = BASE_URL + PATHS.apply;
    return post(url, { businessName, bio, employeeCount });
} 