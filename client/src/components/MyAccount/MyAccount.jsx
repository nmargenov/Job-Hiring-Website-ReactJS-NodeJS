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
import { ChangeEmail } from "./ChangeEmail/ChangeEmail";

export const MyAccount = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userBackend, setUserBackend] = useState(null);

    const [isEditName, setIsEditName] = useState(false);
    const [isEditPhone, setIsEditPhone] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);
    const [isBusinessApply, setIsBusinessApply] = useState(false);


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

    function onEmailClick() {
        setIsEditEmail(true);
    }

    function onBusinessApplyClick(){
        setIsBusinessApply(true);
    }

    return (
        <>
            {isPageLoading && <Loader />}
            {!isPageLoading && <>
                {isEditEmail && <ChangeEmail setIsEditEmail={setIsEditEmail} user={userBackend} />}
                {isEditPhone && <EditPhone setIsEditPhone={setIsEditPhone} user={userBackend} />}
                {isEditName && <EditName setIsEditName={setIsEditName} user={userBackend} />}
                {(!isEditName && !isEditPhone && !isEditEmail && !isBusinessApply) && <div className={styles['account-div']}>
                    <UserInfo user={userBackend} />
                    <div className={styles['fields']}>
                        <Field onClick={onEmailClick} icon={'mail'} text={'change-email'} />
                        {(!userBackend.isApproved && userBackend.role !== 'hirer') && <Field onClick={onNameClick} icon={'edit'} text={'change-name'} />}
                        <Field onClick={onPhoneClick} icon={'phone'} text={'change-phone'} />
                        {(!userBackend.isApproved && userBackend.role !== 'hirer') && <Field onClick={onBusinessApplyClick} icon={'business'} text={'apply-business'} />}
                    </div>
                    <div className={styles['boxes']}>
                        <Box icon={'folder_shared'} text={'my-files'} />
                        <Box icon={'playlist_add_check'} text={'applies'} />
                    </div>
                </div>}</>}
        </>
    )
}