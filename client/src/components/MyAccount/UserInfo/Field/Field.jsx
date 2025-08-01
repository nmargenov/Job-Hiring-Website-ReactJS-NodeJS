import styles from "./field.module.css";
import { useTranslation } from 'react-i18next'

export const Field = ({ icon, text }) => {
    const { t } = useTranslation();

    return (
        <div tabIndex={0} className={styles['field']}>
            <div className={styles['left-div']}>
                <i className="material-icons">{icon}</i>
                <span>{t(text)}</span>
            </div>
            <i className="material-icons">chevron_right</i>
        </div>
    )
}