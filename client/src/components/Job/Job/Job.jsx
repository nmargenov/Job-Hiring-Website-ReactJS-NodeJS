import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getJob } from "../../../services/jobService";

export const Job = () => {

    const params = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        getJob(params.jobID)
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <h1>job</h1>
    )
}