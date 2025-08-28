import { useTranslation } from 'react-i18next';
import { handleKeyPress } from '../../../../utils/handleKeyPress';
import styles from './statePicker.module.css';

export const StatePicker = ({ state, setState }) => {

    const { t } = useTranslation();

    function onMakeAdminClick() {
        if (state === 'make-admin') {
            return;
        }
        setState('make-admin');
    }

    function onAdminsListClick() {
        if (state === 'admin-list') {
            return;
        }
        setState('admin-list')
    }

    return (
        <div className={styles['state-div']}>
            <span tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onMakeAdminClick) }} className={state === 'make-admin' ? styles['active'] : null} onClick={onMakeAdminClick}>{t('search-user')}</span>
            <span tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onAdminsListClick) }} className={state === 'admin-list' ? styles['active'] : null} onClick={onAdminsListClick}>{t('admin-list')}</span>
        </div>
    )
}