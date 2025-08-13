import { useEffect, useState } from 'react';
import { Loader } from '../../shared/Loader/Loader';
import styles from './businessApplicationsReview.module.css';
import { getBusinesses, getPendingBusinesses } from '../../../services/adminService';
import { useAdmin } from '../../../contexts/AdminContext';
import { BusinessList } from '../BusinessList/BusinessList';
import { StatePicker } from './StatePicker/StatePicker';
import { useTranslation } from 'react-i18next';
import { Page404 } from '../../Page404/Page404';

export const BusinessApplicationsReview = () => {
    const { businesses, setBusinesses, setHasMore, hasMore } = useAdmin();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [state, setState] = useState('pending');
    const [error, setError] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        switch (state) {
            case 'pending':
                getPending();
                break;
            case 'all':
                getAll();
                break;
        }
        return () => {
            setPage(0);
            setBusinesses([]);
        };
    }, [state])


    function getPending() {
        getPendingBusinesses(page)
            .then((data) => {
                setPage(prev => prev + 1);
                setIsLoading(false);
                setHasMore(data.hasMore);
                setBusinesses(prev => [...prev, ...data.businesses]);
                setError(false);
            }).catch((err) => {
                setError(true);
            })
    }

    function getAll() {
        getBusinesses(page)
            .then((data) => {
                setIsLoading(false);
                setPage(prev => prev + 1);
                setHasMore(data.hasMore);
                setBusinesses(prev => [...prev, ...data.businesses]);
                setError(false);
            }).catch((err) => {
                setError(true);
            })
    }

    function onMoreClick() {
        setIsLoading(true);
        switch (state) {
            case 'pending':
                getPending();
                break;
            case 'all':
                getAll();
                break;
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && !error && <div className={styles['review-div']}>
                <h1>{t('review')}</h1>
                <StatePicker setBusinesses={setBusinesses} setPage={setPage} state={state} setState={setState} />
                {businesses && businesses.length > 0 && <BusinessList setBusinesses={setBusinesses} businesses={businesses} />}
                {businesses && hasMore &&
                    <div>
                        <input type="submit" onClick={onMoreClick} value={t('load-more')} />
                    </div>}
                {businesses?.length > 0 && !hasMore &&
                    <div>
                        <h2>{t('no-more-load')}</h2>
                    </div>}
                {!businesses || businesses.length === 0 && <h2>{t('no-applications')}</h2>}
            </div>}
            {!isLoading && error && <Page404 errorLoading={true}/>}
        </>
    )
}