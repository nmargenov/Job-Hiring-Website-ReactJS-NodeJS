import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getJob } from "../../../services/jobService";
import { Page404 } from "../../Page404/Page404";
import { Loader } from "../../shared/Loader/Loader";

export const Job = () => {

    const params = useParams();

    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getJob(params.jobID)
            .then((data) => {
                setIsLoading(false);
                setJob(data);
                setError(false);
                console.log(data);
            }).catch((err) => {
                setIsLoading(false);
                setError(true);
                console.log(err);
            })
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && error && <Page404 />}
            {!isLoading && !error && <h1>job</h1>}
        </>
    )
}