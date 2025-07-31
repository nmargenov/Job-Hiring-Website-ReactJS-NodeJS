import { useTranslation } from 'react-i18next'
import styles from './form.module.css'


export const Form = ({ children, onSubmit, errorMsg, showSubmit = true, buttons = null }) => {

    const { t } = useTranslation();

    return (
        <form className={styles['form']} onSubmit={onSubmit}>
            {children}
            {showSubmit &&
                <div className={styles['submit-div']}>
                    <div className={styles['error-msg-div']}>
                        <span>{errorMsg}</span>
                    </div>
                    <div className={styles["buttons-div"]}>
                        {buttons && buttons}
                    </div>
                </div>
            }
        </form>
    )
}