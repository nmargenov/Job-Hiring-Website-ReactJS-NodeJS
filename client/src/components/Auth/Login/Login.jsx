import { useTranslation } from "react-i18next";

import styles from "./login.module.css";
import { LoginForm } from "./LoginForm/LoginForm";

export const Login = () => {
    const { t } = useTranslation();
    return (
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
            <LoginForm/>
        </div>
    )
}