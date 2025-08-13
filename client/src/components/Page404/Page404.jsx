import styles from './page404.module.css';
import { Link } from 'react-router-dom';
export const Page404 = ({ errorLoading = false }) => {
    return (
        <div className={styles["container"]}>
            <h1>404</h1>
            {!errorLoading &&
                <p>Oops! The page you're looking for doesn't exist.</p>
            }
            {errorLoading &&
                <p>Oops! Error loading the page.</p>
            }
            <Link to={'/'}>Go back to Home</Link>
        </div>
    )
}