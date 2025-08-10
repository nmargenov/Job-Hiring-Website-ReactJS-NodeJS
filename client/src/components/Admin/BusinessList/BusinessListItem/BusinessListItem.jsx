import { useState } from 'react';
import { checkPhotoURL } from '../../../../utils/checkPhotoURL';
import styles from './businessListItem.module.css';
import { acceptBusiness } from '../../../../services/adminService';

export const BusinessListItem = ({ item, setBusinesses }) => {

    const [errorMsg, setErrorMsg] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    function onAcceptClick() {
        setIsLoading(true);
        acceptBusiness(item._id)
            .then((data) => {
                removeBusinessFromArray();
                setIsLoading(false);
            }).catch((err) => {
                setErrorMsg(err.message);
                setIsLoading(false);
            })
    }

    function onDeclineClick() {
        removeBusinessFromArray();
        setErrorMsg('');
    }

    function removeBusinessFromArray() {
        setBusinesses(prev => prev.filter((p) => p._id !== item._id));
    }
    return (
        <li className={styles['list-item']}>
            <div className={styles['main-div-item']}>
                <div className={styles['left-div']}>
                    <div className={styles['image-div']}>
                        <img onClick={() => { setIsLoading(false) }} className={styles['profile-image']} src={item.owner.profilePicture ? checkPhotoURL(item.owner.profilePicture) : '/images/default.jpg'} alt="profile-picture" />                    </div>
                </div>
                <div className={styles['right-div']}>
                    <h2>{item.businessName}</h2>
                    <span>{item.bio}
                    </span>
                </div>
            </div>
            <div className={styles['actions']}>
                <div className={styles['error-msg']}>
                    <span>{errorMsg}</span>
                </div>
                <div className={styles['buttons']}>
                    <button disabled={isLoading} onClick={onDeclineClick} className={styles['design-button']}>Decline</button>
                    <input disabled={isLoading} onClick={onAcceptClick} type='submit' value={"Accept"} />
                </div>
            </div>
        </li>
    )
}