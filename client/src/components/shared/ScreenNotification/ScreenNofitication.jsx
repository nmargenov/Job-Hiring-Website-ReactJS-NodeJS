import styles from './screenNotification.module.css'

export const ScreenNotification = ({ message }) => {
    return (
        <div className={styles['main']}>
            <i className='material-icons'>warning</i>
            <span>{message}</span>
        </div>
    )
}