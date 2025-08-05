import { ProfilePictureUpload } from "./profilePictureUpload/ProfilePictureUpload";
import styles from "./userInfo.module.css";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const UserInfo = ({ user }) => {
    console.log(BASE_URL)
    const url = BASE_URL +"/"+ user.profilePicture;
    console.log(url);
    return (
        <div className={styles['user-info-div']}>
            <div className={styles["image-div"]}>
                <img className={styles['profile-image']} src={user.profilePicture ? url : 'https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg'} alt="profile-picture" />
                <ProfilePictureUpload user={user} />
            </div>
            <div className={styles["user-info-text"]}>
                {(!user.isApproved && user.role !== 'hirer') && <span className={styles['name']}>{user.firstName} {user.lastName}</span>}
                {(user.isApproved && user.role === 'hirer') && <span className={styles['name']}>{user.business.businessName}</span>}
                <span className={styles['email']}>{user.email}</span>
                <span className={styles['phone']}>{user.countryCode && user.countryCode} {user.phone}</span>
            </div>
        </div>
    )
}