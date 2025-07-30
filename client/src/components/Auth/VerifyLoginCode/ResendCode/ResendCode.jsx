import { useTranslation } from 'react-i18next';
import styles from './resendCode.module.css';
import stylesButton from "../../Login/LoginForm/loginForm.module.css";
import { useState } from 'react';

export const ResendCode = ({ isLoading, setIsLoading }) => {
    const { t } = useTranslation();

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function onResendClick() {
        
    }

    function onShowClick(){
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles['resend-div']}>
            <span className={styles['show-span']} onClick={onShowClick}>{t('didnt-recieve-code-span')}</span>
            <div className={`${isOpen ? styles[""] : styles["hidden-div"]}`}>
                <p>{t('didnt-recieve-code-1')}</p>
                <ul>
                    <li>{t('didnt-recieve-code-2')}</li>
                    <li>{t('didnt-recieve-code-3')}</li>
                    <li>{t('didnt-recieve-code-4')}</li>
                    <li>{t('didnt-recieve-code-5')}</li>
                </ul>
                <p>{t('didnt-recieve-code-6')}</p>
                <input type="button" onClick={onResendClick} disabled={isLoading} className={stylesButton['design-button']} value={t('send-again-code')} />
                <div className={styles['msg-div']}>
                    <span className={`${error ? styles["error-msg"] : styles["success-msg"]}`}>{message}</span>
                </div>
            </div>
        </div>
    )
}