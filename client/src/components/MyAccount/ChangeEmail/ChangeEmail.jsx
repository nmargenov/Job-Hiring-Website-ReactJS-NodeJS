import { useState } from "react";
import { Form } from "../../shared/Form/Form"
import { ChangeEmailOne } from "./ChangeEmailOne/ChangeEmailOne"
import styles from './changeEmail.module.css';
import { ChangeEmailTwo } from "./ChangeEmailTwo/ChangeEmailTwo";

export const ChangeEmail = ({ user, setIsEditEmail }) => {

    const [state, setState] = useState('first');
    const [email, setEmail] = useState('');

    function goToProfile(){
        setIsEditEmail(false);
        setState('first');
    }

    return (
        <div className={styles['change-email-div']}>
            {state === 'first' && <ChangeEmailOne setEmail={setEmail} goBack={goToProfile} user={user} setState={setState}/>}
            {state === 'second' && <ChangeEmailTwo email={email} goBack={goToProfile} user={user} setState={setState}/>}
        </div >
    )
}