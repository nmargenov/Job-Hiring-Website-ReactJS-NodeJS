import styles from './previewPicture.module.css';
import { useTranslation } from "react-i18next";

export const PreviewPicture = ({ preview, onClose }) => {
    const { t } = useTranslation();

    return (
        <>
            <div onClick={onClose} className={styles['opacity']}>
            </div>
            <div className={styles['preview-picture-div']}>
                <div className={styles['image-div']}>
                    <img src={[preview]} alt="preview" />
                </div>
                <div className={styles['buttons-div']}>
                    <button className={styles['cancel-button']} onClick={onClose}>
                        {t('cancel')}
                    </button>
                    <button className={styles['save-button']}>
                        {t('save')}
                    </button>
                </div>
            </div>
        </>
    )
}