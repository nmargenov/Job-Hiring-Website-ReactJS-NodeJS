import styles from "./myAccount.module.css";
import { Field } from "./Field/Field";
import { UserInfo } from "./UserInfo/UserInfo";
import { Box } from "./Box/Box";
import { EditName } from "./EditName/EditName";
import { useEffect, useState } from 'react';
import { Loader } from "../shared/Loader/Loader";
import { getProfile } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";
import { EditPhone } from "./EditPhone/EditPhone";

export const MyAccount = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userBackend, setUserBackend] = useState(null);

    const [isEditName, setIsEditName] = useState(false);
    const [isEditPhone, setIsEditPhone] = useState(false);


    const { user } = useAuth();

    useEffect(() => {
        const id = user._id;
        setIsPageLoading(true);
        getProfile(id)
            .then((data) => {
                setUserBackend(data);
                setIsPageLoading(false);
            }).catch((err) => {
            })
    }, [user]);

    function onNameClick() {
        setIsEditName(true);
    }

    function onPhoneClick() {
        setIsEditPhone(true);
    }


    return (
        <>
            {isPageLoading && <Loader />}
            {!isPageLoading && <>
                {isEditPhone && <EditPhone setIsEditPhone={setIsEditPhone} user={userBackend} />}
                {isEditName && <EditName setIsEditName={setIsEditName} user={userBackend} />}
                {(!isEditName && !isEditPhone) && <div className={styles['account-div']}>
                    <UserInfo user={userBackend} />
                    <div className={styles['fields']}>
                        <Field icon={'mail'} text={'change-email'} />
                        <Field onClick={onNameClick} icon={'edit'} text={'change-name'} />
                        <Field onClick={onPhoneClick} icon={'phone'} text={'change-phone'} />
                    </div>
                    <div className={styles['boxes']}>
                        <Box icon={'folder_shared'} text={'my-files'} />
                        <Box icon={'playlist_add_check'} text={'applies'} />
                    </div>
                </div>}</>}
        </>
    )
}