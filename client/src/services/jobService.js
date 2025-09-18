const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { post, get, patch } from "./requester";

const PATHS = {
    jobs: "/jobs/",
    job: "/jobs/:jobID",
    archiveJob: "/jobs/:jobID/archive"
}

export const createJob = (title,
    description,
    salary,
    location,
    experience,
    vacation,
    fullyRemote,
    homeWork,
    allTimeWork,
    fullTime,
    flexibleTime,
    remoteInterview,
    suitsNoExperience,
    languages,
    tech,
    level) => {
    const url = BASE_URL + PATHS.jobs;
    return post(url, {
        title,
        description,
        salary,
        location,
        experience,
        vacation,
        fullyRemote,
        homeWork,
        allTimeWork,
        fullTime,
        flexibleTime,
        remoteInterview,
        suitsNoExperience,
        languages,
        tech,
        level
    })
}

export const editJob = (id, title,
    description,
    salary,
    location,
    experience,
    vacation,
    fullyRemote,
    homeWork,
    allTimeWork,
    fullTime,
    flexibleTime,
    remoteInterview,
    suitsNoExperience,
    languages,
    tech,
    level) => {
    const url = BASE_URL + PATHS.job.replace(":jobID", id);
    return patch(url, {
        title,
        description,
        salary,
        location,
        experience,
        vacation,
        fullyRemote,
        homeWork,
        allTimeWork,
        fullTime,
        flexibleTime,
        remoteInterview,
        suitsNoExperience,
        languages,
        tech,
        level
    })
}


export const getJob = (id) => {
    const url = BASE_URL + PATHS.job.replace(":jobID", id);
    return get(url);
}


export const archiveJob = (id) => {
    const url = BASE_URL + PATHS.archiveJob.replace(":jobID", id);
    return post(url);
}