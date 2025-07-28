import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faClose, faHome, faPhone } from "@fortawesome/free-solid-svg-icons"
import { NavItem } from './navItem/NavItem';
import { useTranslation } from 'react-i18next';


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

    const { i18n } = useTranslation();

    const switchLang = (lng) => {
        i18n.changeLanguage(lng);
    };


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
                    <nav className={styles['nav']}>
                        <div className={styles['section']}>
                            <Link onClick={toggleOpen} to={"/login"} className={styles['login-button']}>{t("login")}</Link>
                        </div>
                        <div className={styles['section']}>
                            <NavItem destination={'/'} icon={faHome} text={t("homepage")} toggleOpen={toggleOpen} />
                            <NavItem destination={'/contacts'} icon={faPhone} text={t("contacts")} toggleOpen={toggleOpen} />
                        </div>
                        <div className={styles['section']}>
                            <button onClick={() => switchLang('en')}>English</button>
                            <button onClick={() => switchLang('bg')}>Български</button>
                        </div>
                    </nav>
                </>
            }
        </header>
    );
};
