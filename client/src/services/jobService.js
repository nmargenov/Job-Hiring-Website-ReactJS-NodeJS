const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { post, get, patch } from "./requester";

const PATHS = {
    jobs: "/jobs/",
    job: "/jobs/:jobID"
}

export const createJob = (title, description, salary, location, experience) => {
    const url = BASE_URL + PATHS.jobs;
    return post(url, { title, description, salary, location, experience })
}

export const getJob = (id) => {
    const url = BASE_URL + PATHS.job.replace(":jobID", id);
    return get(url);
}