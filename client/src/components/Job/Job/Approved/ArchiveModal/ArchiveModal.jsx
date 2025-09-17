import { useTranslation } from 'react-i18next'
import styles from './archiveModal.module.css'
import { handleKeyPress } from '../../../../../utils/handleKeyPress';

export const ArchiveModal = ({setOpen}) => {
    const { t } = useTranslation();

    function toggleOpen(){
        setOpen(false);
    }

    return (
        <div className={styles['main']}>
            <div
                onClick={toggleOpen}
                className={styles["opacity"]}>
            </div>
            <div className={styles['modal']}>
                <h2>{t('archive-job')}</h2>
                <p>{t('archive-job-message')}</p>
                <div className={styles['buttons']}>
                    <button onKeyDown={(e)=>{handleKeyPress(e,toggleOpen)}} onClick={toggleOpen} tabIndex={0} className={styles['design-button']}>{t('cancel')}</button>
                    <input type="submit" value={t('archive')} />
                </div>
            </div>
        </div>
    )
}