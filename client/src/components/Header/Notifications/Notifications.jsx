import { useTranslation } from 'react-i18next';
import { useMessage } from '../../../contexts/MessageContext';
import { NotificationItem } from './NotificationItem/NotificationItem';
import styles from './notifications.module.css';
import InfiniteScroll from "react-infinite-scroll-component";

export const Notifications = ({ messages,toggleOpen }) => {

    const { t } = useTranslation();

    const { setPage, page, hasMore } = useMessage();

    return (
        <>
            <div onClick={toggleOpen} className={styles['opacity']}>
            </div>
            <ul className={styles['notifications-div']} id='notifications-scroll'>
                <h2>{t('notifications')}</h2>
                <InfiniteScroll
                    dataLength={messages.length}
                    next={() => { setPage(page + 1) }}
                    hasMore={hasMore}
                    loader={<span className={styles['scroll-message']}>{t('loading')}...</span>}
                    endMessage={<span className={styles['scroll-message']}>{t('no-more')}</span>}
                    scrollableTarget="notifications-scroll"
                >
                    {messages.map((message) => {
                        return <NotificationItem key={message._id} message={message} />
                    })}
                </InfiniteScroll>
            </ul>
        </>
    )
}