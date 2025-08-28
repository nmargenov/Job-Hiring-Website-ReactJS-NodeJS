import { useState } from "react"
import { AdminList } from "./AdminList/AdminList";
import { StatePicker } from "./StatePicker/StatePicker";
import { MakeAdmin } from "./MakeAdmin/MakeAdmin";
import styles from './reviewAdmins.module.css';

export const ReviewAdmins = () => {

    const [state, setState] = useState('make-admin');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={styles['main-div']}>
            {!isLoading && <StatePicker state={state} setState={setState}/>}
            {state === 'make-admin' && <MakeAdmin/>}
            {state === 'admin-list' && <AdminList isLoading={isLoading} setIsLoading={setIsLoading} />}
        </div>
    )
}