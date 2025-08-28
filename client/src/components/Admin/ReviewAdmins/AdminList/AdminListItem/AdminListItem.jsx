import { useState } from 'react';
import styles from './adminListItem.module.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../../contexts/AuthContext';
import { removeAdmin } from '../../../../../services/adminService';
import { checkPhotoURL } from '../../../../../utils/checkPhotoURL';

export const AdminlistItem = ({ item, isLoading, setIsLoading, setAdmins }) => {

    const [errorMsg, setErrorMsg] = useState('');
    const [accept, setAccept] = useState(false);

    const { t } = useTranslation();

    const { user } = useAuth();

    function onAcceptClick() {
        setIsLoading(true);
        removeAdmin(item.email)
            .then((data) => {
                setIsLoading(false);
                setErrorMsg('');
                setAdmins(prev => prev.filter(admin => admin.email !== data.email));
            }).catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.message);
            })
    }

    function onDeclineClick(){
        setAccept(false);
    }

    function onRemoveClick(){
        setAccept(true);
    }

    return (
        <li className={styles['list-item']}>
            <div tabIndex={0}
                className={styles['main-div-item']}>
                <div className={styles['left-div']}>
                    <div className={styles['image-div']}>
                        <img className={styles['profile-image']} src={item.profilePicture ? checkPhotoURL(item.profilePicture) : '/images/default.jpg'} alt="profile-picture" />                    </div>
                </div>
                <div className={styles['right-div']}>
                    <h2>{item.firstName} {item.lastName}</h2>
                    <span>{item.email}</span>
                    <span>{item.countryCode} {item.phone}</span>
                </div>
            </div>
            {item._id !== user._id && <div className={styles['actions']}>
                <div className={styles['error-msg']}>
                    <span>{errorMsg}</span>
                </div>
                <div className={styles['buttons']}>
                    {!accept && <input onClick={onRemoveClick} disabled={isLoading} type="submit" value={t("remove-admin")} />}
                    {accept && <>
                        <button disabled={isLoading} onClick={onDeclineClick} className={styles['design-button']}>{t('decline')}</button>
                        <input disabled={isLoading} onClick={onAcceptClick} type='submit' value={t('approve')} />
                    </>}
                </div>
            </div>}
        </li>
    )
}