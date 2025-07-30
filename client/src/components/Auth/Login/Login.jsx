import { useTranslation } from "react-i18next";

import styles from "./login.module.css";
import { LoginForm } from "./LoginForm/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

export const Login = () => {
    const { t } = useTranslation();

    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles['main-login']}>
            <div className={styles['login-icon']}>
                <FontAwesomeIcon onClick={handleFocus} icon={faSignIn} />
                <span>{t('login')}</span>
            </div>
            <div className={styles["login-div"]}>
                <h2>{t('login-title')}</h2>
                <ul>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t("login-span1") }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t("login-span2") }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t("login-span3") }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t("login-span4") }} />
                    </li>
                </ul>
                <LoginForm ref={inputRef} />
            </div>
        </div>
    )
}