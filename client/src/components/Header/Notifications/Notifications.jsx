import { NotificationItem } from './NotificationItem/NotificationItem';
import styles from './notifications.module.css';

export const Notifications = ({messages}) => {
    return (
        <ul className={styles['notifications-div']}>
            {messages.map((message)=>{
               return <NotificationItem key={message._id} message={message}/>
            })}
        </ul>
    )
}