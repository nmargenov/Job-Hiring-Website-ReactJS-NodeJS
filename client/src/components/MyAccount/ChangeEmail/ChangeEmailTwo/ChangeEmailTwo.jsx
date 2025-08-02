import { useTranslation } from "react-i18next"
import { useForm } from "../../../../hooks/useForm";
import styles from './changeEmailTwo.module.css';
import { verifyEmailChange } from "../../../../services/userService";
import { useAuth } from "../../../../contexts/AuthContext";
import { VerifyCodeForm } from "../../../shared/VerifyCodeForm/VerifyCodeForm";
import { ResendCode } from "../../../shared/ResendCode/ResendCode";

export const ChangeEmailTwo = ({ goBack, email }) => {

    const { loginAuthContext } = useAuth();

    const { t } = useTranslation();
    const initialValues = {
        code: ''
    }

    const { values, onInputChange, onSubmitHandler, errorMsg, setErrorMsg, isLoading, setIsLoading } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        verifyEmailChange(values.code)
            .then((data) => {
                setIsLoading(false);
                setErrorMsg('');
                loginAuthContext(data);
                goBack();
            }).catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.message);
            })
    }

    return (
        <div className={styles['email-two']}>
            <big>{t('change-email-two-title')}</big>
            <span>{t('change-email-two-1')}</span>
            <span><strong>{t('change-email-two-2')}</strong> {email}</span>
            <span>{t('change-email-two-3')}</span>
            <VerifyCodeForm
                code={values.code}
                errorMsg={errorMsg}
                onSubmit={onSubmit}
                onCancelClick={goBack}
                buttonValue={'save'}
                isLoading={isLoading}
                onInputChange={onInputChange}
            />
            <ResendCode typeOfCode={'email'} isLoading={isLoading} setIsLoading={setIsLoading} email={email} />
        </div>
    )
}
