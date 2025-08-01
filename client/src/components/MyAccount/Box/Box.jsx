import styles from './box.module.css';
import { useTranslation } from 'react-i18next'

export const Box = ({ icon, text }) => {
    const { t } = useTranslation();

    return (
        <div tabIndex={0} role='button' className={styles['box']}>
            <i className='material-icons'>{icon}</i>
            <span>{t(text)}</span>
        </div>
    )
}