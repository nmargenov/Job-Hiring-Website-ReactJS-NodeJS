import { useTranslation } from 'react-i18next'
import styles from './archiveModal.module.css'
import { handleKeyPress } from '../../../../../utils/handleKeyPress';
import { archiveJob } from '../../../../../services/jobService';

export const ArchiveModal = ({ setOpen, setIsLoading, setJob, job }) => {
    const { t } = useTranslation();

    function toggleOpen() {
        setOpen(false);
    }

    function onAcceptArchive() {
        setIsLoading(true);
        archiveJob(job._id)
            .then((data) => {
                setIsLoading(false);
                setJob(data);
            }).catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
    }

    return (
        <div className={styles['main']}>
            <div
                onClick={toggleOpen}
                className={styles["opacity"]}>
            </div>
            <div className={styles['modal']}>
                <h2>{t('archive-job')}</h2>
                <p>{t('archive-job-message')}</p>
                <div className={styles['buttons']}>
                    <button onKeyDown={(e) => { handleKeyPress(e, toggleOpen) }} onClick={toggleOpen} tabIndex={0} className={styles['design-button']}>{t('cancel')}</button>
                    <input onClick={onAcceptArchive} type="submit" value={t('archive')} />
                </div>
            </div>
        </div>
    )
}