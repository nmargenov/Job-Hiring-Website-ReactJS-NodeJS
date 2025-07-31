import styles from "./formInput.module.css";
import { useTranslation } from "react-i18next";

export const FormInput = ({ formName, value, onInputChange, isLoading, type, minLength, maxLength, ref, validate }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles['input-container']}>
                <input
                    type={type}
                    name={formName}
                    placeholder=''
                    required
                    ref={ref}
                    minLength={minLength}
                    maxLength={maxLength}
                    className={`${validate ? styles['invalid'] : ""}`}
                    value={value}
                    onChange={onInputChange}
                    disabled={isLoading}
                />
                <label className={`${validate ? styles['invalid-label'] : ""}`} htmlFor={formName}>{t(formName)}</label>
            </div>
        </>)
}