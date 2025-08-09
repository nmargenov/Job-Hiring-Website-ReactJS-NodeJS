import { useNavigate } from 'react-router-dom';
import { useTime } from '../../../../hooks/useTime';
import styles from './notificationItem.module.css';
import { handleKeyPress } from '../../../../utils/handleKeyPress';

export const NotificationItem = ({ message,toggleOpen }) => {
    const { timeAgo } = useTime();
    const navigate = useNavigate()
    function onClick() {
        if (message.business !== null) {
            toggleOpen(); 
            navigate('/admin/business-review');
        }
    }

    return (
        <li tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => { handleKeyPress(e, onClick) }}
            className={`${styles['message-li']} ${!message.read ? styles['unread'] : ''}`}>
            <span className={styles['time-ago']}>{timeAgo(message.createdAt)}</span>
            <span>{message.context}</span>
        </li>
    )
}