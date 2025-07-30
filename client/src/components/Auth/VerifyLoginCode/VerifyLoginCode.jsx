import { useTranslation } from "react-i18next";

import styles from "../Login/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { VerifyLoginCodeForm } from "./VerifyLoginCodeForm/VerifyLoginCodeForm";

export const VerifyLoginCode = () => {
    const { t } = useTranslation();

    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles['main-login']}>
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
                        <p> {t("login-verify-span2")} </p>
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
                    <VerifyLoginCodeForm/>
                </ul>
            </div>
        </div>
    )
}