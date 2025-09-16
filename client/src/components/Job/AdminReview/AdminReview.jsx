import { useTranslation } from 'react-i18next'
import styles from './adminReview.module.css'

export const AdminReview = () => {
    const { t } = useTranslation();
    return (
        <div className={styles['main']}>
            <div className={styles['warning']}>
                <i className='material-icons'>warning</i>{t('admin-review-job')}
            </div>
            <div className={styles['buttons']}>
                <button className={styles['design-button']}>{t('decline')}</button>
                <input type="submit" value={t('approve')} />
            </div>
        </div>
    )
}