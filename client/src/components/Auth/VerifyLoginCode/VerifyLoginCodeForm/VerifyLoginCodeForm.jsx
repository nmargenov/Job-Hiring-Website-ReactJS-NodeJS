import { t } from 'i18next';
import styles from '../../Login/LoginForm/loginForm.module.css';
import { useForm } from '../../../../hooks/useForm';
import {  } from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';

export const VerifyLoginCodeForm = ({ ref }) => {

    const navigate = useNavigate();

    const initialValues = {
        code: ''
    }

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
    }

    function verifyMaxLength(e) {
        const newValue = e.target.value;

        if (newValue.length <= 6) {
            onInputChange(e);
        }
    }

    return (
        <form className={styles['form']} onSubmit={onSubmit}>
            <div className={styles['error-msg-div']}>
                <span>{errorMsg}</span>
            </div>
            <div className={styles['input-container']}>
                <input
                    type="number"
                    name="code"
                    placeholder=''
                    autoCapitalize="none"
                    required
                    ref={ref}
                    className={`${values.code.length > 0 && values.code.length < 6 ? styles.invalid : ""}`}
                    value={values.code}
                    onChange={verifyMaxLength}
                    disabled={isLoading}
                />
                <label className={`${values.code.length > 0 && values.code.length < 6 ? styles['invalid-label'] : ""}`} htmlFor="email">{t('code')}</label>
            </div>
            <div className={styles['submit-div']}>
                <input type="submit" value={t('login')} disabled={isLoading || (values.code.length >= 0 && values.code.length < 6)} />
            </div>
        </form>
    )
}