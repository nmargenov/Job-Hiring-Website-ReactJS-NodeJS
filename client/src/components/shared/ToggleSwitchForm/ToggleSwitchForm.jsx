import { useRef } from 'react';
import { handleKeyPress } from '../../../utils/handleKeyPress'
import styles from './toggleSwitchForm.module.css'

export const ToggleSwitchForm = ({ check = false, action = () => { }, disabled = false, name }) => {

    const inputRef = useRef(null);

    function onKey(syntheticEvent) {
        if (syntheticEvent.key === "Enter" || syntheticEvent.key === " ") {
            syntheticEvent.target.checked = !syntheticEvent.target.checked;
            action(syntheticEvent);
        }
    }

    return (
        <>
            <label className={styles["switch"]}>
                <input ref={inputRef} name={name} type="checkbox" value={check} checked={check} disabled={disabled} onChange={action} />
                <span
                    {...(!disabled && { tabIndex: 0 })}
                    onKeyDown={(e) => {
                        const syntheticEvent = {
                            ...e,
                            target: inputRef.current,
                            currentTarget: inputRef.current,
                        };
                        onKey(syntheticEvent);
                    }}
                    className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </>
    )
}