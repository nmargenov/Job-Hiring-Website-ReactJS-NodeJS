import styles from "./setupProfileActions.module.css";
import { useTranslation } from "react-i18next";

export const SetupProfileActions = ({ view, errorMsg, viewLastName, viewFirstName, viewPhone }) => {
    const { t } = useTranslation();

    return (
        <div className={styles['submit-div']}>
            <div className={styles['error-msg-div']}>
                <span>{errorMsg}</span>
            </div>
            <div className={styles["buttons-div"]}>
                {view === "firstName" &&
                    <button className={styles['design-button']} onClick={viewLastName} type="button">{t('forward')}</button>
                }
                {view === "lastName" &&
                    <>
                        <button className={styles['design-button']} onClick={viewFirstName} type="button">{t('back')}</button>
                        <button className={styles['design-button']} onClick={viewPhone} type="button">{t('forward')}</button>
                    </>
                }
                {view === "phone" &&
                    <>
                        <button className={styles['design-button']} onClick={viewLastName} type="button">{t('back')}</button>
                        <input type="submit" value={t('save')} />
                    </>
                }
        </div>
        </div >
    )
}