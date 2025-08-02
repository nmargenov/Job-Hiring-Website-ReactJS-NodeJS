import { useTranslation } from "react-i18next"
import { Form } from "../../../shared/Form/Form";
import { useForm } from "../../../../hooks/useForm";
import { FormInput } from "../../../shared/FormInput/FormInput";

import styles from './changeEmailTwo.module.css';
import { verifyEmailChange } from "../../../../services/userService";
import { useAuth } from "../../../../contexts/AuthContext";

export const ChangeEmailTwo = ({ goBack, email }) => {

    const { loginAuthContext } = useAuth();

    const { t } = useTranslation();
    const initialValues = {
        code: ''
    }

    const { values, onInputChange, onSubmitHandler, errorMsg, setErrorMsg, isLoading, setIsLoading } = useForm(initialValues);

    function verifyMaxLength(e) {
        const newValue = e.target.value;

        e.target.value = newValue.slice(0, 6);
        onInputChange(e);
    }

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
            <Form
                onSubmit={onSubmit}
                errorMsg={errorMsg}
                buttons={
                    <div className={styles['buttons-div']}>
                        <button disabled={isLoading} type="button" onClick={goBack} className={styles['design-button']}>{t('cancel')}</button>
                        <input
                            disabled={isLoading || (values.code.length >= 0 && values.code.length < 6)}
                            type="submit"
                            value={t('save')}
                        />
                    </div>}>
                <FormInput
                    formName={'code'}
                    value={values.code}
                    onInputChange={verifyMaxLength}
                    isLoading={isLoading}
                    type={'number'}
                    validate={values.code.length > 0 && values.code.length < 6}
                />
            </Form>
        </div>
    )
}