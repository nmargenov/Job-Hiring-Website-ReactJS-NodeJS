import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import styles from "./userInfo.module.css";

export const UserInfo = () => {
    return (
        <div className={styles['user-info-div']}>
            <div className={styles["image-div"]}>
                <img className={styles['profile-image']} src="https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg" alt="profile-picture" />
                <FontAwesomeIcon tabIndex={0} className={styles['camera']} icon={faCamera} />
            </div>
            <div className={styles["user-info-text"]}>
                <span className={styles['name']}>Nikolay margenov</span>
                <span className={styles['email']}>nikolay_margenov@yahoo.com</span>
                <span className={styles['phone']}>+359 884000403</span>
            </div>
        </div>
    )
}