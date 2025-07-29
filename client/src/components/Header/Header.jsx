import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faClose } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from 'react-i18next';

import { Nav } from './Nav/Nav';

import styles from './header.module.css';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useTranslation();

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    function onKey(e) {
        if (e.key === 'Enter') {
            toggleOpen();
        }
    }
   
    return (
        <header className={styles['header']}>
            <div className={styles['logo']}>
                <Link to={"/"}><img src='/images/logo.png' alt="" /></Link>
                <div className={styles['blue-box']}></div>
            </div>

            {!isOpen && <div className={styles['right-div']}>
                <Link to={"/login"} className={styles['login-button']}>{t("login")}</Link>
                <FontAwesomeIcon tabIndex={0}
                    onClick={toggleOpen} onKeyDown={(e) => { onKey(e) }} icon={isOpen ? faClose : faList} />
            </div>}

            {isOpen &&
                <>
                    <div onClick={toggleOpen} className={styles['nav-div']}></div>
                    <Nav isOpen={isOpen} onKey={onKey} toggleOpen={toggleOpen}/>
                </>
            }
        </header>
    )
};
