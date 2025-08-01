import styles from "./myAccount.module.css";
import { Field } from "./UserInfo/Field/Field";
import { UserInfo } from "./UserInfo/UserInfo";

export const MyAccount = () => {
    return (
        <div className={styles['account-div']}>
            <UserInfo />
            <div className={styles['fields']}>
                <Field icon={'mail'} text={'change-email'}/>
                <Field icon={'edit'} text={'change-name'}/>
                <Field icon={'phone'} text={'change-phone'}/>
            </div>
        </div>
    )
}