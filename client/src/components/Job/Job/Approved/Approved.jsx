import { useTranslation } from 'react-i18next';
import styles from './approved.module.css';
import { useState } from 'react';
import { handleKeyPress } from '../../../../utils/handleKeyPress';
import { ArchiveModal } from './ArchiveModal/ArchiveModal';
import { useNavigate } from 'react-router-dom';

export const Approved = ({ setIsLoading, setJob, job }) => {
    const { t } = useTranslation();

    const [openArchived, setOpenArchived] = useState(false);

    const navigate = useNavigate();

    function onArchiveClick() {
        setOpenArchived(true);
    }

    function onEditClick() {
        navigate(`/job/${job._id}/edit`);
    }

    return (
        <>
            <div className={styles['main']}>
                <div className={styles['warning']}>
                    <i className='material-icons'>verified</i>{t('approved-listing')}
                </div>
                <div className={styles['buttons']}>
                    <button onKeyDown={(e) => { handleKeyPress(e, onArchiveClick) }} tabIndex={0} onClick={onArchiveClick} className={styles['design-button']}>{t('archive')}</button>
                    <input onClick={onEditClick} type="submit" value={t('edit')} />
                </div>
            </div>
            {openArchived && <ArchiveModal job={job} setIsLoading={setIsLoading} setJob={setJob} setOpen={setOpenArchived} />}
        </>
    )
}