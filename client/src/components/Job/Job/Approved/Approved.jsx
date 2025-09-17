import { useTranslation } from 'react-i18next';
import styles from './approved.module.css';
import { useState } from 'react';
import { handleKeyPress } from '../../../../utils/handleKeyPress';
import { ArchiveModal } from './ArchiveModal/ArchiveModal';

export const Approved = () => {
    const { t } = useTranslation();

    const [openArchived, setOpenArchived] = useState(false);

    function onArchiveClick() {
        setOpenArchived(true);
    }

    return (
        <>
            <div className={styles['main']}>
                <div className={styles['warning']}>
                    <i className='material-icons'>verified</i>{t('approved-listing')}
                </div>
                <div className={styles['buttons']}>
                    <button onKeyDown={(e) => { handleKeyPress(e, onArchiveClick) }} tabIndex={0} onClick={onArchiveClick} className={styles['design-button']}>{t('archive')}</button>
                    <input type="submit" value={t('edit')} />
                </div>
            </div>
            {openArchived && <ArchiveModal setOpen={setOpenArchived}/>}
        </>
    )
}