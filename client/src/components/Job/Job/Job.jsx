import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getJob } from "../../../services/jobService";
import { Page404 } from "../../Page404/Page404";

export const Job = () => {

    const params = useParams();

    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getJob(params.jobID)
            .then((data) => {
                setJob(data);
                setError(false);
                console.log(data);
            }).catch((err) => {
                setError(true);
                console.log(err);
            })
    }, [])

    return (
        <>
            {error && <Page404 />}
            {!error && <h1>job</h1>}
        </>
    )
}