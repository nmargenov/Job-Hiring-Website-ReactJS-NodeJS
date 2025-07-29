import styles from './toggleSwitch.module.css'

export const ToggleSwitch = ({check = false, action = ()=>{ }, disabled=false}) => {
    return (
        <>
            <label className={styles["switch"]}>
                <input type="checkbox" checked={check} disabled={disabled} onChange={action} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </>
    )
}