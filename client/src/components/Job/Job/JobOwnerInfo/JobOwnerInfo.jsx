import { useTranslation } from 'react-i18next';
import { checkPhotoURL } from '../../../../utils/checkPhotoURL';
import styles from './jobOwnerInfo.module.css';

export const JobOwnerInfo = ({ job }) => {
    const {t} = useTranslation();
    return (
        <div className={styles['main-div']}>
            <div className={styles['logo-name']}>
                <div className={styles['image-div']}>
                    <img src={job.owner.owner.profilePicture ? checkPhotoURL(job.owner.owner.profilePicture) : '/images/default.jpg'} alt="" />
                </div>
                <span>{job.owner.businessName}</span>
            </div>
            <div className={styles['businessBio']}>
                <p>{job.owner.bio}</p>
                <span><i className='material-icons'>people_alt</i>{job.owner.employeeCount} {t('employees').toLocaleLowerCase()}</span>
            </div>
        </div>
    )
}