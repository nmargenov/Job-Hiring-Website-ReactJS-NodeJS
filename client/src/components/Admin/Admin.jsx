import styles from './admin.module.css';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
    function onBusinessApplicationsClick() {
        navigate('/admin/business-review')
    }
    function onReviewClick() {
        navigate('/admin/review')
    }
    return (
        <>
            <div className={styles['action-div']}>
                <ul>
                    <li onClick={onBusinessApplicationsClick}>Review business account applications</li>
                    <li>Review job list requests</li>
                    <li onClick={onReviewClick}>Review admins</li>
                </ul>
            </div>
        </>
    )
}