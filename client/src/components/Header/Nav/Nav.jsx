import { useTranslation } from 'react-i18next';
import { useConsent } from '../../../contexts/CookieConsentContext';
import { useTheme } from "../../../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPhone, faCookie, faClose, faSignOut, faUser, faUserShield, faBriefcase } from "@fortawesome/free-solid-svg-icons"

import { NavItem } from '../navItem/NavItem';

import styles from './nav.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { checkPhotoURL } from '../../../utils/checkPhotoURL';



export const Nav = ({ toggleOpen, onKey, isOpen }) => {
    const { prefs, setShowModal } = useConsent();
    const { changeTheme } = useTheme();

    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { user, isAuthenticated, logoutAuthContext } = useAuth();

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
        toggleOpen();
    }

    function onLogoutClick() {
        logoutAuthContext();
        toggleOpen();
    }

    function onProfileClick() {
        toggleOpen();
        navigate('/profile');
    }

    function onAdminClick() {
        toggleOpen();
        navigate('/admin');
    }

    return (
        <nav className={styles['nav']}>
            <div className={styles['section']}>
                <FontAwesomeIcon tabIndex={0}
                    onClick={toggleOpen} onKeyDown={(e) => { onKey(e) }} icon={faClose} />
                {!isAuthenticated &&
                    <Link onClick={toggleOpen} to={"/login"} className={styles['login-button']}>{t("login")}</Link>
                }
            </div>
            {isAuthenticated && user.isSetup &&
                <div onClick={onProfileClick} className={styles["user-info"]}>
                    <div className={styles['image-div']}><img src={user.profilePicture ? checkPhotoURL(user.profilePicture) : '/images/default.jpg'} alt="profile-picture" /></div>
                    {(user.role === "seeker" || user.role === "admin") &&
                        <span>{user.firstName} {user.lastName}</span>
                    }
                    {user.role === "hirer" &&
                        <span>{user.businessName}</span>}
                </div>
            }
            <div className={styles['section']}>
                <NavItem destination={'/'} icon={faHome} text={t("homepage")} onClick={toggleOpen} />
                {isAuthenticated && user.isSetup &&
                    <NavItem icon={faUser} destination={'/profile'} onClick={toggleOpen} text={t("account")} />}
                {isAuthenticated && user.role === 'admin' && <NavItem destination={'/admin'} onClick={onAdminClick} icon={faUserShield} text={t("admin-panel")} />}
                <NavItem destination={'/contacts'} icon={faPhone} text={t("contacts")} onClick={toggleOpen} />
                {isAuthenticated && user.role === 'hirer' && <NavItem destination={'/create-job'} icon={faBriefcase} text={t("create-job")} onClick={toggleOpen} />}
                <NavItem onClick={onCookieClick} icon={faCookie} text={t("cookie-title")} />
                {isAuthenticated && <NavItem onClick={onLogoutClick} icon={faSignOut} text={t("logout")} />}
            </div>
            <div className={styles['section']}>
                <a role='button' onKeyDown={(e) => { onLanguageClick(e, "en") }} tabIndex={0} className={styles['language-option']} onClick={() => switchLang('en')}>English</a>
                <a role='button' onKeyDown={(e) => { onLanguageClick(e, "bg") }} tabIndex={0} className={styles['language-option']} onClick={() => switchLang('bg')}>Български</a>
            </div>
            <div className={styles['section']}>
                <a role='button' onKeyDown={(e) => { onThemeClick(e, "light") }} tabIndex={0} className={styles['language-option']} onClick={() => changeTheme('light')}>{t("light-theme")}</a>
                <a role='button' onKeyDown={(e) => { onThemeClick(e, "dark") }} tabIndex={0} className={styles['language-option']} onClick={() => changeTheme('dark')}>{t("dark-theme")}</a>
            </div>
        </nav>
    )
};