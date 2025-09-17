import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getJob } from "../../../services/jobService";
import { Page404 } from "../../Page404/Page404";
import { Loader } from "../../shared/Loader/Loader";
import { JobBusinessInfo } from "./JobBusinessInfo/JobBusinessInfo";
import { JobOwnerInfo } from "./JobOwnerInfo/JobOwnerInfo";

import styles from './job.module.css'
import { JobDescription } from "./JobDescription/JobDescription";
import { useAuth } from "../../../contexts/AuthContext";
import { Warning } from "../Warning/Warning";
import { AdminReview } from "./AdminReview/AdminReview";
import { Approved } from "./Approved/Approved";
export const Job = () => {

    const params = useParams();

    const { user } = useAuth();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getJob(params.jobID)
            .then((data) => {
                setJob(data);
                if (!data.isAccepted) {
                    const isOwner = user?._id === data.owner.owner._id;
                    const isAdmin = user?.role === 'admin';
                    if (!user || (!isOwner && !isAdmin)) {
                        navigate('/');
                        return;
                    }
                }
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
                    {(user && user.role === 'admin' && job.isAccepted === false) && <div className={styles["admin-review-job"]}><AdminReview job={job} setIsLoading={setIsLoading} setJob={setJob}/></div>}
                    {(user && user._id == job.owner.owner._id && job.isAccepted === false) && <div className={styles["warning"]}><Warning message={'not-approved-warning'} /></div>}
                    {(user && user._id == job.owner.owner._id && job.isAccepted === true && job.isActive) && <div className={styles["warning"]}><Approved job={job} setIsLoading={setIsLoading} setJob={setJob}/></div>}
                    {!job.isActive && <div className={styles["warning"]}><Warning message={'archived-job-warning'} /></div>}
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