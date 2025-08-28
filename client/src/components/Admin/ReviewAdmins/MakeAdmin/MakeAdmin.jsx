import { useTranslation } from 'react-i18next';
import { useForm } from '../../../../hooks/useForm';
import { Form } from '../../../shared/Form/Form';
import { FormInput } from '../../../shared/FormInput/FormInput';
import styles from './makeAdmin.module.css';
import { getUsers } from '../../../../services/adminService';

export const MakeAdmin = () => {
    const initialValues = {
        email: ''
    }

    const { t } = useTranslation();

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        getUsers(values.email)
            .then((data)=>{
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div className={styles['main-div']}>
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
        </div>
    )
}