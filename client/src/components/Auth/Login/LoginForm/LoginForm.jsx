import { t } from 'i18next';
import styles from './loginForm.module.css';
import { useForm } from '../../../../hooks/useForm';
import { isValidEmail } from '../../../../utils/regex';

export const LoginForm = () => {

    const initialValues = {
        email: ''
    }

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
    }

    return (
        <form className={styles['form']} onSubmit={onSubmit}>
            <div className={styles['error-msg-div']}>
                <span>{errorMsg}</span>
            </div>
            <div className={styles['input-container']}>
                <input
                    type="email"
                    name="email"
                    placeholder=''
                    autoCapitalize="none"
                    required
                    minLength="3"
                    maxLength="40"
                    className={`${values.email.length > 0 && !isValidEmail(values.email) ? styles.invalid : ""}`}
                    value={values.email}
                    onChange={onInputChange}
                    disabled={isLoading}
                />
                <label className={`${values.email.length > 0 && !isValidEmail(values.email) ? styles['invalid-label'] : ""}`} htmlFor="email">{t('email')}</label>
            </div>
            <div className={styles['submit-div']}>
                <input type="submit" value={t('login')} disabled={isLoading || (values.email.length >= 0 && !isValidEmail(values.email))}/>
            </div>
        </form>
    )
}