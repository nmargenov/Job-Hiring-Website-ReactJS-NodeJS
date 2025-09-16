import { useTranslation } from 'react-i18next'
import styles from './adminReview.module.css'
import { acceptJob } from '../../../services/adminService';

export const AdminReview = ({setJob,setIsLoading,job}) => {
    const { t } = useTranslation();

    function onApproveClick(){
        setIsLoading(true);
        acceptJob(job._id)
            .then((data)=>{
                setJob(data);
                setIsLoading(false);
            }).catch((err)=>{
                console.log(err);
            });
    }

    return (
        <div className={styles['main']}>
            <div className={styles['warning']}>
                <i className='material-icons'>warning</i>{t('admin-review-job')}
            </div>
            <div className={styles['buttons']}>
                <button className={styles['design-button']}>{t('decline')}</button>
                <input type="submit" onClick={onApproveClick} value={t('approve')} />
            </div>
        </div>
    )
}