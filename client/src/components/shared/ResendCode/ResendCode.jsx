import { useTranslation } from 'react-i18next';
import stylesButton from "../VerifyCodeForm/verifyCodeForm.module.css";
import { useState } from 'react';
import { login } from '../../../services/authService';
import { generateChangeEmailCode } from '../../../services/userService';

import styles from './resendCode.module.css';


export const ResendCode = ({ isLoading, setIsLoading, email, typeOfCode }) => {
    const { t } = useTranslation();

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function onResendClick() {
        setIsLoading(true);
        switch (typeOfCode) {
            case "login":
                login(email)
                    .then((data) => {
                        setError(false);
                        setMessage(t('code-sent'));
                        setIsLoading(false);
                    }).catch((err) => {
                        setError(true);
                        setMessage(err.message)
                        setIsLoading(false);
                    });
                break;
            case 'email':
                generateChangeEmailCode(email)
                    .then((data) => {
                        setError(false);
                        setMessage(t('code-sent'));
                        setIsLoading(false);
                    }).catch((err) => {
                        setError(true);
                        setMessage(err.message)
                        setIsLoading(false);
                    })
                break;
        }
    }

    function onShowClick() {
        setIsOpen(!isOpen);
    }

    function onKey(e) {
        if (e.key === 'Enter') {
            onShowClick();
        }
    }

    return (
        <div className={styles['resend-div']}>
            <span tabIndex={0} onKeyDown={(e) => { onKey(e) }} className={styles['show-span']} onClick={onShowClick}>{t('didnt-recieve-code-span')}</span>
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