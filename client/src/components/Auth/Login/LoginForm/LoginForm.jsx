import { t } from 'i18next';
import styles from './loginForm.module.css';
import { useForm } from '../../../../hooks/useForm';
import { useEffect } from 'react';

export const LoginForm = () => {

    const initialValues = {
        email: ''
    }

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        console.log(values);
        // useEffect(() => {
        //     const timer = setTimeout(() => {
        //         console.log(values);
        //         setIsLoading(false);
        //     }, 2000);

        //     return () => clearTimeout(timer); // cleanup on unmount
        // }, []);
    }

    return (
        <form className={styles['form']} onSubmit={onSubmit}>
            <div className={styles['input-container']}>
                <input
                    type="email"
                    name="email"
                    placeholder=''
                    autoCapitalize="none"
                    required
                    minLength="3"
                    maxLength="40"
                    // className={`${values.username.length > 0 && values.username.length < 3 || !isValidUsername(values.username) ? styles.invalidField : ""}`}
                    value={values.email}
                    onChange={onInputChange}
                    disabled={isLoading}
                />
                <label htmlFor="email">{t('email')}</label>
            </div>
            <div className={styles['submit-div']}>
                <input type="submit" value={t('login')} disabled={isLoading}/>
            </div>
        </form>
    )
}