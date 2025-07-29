import { useConsent } from "../../contexts/CookieConsentContext"
import { useTranslation } from "react-i18next";

import styles from "./cookieConsentContext.module.css";
import { ToggleSwitch } from "../shared/ToggleSwitch/ToggleSwitch";

export const CookieConsentModal = () => {
    const { prefs, setPreference, savePreferences, showModal, acceptAll } = useConsent();
    const { t } = useTranslation();

    if (!showModal) return null;


    return (
        <div className={styles["main"]}>
            <div className={styles["opacity"]}>
            </div>
            <div className={styles["cookie-modal"]} role="dialog" aria-modal="true" aria-labelledby="consent-title">
                <div className={styles['title-div']}>
                    <span className={styles['title']} id="consent-title">{t('cookie-title')}</span>
                </div>
                <div className={styles['usage-div']}>
                    <span className={styles['usage-title']}>{t('cookie-usage-title')}</span>
                    <span className={styles['usage']}>{t('cookie-usage')}</span>
                    <ul>
                        <li>
                            <label>
                                {t('required-cookie')}
                                <ToggleSwitch check={true} disabled={true}/>
                            </label>
                        </li>
                        <li>
                            <label>
                                {t('language-preferences')}
                                <ToggleSwitch check={prefs.language}  action={() => setPreference('language', !prefs.language)}/>
                            </label>
                        </li>
                        <li>
                            <label>
                                {t('theme-preference')}
                                <ToggleSwitch check={prefs.theme}  action={() => setPreference('theme', !prefs.theme)}/>
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