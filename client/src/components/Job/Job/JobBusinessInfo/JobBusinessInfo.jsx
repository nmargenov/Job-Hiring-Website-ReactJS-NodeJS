import { useTranslation } from 'react-i18next';
import styles from './jobBusinessInfo.module.css';
import { formatDate } from '../../../../utils/dateFormat';

export const JobBusinessInfo = ({ job }) => {
    const { t } = useTranslation();
    return (
        <div className={styles['main-div']}>
            <span className={styles['date']}>{formatDate(job.createdAt)}</span>
            <div className={styles['info-div']}>
                <div className={styles['title-div']}><strong>{job.title}</strong>, {job.owner.businessName}</div>
                {job.location && <div className={styles['item-div']}><i className="material-icons secondary-text">location_on</i>{job.location}</div>}
                {job.homeWork && <div className={styles['item-div']}><i className="material-icons secondary-text">chair</i>{t('homeWork')}</div>}
                {job.fullyRemote && <div className={styles['item-div']}><i className="material-icons secondary-text">public</i>{t('fullyRemote')}</div>}
                {job.experience && <div className={styles['item-div']}><i className="material-icons secondary-text">psychology</i>{t('years-experience')}<strong>{job.experience}</strong></div>}
                {job.salary && <div className={styles['item-div']}><i className="material-icons secondary-text">paid</i>{t('salary')}<strong>{job.salary}</strong></div>}
                {job.level.length > 0 && <div className={styles['item-div']}><i className="material-icons secondary-text">stairs</i>{t('level')}<strong>{job.level.map(level => t(level)).join(', ')}</strong></div>}
                {job.allTimeWork && <div className={styles['item-div']}><i className="material-icons secondary-text">work</i>{t('allTimeWork')}</div>}
                {job.fullTime && <div className={styles['item-div']}><i className="material-icons secondary-text">schedule</i>{t('fullTime')}</div>}
                {job.flexibleTime && <div className={styles['item-div']}><i className="material-icons secondary-text">history_toggle_off</i>{t('flexibleTime')}</div>}
                {job.vacation && <div className={styles['item-div']}><i className="material-icons secondary-text">beach_access</i>{t('vacation')} <strong>{job.vacation}</strong></div>}
                {job.languages.length > 0 && <div className={styles['item-div']}><i className="material-icons secondary-text">language</i><strong>{job.languages.map(language => t(language)).join(', ')}</strong></div>}
                {job.remoteInterview && <div className={styles['item-div']}><i className="material-icons secondary-text">3p</i>{t('remoteInterview')}</div>}
                {job.suitsNoExperience && <div className={styles['item-div']}><i className="material-icons secondary-text">moving</i>{t('suitsNoExperience')}</div>}

            </div>
        </div>
    )
}