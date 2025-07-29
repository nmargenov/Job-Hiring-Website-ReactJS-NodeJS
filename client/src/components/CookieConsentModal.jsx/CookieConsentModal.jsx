import { useConsent } from "../../contexts/CookieConsentContext"
import { useTranslation } from "react-i18next";

import styles from "./cookieConsentContext.module.css";

export const CookieConsentModal = () => {
    const { prefs, setPreference, savePreferences, showModal, acceptAll } = useConsent();

    if (!showModal) return null;

    const { t } = useTranslation();

    return (
        <div className={styles["main"]}>
            <div className={styles["opacity"]}>
            </div>
            <div className={styles["cookie-modal"]} role="dialog" aria-modal="true" aria-labelledby="consent-title">
                <div className={styles['title-div']}>
                    <span className={styles['title']} id="consent-title">{t('cookie-title')}</span>
                </div>
                <div className={styles['usage-div']}>
                    <span className={styles['usage-title']}>{t('cookie-title')}</span>
                    <span className={styles['usage']}>{t('cookie-usage')}</span>
                    <ul>
                        <li>
                            <label>
                                Essential Cookies (required)
                                <input type="checkbox" checked disabled />
                            </label>
                        </li>
                        <li>
                            <label>
                                Language Preference
                                <input
                                    type="checkbox"
                                    checked={prefs.language}
                                    onChange={() => setPreference('language', !prefs.language)}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                Theme Preference
                                <input
                                    type="checkbox"
                                    checked={prefs.theme}
                                    onChange={() => setPreference('theme', !prefs.theme)}
                                />
                            </label>
                        </li>
                    </ul>
                </div>
                <div className={styles["buttons-div"]}>
                    <button className={styles["save-settings-button"]} onClick={savePreferences}>Save settings</button>
                    <button className={styles["accept-all-button"]} onClick={acceptAll}>Accept all</button>
                </div>
            </div>
        </div>
    );
};