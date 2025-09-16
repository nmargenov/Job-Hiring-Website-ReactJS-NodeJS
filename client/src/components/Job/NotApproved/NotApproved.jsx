import { useTranslation } from 'react-i18next'
import styles from './notApproved.module.css'

export const NotApproved = () => {
    const { t } = useTranslation();
    return (
        <div className={styles['main']}>
            <i className='material-icons'>warning</i>{t('not-approved-warning')}
        </div>
    )
}