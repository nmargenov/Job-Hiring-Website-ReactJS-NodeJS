import styles from "./myAccount.module.css";
import { Field } from "./Field/Field";
import { UserInfo } from "./UserInfo/UserInfo";
import { Box } from "./Box/Box";
import { EditName } from "./EditName/EditName";
import { useEffect, useState } from 'react';
import { Loader } from "../shared/Loader/Loader";
import { getProfile } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

export const MyAccount = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userBackend, setUserBackend] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const id = user._id;
        getProfile(id)
            .then((data) => {
                setUserBackend(data);
                setIsPageLoading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            {isPageLoading && <Loader />}
            {/* <EditName /> */}
            {!isPageLoading &&
                <div className={styles['account-div']}>
                    <UserInfo user={userBackend} />
                    <div className={styles['fields']}>
                        <Field icon={'mail'} text={'change-email'} />
                        <Field icon={'edit'} text={'change-name'} />
                        <Field icon={'phone'} text={'change-phone'} />
                    </div>
                    <div className={styles['boxes']}>
                        <Box icon={'folder_shared'} text={'my-files'} />
                        <Box icon={'playlist_add_check'} text={'applies'} />
                    </div>
                </div>}
        </>
    )
}