import { useTranslation } from 'react-i18next';
import styles from './formTextArea.module.css';


export const FormTextArea = ({ name, value, onInputChange, isLoading, minLength, maxLength, validate, onKey = () => {} }) => {

    const {t} = useTranslation();

    return (
        <div className={styles["textarea-container"]}>
            <textarea 
            id="message"
            minLength={minLength}
            maxLength={maxLength}
            placeholder=''
            name={name}
            onKeyDown={(e)=>{onKey(e)}}
            disabled={isLoading}
            onChange={onInputChange}
            value={value}
            >
            </textarea>
            <label htmlFor={name}>{t(name)}</label>
        </div>
    )
}