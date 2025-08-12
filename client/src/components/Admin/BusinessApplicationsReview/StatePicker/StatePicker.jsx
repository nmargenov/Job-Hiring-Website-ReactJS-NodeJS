import { useTranslation } from 'react-i18next';
import { handleKeyPress } from '../../../../utils/handleKeyPress';
import styles from './statePicker.module.css';

export const StatePicker = ({ state, setState, setPage, setBusinesses }) => {

    const { t } = useTranslation();

    function onPendingClick() {
        if (state === 'pending') {
            return;
        }
        setPage(0);
        setBusinesses([]);
        setState('pending');
    }

    function onAllClick() {
        if (state === 'all') {
            return;
        }
        setPage(0);
        setBusinesses([]);
        setState('all')
    }

    return (
        <div className={styles['state-div']}>
            <span tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onPendingClick) }} className={state === 'pending' ? styles['active'] : null} onClick={onPendingClick}>{t('pending')}</span>
            <span tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onAllClick) }} className={state === 'all' ? styles['active'] : null} onClick={onAllClick}>{t('all')}</span>
        </div>
    )
}