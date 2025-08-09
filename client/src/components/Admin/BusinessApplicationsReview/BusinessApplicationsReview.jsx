import { useEffect } from 'react';
import { Loader } from '../../shared/Loader/Loader';
import styles from './businessApplicationsReview.module.css';
import { getPendingBusinesses } from '../../../services/adminService';
import { useAdmin } from '../../../contexts/AdminContext';

export const BusinessApplicationsReview = () => {
    const { businesses, setBusinesses, setHasMore } = useAdmin();

    useEffect(() => {
        getPendingBusinesses()
            .then((data)=>{
                setHasMore(data.hasMore);
                setBusinesses(data.businesses);
            }).catch((err)=>{
                console.log(err);
            })

    }, [])
    return (
        <h1>review</h1>
    )
}