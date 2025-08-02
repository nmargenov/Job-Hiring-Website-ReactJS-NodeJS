import { useTranslation } from "react-i18next"
import { Form } from "../../../shared/Form/Form";
import { FormInput } from "../../../shared/FormInput/FormInput";
import { useForm } from "../../../../hooks/useForm";
import styles from './changeEmailOne.module.css';
import { isValidEmail } from "../../../../utils/regex";
import { generateChangeEmailCode } from "../../../../services/userService";

export const ChangeEmailOne = ({ user, goBack, setState, setEmail }) => {

    const initialValues = {
        newEmail: ''
    }

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    const { t } = useTranslation();

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        generateChangeEmailCode(values.newEmail)
            .then((data)=>{
                setState('second');
                setIsLoading(false);
                setEmail(values.newEmail);
                setErrorMsg('');
            }).catch((err)=>{
                setIsLoading(false);
                setErrorMsg(err.message);
            })
    }

    return (
        <div className={styles['email-one']}>
            <big>{t('change-email-one-title')}</big>
            <span><strong>{t('change-email-one-1')}</strong> {user.email}</span>
            <span>{t('change-email-one-2')}</span>
            <ul>
                <li>{t('change-email-one-3')}</li>
                <li>{t('change-email-one-4')}</li>
            </ul>
            <Form
                onSubmit={onSubmit}
                errorMsg={errorMsg}
                buttons={
                    <div className={styles['buttons-div']}>
                        <button disabled={isLoading} type="button" onClick={goBack} className={styles['design-button']}>{t('cancel')}</button>
                        <input
                            disabled={(isLoading || (values.newEmail.length >= 0 && !isValidEmail(values.newEmail)))}
                            type="submit"
                            value={t('forward')}
                        />
                    </div>}>
                <FormInput
                    formName={'newEmail'}
                    value={values.newEmail}
                    onInputChange={onInputChange}
                    isLoading={isLoading}
                    type={'email'}
                    minLength={'3'}
                    maxLength={'50'}
                    validate={values.newEmail.length > 0 && !isValidEmail(values.newEmail)}
                />
            </Form>
        </div>
    )
}