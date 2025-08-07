import styles from "./loader.module.css";

export const Loader = ({ smaller = false }) => {
    return (
        <span className={`${styles.loader} ${smaller ? styles.smaller : ""}`}></span>
    )
}