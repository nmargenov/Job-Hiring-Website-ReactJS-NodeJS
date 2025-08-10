import { useEffect, useState } from 'react';
import { Loader } from '../../shared/Loader/Loader';
import styles from './businessApplicationsReview.module.css';
import { getPendingBusinesses } from '../../../services/adminService';
import { useAdmin } from '../../../contexts/AdminContext';
import { BusinessList } from '../BusinessList/BusinessList';
import { StatePicker } from './StatePicker/StatePicker';

export const BusinessApplicationsReview = () => {
    const { businesses, setBusinesses, setHasMore } = useAdmin();
    const [isLoading, setIsLoading] = useState(true);
    const [page,setPage] = useState(0);
    useEffect(() => {
        setIsLoading(true);
        getPendingBusinesses(page)
            .then((data) => {
                console.log(data);
                setIsLoading(false);
                setHasMore(data.hasMore);
                setBusinesses(data.businesses);
            }).catch((err) => {
                console.log(err);
            })

    }, [])
    return (
        <div className={styles['review-div']}>
            <h1>review</h1>
            <StatePicker />
            {!isLoading && <BusinessList setBusinesses={setBusinesses} businesses={businesses} />}
        </div>
    )
}