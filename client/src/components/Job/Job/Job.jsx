import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getJob } from "../../../services/jobService";
import { Page404 } from "../../Page404/Page404";
import { Loader } from "../../shared/Loader/Loader";
import { JobBusinessInfo } from "./JobBusinessInfo/JobBusinessInfo";
import { JobOwnerInfo } from "./JobOwnerInfo/JobOwnerInfo";

import styles from './job.module.css'
import { JobDescription } from "./JobDescription/JobDescription";
import { useAuth } from "../../../contexts/AuthContext";
import { NotApproved } from "../NotApproved/NotApproved";
export const Job = () => {

    const params = useParams();

    const { user } = useAuth();

    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getJob(params.jobID)
            .then((data) => {
                console.log(data);
                setJob(data);
                setError(false);
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                setError(true);
            });
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && error && <Page404 />}
            {!isLoading && !error &&
                <>
                    {(user && user._id == job.owner.owner._id && job.isAccepted === false) ?? <div className={styles["warning"]}><NotApproved/></div>}
                    < div className={styles['main']}>
                        <div className={styles['left-div']}>
                            <JobDescription job={job} />
                        </div>
                        <div className={styles['right-div']}>
                            <JobBusinessInfo job={job} />
                            <JobOwnerInfo job={job} />
                        </div>
                    </div >
                </>
            }
        </>
    )
}