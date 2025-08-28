import { useEffect, useState } from "react"
import { getAdmin } from "../../../../services/adminService"
import { AdminlistItem } from "./AdminListItem/AdminListItem";
import { Loader } from "../../../shared/Loader/Loader";

import styles from './adminList.module.css';
import { useTranslation } from "react-i18next";

export const AdminList = ({ isLoading, setIsLoading }) => {

    const [admins, setAdmins] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(0);

    const { t } = useTranslation();

    useEffect(() => {
        getAdmins();

        return () => {
            setPage(0);
            setAdmins([]);
        }
    }, []);

    function getAdmins() {
        setIsLoading(true);
        getAdmin(page)
            .then((data) => {
                setIsLoading(false);
                setAdmins(prev => [...prev, ...data.admins]);
                setHasMore(data.hasMore);
                setPage(prev => prev + 1);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
    }

    function onMoreClick() {
        getAdmins();
    }

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                <ul>
                    {admins.map(admin => {
                        return <AdminlistItem isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setAdmins={setAdmins} key={admin._id} item={admin} />
                    })}
                    {hasMore &&
                        <div className={styles['more-div']}>
                            <input onClick={onMoreClick} type="submit" value={t('load-more')} />
                        </div>
                    }
                    {!hasMore && <h2>{t('no-more-admins')}</h2>}
                </ul>
            }
        </>
    )
}