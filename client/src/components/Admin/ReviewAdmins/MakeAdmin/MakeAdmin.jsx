import { useTranslation } from 'react-i18next';
import { useForm } from '../../../../hooks/useForm';
import { Form } from '../../../shared/Form/Form';
import { FormInput } from '../../../shared/FormInput/FormInput';
import styles from './makeAdmin.module.css';
import { getUsers } from '../../../../services/adminService';
import { Loader } from '../../../shared/Loader/Loader';
import { useState } from 'react';

export const MakeAdmin = ({ isLoading, setIsLoading }) => {
    const initialValues = {
        email: ''
    }

    const [users, setUsers] = useState([]);
    const [hasSearch, setHasSearch] = useState('');

    const { t } = useTranslation();

    const { values, onInputChange, onSubmitHandler, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        getUsers(values.email)
            .then((data) => {
                setUsers(data);
                setHasSearch()
                setIsLoading(false);
                setErrorMsg('');
                setHasSearch(values.email);
            }).catch((err) => {
                setErrorMsg(err.message);
                setUsers([]); 
                setIsLoading(false);
            })
    }

    return (
        <>
            {isLoading &&
                <div className={styles['loader-div']}>
                    <Loader />
                </div>}
            {!isLoading && <div className={styles['main-div']}>
                <div className={styles['email-div']}>
                    <Form onSubmit={onSubmit}
                        errorMsg={errorMsg}
                        buttons={
                            <input type="submit" value={t('search')} disabled={(isLoading || (values.email.length >= 0 && values.email.length < 5))} />
                        }
                    >
                        <FormInput
                            formName={'email'}
                            value={values.email}
                            onInputChange={onInputChange}
                            isLoading={isLoading}
                            type={'text'}
                            minLength={'3'}
                            maxLength={'50'}
                            validate={values.email.length > 0 && values.email.length < 5}
                        />
                    </Form>
                </div>
            </div>}
            {!isLoading && hasSearch && !errorMsg &&
            <>
            {users.length > 0 && <></>}
            {users.length === 0 && <h2>No results for {hasSearch}</h2>}
            </>}
        </>
    )
}