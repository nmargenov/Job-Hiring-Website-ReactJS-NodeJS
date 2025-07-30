import styles from './navItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

export const NavItem = ({ icon, text, onClick, destination }) => {
    function onKey(e) {
        if (e.key === 'Enter') {
            onClick()
        }
    }
    return (
        <Link onClick={onClick} to={destination} tabIndex={0} onKeyDown={(e) => { onKey(e) }} className={styles['item']}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </Link>
    );
}
