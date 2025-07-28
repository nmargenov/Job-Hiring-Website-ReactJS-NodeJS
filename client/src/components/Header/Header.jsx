import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faClose, faHome, faContactCard, faPhone } from "@fortawesome/free-solid-svg-icons"
import { NavItem } from './navItem/NavItem';

import styles from './header.module.css';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    function onKey(e) {
        if (e.key === 'Enter') {
            toggleOpen();
        }
    }
    return (
        <header className={styles['header']}>
            <div className={styles['logo']}>
                <Link to={"/"}><img src='/images/logo.png' alt="" /></Link>
                <div className={styles['blue-box']}></div>
            </div>

            {!isOpen && <div className={styles['right-div']}>
                <Link to={"/login"} className={styles['login-button']}>Вход</Link>
                <FontAwesomeIcon tabIndex={0}
                    onClick={toggleOpen} onKeyDown={(e) => { onKey(e) }} icon={isOpen ? faClose : faList} />
            </div>}

            {isOpen &&
                <>
                    <div onClick={toggleOpen} className={styles['nav-div']}></div>
                    <nav className={styles['nav']}>
                        <div className={styles['section']}>
                            <Link onClick={toggleOpen} to={"/login"} className={styles['login-button']}>Вход</Link>
                        </div>
                        <div className={styles['section']}>
                            <NavItem destination={'/'} icon={faHome} text={"Начало"} toggleOpen={toggleOpen}/>
                            <NavItem destination={'/contacts'} icon={faPhone} text={"Контакти"} toggleOpen={toggleOpen}/>
                        </div>
                    </nav>
                </>
            }
        </header>
    );
};
