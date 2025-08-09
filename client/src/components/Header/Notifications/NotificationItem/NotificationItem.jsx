import { useTime } from '../../../../hooks/useTime';
import styles from './notificationItem.module.css';

export const NotificationItem = ({ message }) => {
    const { timeAgo } = useTime();
    return (
        <li className={`${styles['message-li']} ${!message.read ? styles['unread'] : ''}`}>
            <span className={styles['time-ago']}>{timeAgo(message.createdAt)}</span>
            <span>{message.context}</span>
        </li>
    )
}