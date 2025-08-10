import { useEffect, useState } from 'react';
import styles from './business.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getBusiness } from '../../../services/adminService';
import { Loader } from '../../shared/Loader/Loader';
import { checkPhotoURL } from '../../../utils/checkPhotoURL';
import { useTranslation } from 'react-i18next';

export const Business = () => {

    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [business, setBusiness] = useState(null);

    const navigate = useNavigate();

    const {t} = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        getBusiness(params.businessID)
            .then((data) => {
                setIsLoading(false);
                setBusiness(data);
                console.log(data);
            }).catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                <div className={styles['main-div']}>
                    <div className={styles['business-div']}>
                        <div className={styles['main-info-div']}>
                            <div className={styles['left-div']}>
                                <div className={styles['img-div']}>
                                    <img className={styles['img']} src={business.owner.profilePicture ? checkPhotoURL(business.owner.profilePicture) : '/images/default.jpg'} alt="profile-picture" />
                                </div>
                            </div>
                            <div className={styles['right-div']}>
                                <h2>{business.businessName}</h2>
                                <span>{business.bio}</span>
                            </div>
                        </div>
                        <div className={styles['secondary-info-div']}>
                            <div className={styles['employees-div']}>
                                <span>
                                    {t('employees')}
                                </span>
                                <big>{business.employeeCount}</big>
                            </div>
                            <div className={styles['status-div']}>
                                <span>
                                    {t('status')}
                                </span>
                                <big className={business.owner.isApproved ? styles['accepted'] : styles["pending"]}>
                                    {business.owner.isApproved ? `${t('approved')}` : `${t('pending')}`}</big>
                            </div>
                        </div>
                    </div>
                    <div className={styles['requester-info']}>
                        <h3>{t('requester-info')}</h3>
                        <div className={styles['row']}>
                            <span>{t('firstName')}</span>
                            <span>{business.owner.firstName}</span>
                        </div>
                        <div className={styles['row']}>
                            <span>{t('lastName')}</span>
                            <span>{business.owner.lastName}</span>
                        </div>
                        <div className={styles['row']}>
                            <span>{t('email')}</span>
                            <span>{business.owner.email}</span>
                        </div>
                        <div className={styles['row']}>
                            <span>{t('phone')}</span>
                            <span>{business.owner.phone}</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}