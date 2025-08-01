import styles from "./myAccount.module.css";
import { Field } from "./Field/Field";
import { UserInfo } from "./UserInfo/UserInfo";
import { Box } from "./Box/Box";

export const MyAccount = () => {
    return (
        <div className={styles['account-div']}>
            <UserInfo />
            <div className={styles['fields']}>
                <Field icon={'mail'} text={'change-email'} />
                <Field icon={'edit'} text={'change-name'} />
                <Field icon={'phone'} text={'change-phone'} />
            </div>
            <div className={styles['boxes']}>
                <Box icon={'folder_shared'} text={'my-files'}/>
                <Box icon={'playlist_add_check'} text={'applies'}/>
            </div>
        </div>
    )
}