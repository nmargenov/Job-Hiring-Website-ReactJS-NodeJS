import styles from "./myAccount.module.css";
import { UserInfo } from "./UserInfo/UserInfo";

export const MyAccount = () =>{
    return (
        <div className={styles['account-div']}>
            <UserInfo/>
        </div>
    )
}