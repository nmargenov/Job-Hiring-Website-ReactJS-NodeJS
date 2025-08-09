import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faClose } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from 'react-i18next';
import { Notifications } from './Notifications/Notifications'
import { Nav } from './Nav/Nav';

import styles from './header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useMessage } from '../../contexts/MessageContext';
import { handleKeyPress } from '../../utils/handleKeyPress';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);

    const { messages, hasUnreadMessages, unreadMessages, totalUnread } = useMessage();

    const { isAuthenticated } = useAuth();
    const { t } = useTranslation();

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    function onKey(e) {
        if (e.key === 'Enter') {
            toggleOpen();
        }
    }

    function toggleMessageOpen() {
        setIsMessagesOpen(!isMessagesOpen);
    }

    return (
        <header className={styles['header']}>
            <div className={styles['logo']}>
                <Link to={"/"}><img src='/images/logo.png' alt="" /></Link>
                <div className={styles['blue-box']}></div>
            </div>

            {!isOpen && <div className={styles['right-div']}>
                {!isAuthenticated &&
                    <Link to={"/login"} className={styles['login-button']}>{t("login")}</Link>
                }
                {isAuthenticated &&
                    <div className={styles['message-div']}>
                        <span tabIndex={0} onKeyDown={(e)=>{handleKeyPress(e,toggleMessageOpen)}} onClick={toggleMessageOpen} className="material-icons">message</span>
                        {(messages && hasUnreadMessages) && <span className={styles['message-count']}>{totalUnread}</span>}
                        {isMessagesOpen && <Notifications toggleOpen={toggleMessageOpen} messages={messages} />}
                    </div>
                }
                <FontAwesomeIcon tabIndex={0}
                    onClick={toggleOpen} onKeyDown={(e) => { onKey(e) }} icon={isOpen ? faClose : faList} />
            </div>}

            {isOpen &&
                <>
                    <div onClick={toggleOpen} className={styles['nav-div']}></div>
                    <Nav isOpen={isOpen} onKey={onKey} toggleOpen={toggleOpen} />
                </>
            }
        </header>
    )
};
