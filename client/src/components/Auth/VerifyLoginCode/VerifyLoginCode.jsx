import { useTranslation } from "react-i18next";

import styles from "../Login/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { VerifyLoginCodeForm } from "./VerifyLoginCodeForm/VerifyLoginCodeForm";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getEmailByID } from "../../../services/authService";
import { Loader } from "../../shared/Loader/Loader";
import { ResendCode } from "../../shared/ResendCode/ResendCode";

export const VerifyLoginCode = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const inputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setIsPageLoading(true);
            getEmailByID(id)
                .then((data) => {
                    setIsPageLoading(false);
                    setEmail(data.email);
                })
                .catch((err) => {
                    setIsPageLoading(false);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, []);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles['main-login']}>
            {isPageLoading && <Loader />}

            {!isPageLoading && <>
                <div className={styles['login-icon']}>
                    <FontAwesomeIcon onClick={handleFocus} icon={faLock} />
                    <span>{t('code-verification-title')}</span>
                </div>
                <div className={styles["login-div"]}>
                    <h2>{t('code-verification-title')}</h2>
                    <ul>
                        <li>
                            <p> {t("login-verify-span1")} </p>
                        </li>
                        <li>
                            <p> {t("login-verify-span2")} <strong>{email}</strong> </p>
                        </li>
                        <li>
                            <p> {t("login-verify-span3")} </p>
                        </li>
                        <li>
                            <p> {t("login-verify-span4")} </p>
                        </li>
                        <li>
                            <p> {t("login-verify-span5")} </p>
                        </li>
                    </ul>
                    <VerifyLoginCodeForm isLoading={isFormSubmitted} setIsLoading={setIsFormSubmitted} ref={inputRef} email={email} />
                    <ResendCode typeOfCode={'login'} isLoading={isFormSubmitted} setIsLoading={setIsFormSubmitted} email={email} />
                </div>
            </>}
        </div>
    )
}