import { useConsent } from "../../contexts/CookieConsentContext"
import { useTranslation } from "react-i18next";

import styles from "./cookieConsentContext.module.css";
import { ToggleSwitch } from "../shared/ToggleSwitch/ToggleSwitch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, } from "@fortawesome/free-solid-svg-icons"

export const CookieConsentModal = () => {
    const { prefs, tempPrefs, setPreference, savePreferences, showModal, acceptAll, acceptEssentials } = useConsent();
    const { t } = useTranslation();

    if (!showModal) return null;

    function onKey(e) {
        if (e.key === 'Enter' || e.key === "Escape") {
            acceptEssentials();
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            acceptEssentials();
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(styles.opacity)) {
            acceptEssentials();
        }
    };

    return (
        <div className={styles["main"]}>
            <div
                onClick={handleOutsideClick}
                onKeyDown={handleKeyDown}
                tabIndex={0} className={styles["opacity"]}>
            </div>
            <div className={styles["cookie-modal"]} role="dialog" aria-modal="true" aria-labelledby="consent-title">
                <div className={styles['title-div']}>
                    <span className={styles['title']} id="consent-title">{t('cookie-title')}</span>
                    <FontAwesomeIcon tabIndex={0}
                        onClick={acceptEssentials} onKeyDown={(e) => { onKey(e) }} icon={faClose} />
                </div>
                <div className={styles['usage-div']}>
                    <span className={styles['usage-title']}>{t('cookie-usage-title')}</span>
                    <span className={styles['usage']}>{t('cookie-usage')}</span>
                    <ul>
                        <li>
                            <label>
                                {t('required-cookie')}
                                <ToggleSwitch check={true} disabled={true} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {t('language-preferences')}
                                <ToggleSwitch check={tempPrefs.language} action={() => setPreference('language', !tempPrefs.language)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {t('theme-preference')}
                                <ToggleSwitch check={tempPrefs.theme} action={() => setPreference('theme', !tempPrefs.theme)} />
                            </label>
                        </li>
                    </ul>
                </div>
                <div className={styles["buttons-div"]}>
                    <button className={styles["save-settings-button"]} onClick={savePreferences}>{t('save-settings')}</button>
                    <button className={styles["accept-all-button"]} onClick={acceptAll}>{t('accept-all')}</button>
                </div>
            </div>
        </div>
    );
};