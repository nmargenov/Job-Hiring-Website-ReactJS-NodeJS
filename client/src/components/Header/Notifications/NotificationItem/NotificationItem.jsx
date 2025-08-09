import { useNavigate } from 'react-router-dom';
import { useTime } from '../../../../hooks/useTime';
import styles from './notificationItem.module.css';
import { handleKeyPress } from '../../../../utils/handleKeyPress';
import { readMessage } from '../../../../services/messageService';
import { useMessage } from '../../../../contexts/MessageContext';

export const NotificationItem = ({ message, toggleOpen }) => {
    const { timeAgo } = useTime();
    const navigate = useNavigate()
    const { setMessages, setTotalUnread } = useMessage();

    function onClick() {
        if (message.read === true) {
            return;
        }

        if (message.business !== null) {
            toggleOpen();
            navigate('/admin/business-review');
        }
        readMessage(message._id).then((data) => {
            setMessages(prev => prev.some(m => m._id === data._id)
                ? prev.map(m => (m._id === data._id ? data : m))
                : [data, ...prev]
            );
            setTotalUnread(prev=>prev-1);
        }).catch((err) => {
            console.log(err);
        })

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