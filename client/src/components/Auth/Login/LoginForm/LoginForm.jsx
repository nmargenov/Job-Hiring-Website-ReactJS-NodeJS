import { t } from 'i18next';
import styles from './loginForm.module.css';

export const LoginForm = () => {

    function onSubmit(e) {
        e.preventDefault();
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
                // value={values.username}
                // onChange={onInputChange}
                // disabled={isLoading}
                />
                <label htmlFor="email">{t('email')}</label>
            </div>
            <div className={styles['submit-div']}>
                <input type="submit" value={t('login')}/>
            </div>
        </form>
    )
}