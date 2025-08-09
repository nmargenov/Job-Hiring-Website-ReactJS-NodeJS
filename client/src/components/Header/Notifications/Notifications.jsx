import { useMessage } from '../../../contexts/MessageContext';
import { NotificationItem } from './NotificationItem/NotificationItem';
import styles from './notifications.module.css';
import InfiniteScroll from "react-infinite-scroll-component";

export const Notifications = ({ messages }) => {

    const { setPage, page, hasMore } = useMessage();

    return (
        <ul className={styles['notifications-div']} id='notifications-scroll'>
            <InfiniteScroll
                dataLength={messages.length}
                next={() => { setPage(page + 1) }}
                hasMore={hasMore}
                loader={"Loading..."}
                endMessage={"No more"}
                scrollableTarget="notifications-scroll" 
                >
                {messages.map((message) => {
                    return <NotificationItem key={message._id} message={message} />
                })}
            </InfiniteScroll>
        </ul>
    )
}