import { useTranslation } from 'react-i18next';
import { useConsent } from '../../../contexts/CookieConsentContext';
import { useTheme } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPhone, faCookie, faClose, } from "@fortawesome/free-solid-svg-icons"

import { NavItem } from '../navItem/NavItem';

import styles from './nav.module.css';


export const Nav = ({ toggleOpen, onKey, isOpen }) => {
    const { prefs, setShowModal } = useConsent();
    const { changeTheme } = useTheme();

    const { i18n } = useTranslation();
    const { t } = useTranslation();


    const switchLang = (lng) => {
        i18n.changeLanguage(lng);
        if (prefs.language === true) {
            document.cookie = `i18next=${lng}; path=/; max-age=31536000`;
        }
    };

    function onLanguageClick(e, lang) {
        if (e.key === 'Enter') {
            switchLang(lang);
        }
    }

    function onThemeClick(e, theme) {
        if (e.key === 'Enter') {
            changeTheme(theme);
        }
    }

    function onCookieClick() {
        setShowModal(true);
    }

    return (
        <nav className={styles['nav']}>
            <div className={styles['section']}>
                <FontAwesomeIcon tabIndex={0}
                    onClick={toggleOpen} onKeyDown={(e) => { onKey(e) }} icon={faClose} />
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
            <div className={styles['section']}>
                <a onKeyDown={(e) => { onThemeClick(e, "en") }} tabIndex={0} className={styles['language-option']} onClick={() => changeTheme('light')}>{t("light-theme")}</a>
                <a onKeyDown={(e) => { onThemeClick(e, "bg") }} tabIndex={0} className={styles['language-option']} onClick={() => changeTheme('dark')}>{t("dark-theme")}</a>
            </div>
        </nav>
    )
};