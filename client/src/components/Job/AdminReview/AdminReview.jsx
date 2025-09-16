import { useTranslation } from 'react-i18next'
import styles from './adminReview.module.css'
import { acceptJob, declineJob } from '../../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { handleKeyPress } from '../../../utils/handleKeyPress';

export const AdminReview = ({ setJob, setIsLoading, job }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    function onApproveClick() {
        setIsLoading(true);
        acceptJob(job._id)
            .then((data) => {
                setJob(data);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
            });
    }

    function onDeclineClick() {
        setIsLoading(true);
        declineJob(job._id)
            .then((data) => {
                navigate('/', { state: {
                    notification:true,
                    message:t('sucessfully-deleted-job')
                } });
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles['main']}>
            <div className={styles['warning']}>
                <i className='material-icons'>warning</i>{t('admin-review-job')}
            </div>
            <div className={styles['buttons']}>
                <button onKeyDown={(e) => { handleKeyPress(e, onDeclineClick) }} tabIndex={0} onClick={onDeclineClick} className={styles['design-button']}>{t('decline')}</button>
                <input type="submit" onClick={onApproveClick} value={t('approve')} />
            </div>
        </div>
    )
}