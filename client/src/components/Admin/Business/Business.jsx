import { useEffect, useState } from 'react';
import styles from './business.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getBusiness } from '../../../services/adminService';
import { Loader } from '../../shared/Loader/Loader';

export const Business = () => {

    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getBusiness(params.businessID)
            .then((data) => {
                setIsLoading(false);
                console.log(data);
            }).catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
    }, [])

    return (
        <>
            {isLoading &&<Loader />}
            {!isLoading && <h1>t</h1>}
        </>
    )
}