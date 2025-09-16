import styles from './jobDescription.module.css';

export const JobDescription = ({ job }) => {
    return (
        <div className={styles['main-div']}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
        </div>
    )
}