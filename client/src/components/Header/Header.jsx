import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faClose, faHome, faPhone, faCookie } from "@fortawesome/free-solid-svg-icons"
import { NavItem } from './navItem/NavItem';
import { useTranslation } from 'react-i18next';
import { useConsent } from '../../contexts/CookieConsentContext';
import { useTheme } from "../../contexts/ThemeContext";

import styles from './header.module.css';


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {prefs, setShowModal } = useConsent();
    const { theme, changeTheme } = useTheme();

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

    function onLanguageClick(e, lang) {
        if (e.key === 'Enter') {
            switchLang(lang);
        }
    }

    function onCookieClick() {
        setShowModal(true);
    }

    return (
        <header className={styles['header']}>
            {theme === "light" && <span>light</span>}
            {theme === "dark" && <span>dark</span>}
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
                            <NavItem destination={'/'} icon={faHome} text={t("homepage")} onClick={toggleOpen} />
                            <NavItem destination={'/contacts'} icon={faPhone} text={t("contacts")} onClick={toggleOpen} />
                            <NavItem onClick={onCookieClick} icon={faCookie} text={t("cookie-title")} />
                        </div>
                        <div className={styles['section']}>
                            <a onKeyDown={(e) => { onLanguageClick(e, "en") }} tabIndex={0} className={styles['language-option']} onClick={() => switchLang('en')}>English</a>
                            <a onKeyDown={(e) => { onLanguageClick(e, "bg") }} tabIndex={0} className={styles['language-option']} onClick={() => switchLang('bg')}>Български</a>
                        </div>
                        <span onClick={() => { changeTheme('light') }}>light</span>
                        <span onClick={() => { changeTheme('dark') }}>dark</span>
                        <span onClick={() => { console.log(prefs) }}>prefs</span>
                    </nav>

                </>
            }
        </header>
    );
};
