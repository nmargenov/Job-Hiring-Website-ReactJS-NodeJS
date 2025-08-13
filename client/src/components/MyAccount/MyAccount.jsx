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
import { useNavigate } from "react-router-dom";
import { Page404 } from "../Page404/Page404";

export const MyAccount = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userBackend, setUserBackend] = useState(null);

    const [isEditName, setIsEditName] = useState(false);
    const [isEditPhone, setIsEditPhone] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const id = user._id;
        setIsPageLoading(true);
        getProfile(id)
            .then((data) => {
                setError(false);
                setUserBackend(data);
                setIsPageLoading(false);
            }).catch((err) => {
                setError(true);
                setIsPageLoading(false);
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

    function onBusinessApplyClick() {
        navigate('/business/apply');
    }

    return (
        <>
            {isPageLoading && <Loader />}
            {!isPageLoading && !error && <>
                {isEditEmail && <ChangeEmail setIsEditEmail={setIsEditEmail} user={userBackend} />}
                {isEditPhone && <EditPhone setIsEditPhone={setIsEditPhone} user={userBackend} />}
                {isEditName && <EditName setIsEditName={setIsEditName} user={userBackend} />}
                {(!isEditName && !isEditPhone && !isEditEmail) && <div className={styles['account-div']}>
                    <UserInfo user={userBackend} />
                    <div className={styles['fields']}>
                        <Field onClick={onEmailClick} icon={'mail'} text={'change-email'} />
                        {(!userBackend.isApproved && userBackend.role !== 'hirer') && <Field onClick={onNameClick} icon={'edit'} text={'change-name'} />}
                        <Field onClick={onPhoneClick} icon={'phone'} text={'change-phone'} />
                        {(!userBackend.isApproved && userBackend.role === 'seeker') && <Field onClick={onBusinessApplyClick} icon={'business'} text={'apply-business'} />}
                    </div>
                    <div className={styles['boxes']}>
                        <Box onClick={() => { navigate('/files') }} icon={'folder_shared'} length={userBackend.files?.length || '0'} text={'my-files'} />
                        <Box icon={'playlist_add_check'} text={'applies'} />
                    </div>
                </div>}
            </>}
            {!isPageLoading && error && <Page404 errorLoading={true}/>}
        </>
    )
}