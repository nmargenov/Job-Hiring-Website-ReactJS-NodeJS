import { useState } from 'react';
import styles from './userListItem.module.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../../contexts/AuthContext';
import { removeAdmin } from '../../../../../services/adminService';

export const UserListItem = ({ item, isLoading, setIsLoading, setUsers }) => {

    const [errorMsg, setErrorMsg] = useState('');
    const [accept, setAccept] = useState(false);

    const { t } = useTranslation();

    const { user } = useAuth();

    function onAcceptRemoveClick() {
        setIsLoading(true);
        removeAdmin(item.email)
            .then((data) => {
                setIsLoading(false);
                setErrorMsg('');
                setUsers(prev => prev.map(user => {
                    return user.email === item.email
                        ? { ...user, role: 'seeker' }
                        : user;
                }));
            }).catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.message);
            })
    }

    function onAcceptMakeAdminClick() {
        setIsLoading(true);
    }

    function onDeclineClick() {
        setAccept(false);
    }

    function onRemoveClick() {
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
                    <span>Role: {item.role}</span>
                </div>
            </div>
            {item._id !== user._id && <div className={styles['actions']}>
                <div className={styles['error-msg']}>
                    <span>{errorMsg}</span>
                </div>
                {item.role === 'admin' && <div className={styles['buttons']}>
                    {!accept && <input onClick={onRemoveClick} disabled={isLoading} type="submit" value={t("remove-admin")} />}
                    {accept && <>
                        <button disabled={isLoading} onClick={onDeclineClick} className={styles['design-button']}>{t('decline')}</button>
                        <input disabled={isLoading} onClick={onAcceptRemoveClick} type='submit' value={t('approve')} />
                    </>}
                </div>}
                {item.role === 'seeker' && <div className={styles['buttons']}>
                    {!accept && <input onClick={onRemoveClick} disabled={isLoading} type="submit" value={t("make-admin")} />}
                    {accept && <>
                        <button disabled={isLoading} onClick={onDeclineClick} className={styles['design-button']}>{t('decline')}</button>
                        <input disabled={isLoading} onClick={onAcceptMakeAdminClick} type='submit' value={t('approve')} />
                    </>}
                </div>}
            </div>}
        </li>
    )
}