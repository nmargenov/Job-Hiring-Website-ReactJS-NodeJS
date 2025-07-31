import styles from './form.module.css'

export const Form = ({ children, onSubmit }) => {
    return (
        <form className={styles['form']} onSubmit={onSubmit}>
            {children}
        </form>
    )
}