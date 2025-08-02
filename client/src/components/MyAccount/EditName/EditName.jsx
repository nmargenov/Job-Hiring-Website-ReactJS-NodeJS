import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';
import { updateName } from '../../../services/userService';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import styles from '../shared/edit.module.css';

export const EditName = ({ user, setIsEditName }) => {

    const {t} = useTranslation();

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
    }

    const { values, onInputChange, isLoading, setIsLoading, onSubmitHandler, errorMsg, setErrorMsg } = useForm(initialValues);

    const { loginAuthContext } = useAuth();

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        updateName(user._id, values.firstName, values.lastName)
            .then((data) => {
                loginAuthContext(data);
                setErrorMsg('');
                setIsLoading(false);
                setIsEditName(false);
            }).catch((err) => {
                setErrorMsg(err.message);
                setIsLoading(false);
            })
    }

    const disabledSubmit = (isLoading || ((values.firstName.length >= 0 && values.firstName.length < 3) ||
        values.firstName.length > 30) ||
        ((values.lastName.length >= 0 && values.lastName.length < 5) ||
            values.lastName.length > 30));
    return (
        <>
            <div className={styles['edit-div']}>
                <Form
                    errorMsg={errorMsg}
                    onSubmit={onSubmit}
                    buttons={
                        <>
                            <button className={styles['design-button']}
                                onClick={()=>{setIsEditName(false)}}
                                type="button"
                                disabled={isLoading}
                            >{t('back')}</button>
                            <input
                                type='submit'
                                value={t("save")}
                                disabled={disabledSubmit} />
                        </>
                    }>
                        <big>{t('edit-name')}</big>
                        <span className={styles['description']}>{t('edit-name-text')}</span>
                    <FormInput
                        formName={'firstName'}
                        value={values.firstName}
                        onInputChange={onInputChange}
                        isLoading={isLoading}
                        type={'text'}
                        minLength={'3'}
                        maxLength={'30'}
                        onSubmit={onSubmit}
                        validate={(values.firstName.length > 0 && values.firstName.length < 3) || values.firstName.length > 30}
                    />
                    <FormInput
                        formName={'lastName'}
                        value={values.lastName}
                        onInputChange={onInputChange}
                        isLoading={isLoading}
                        type={'text'}
                        minLength={'3'}
                        maxLength={'30'}
                        onSubmit={onSubmit}
                        validate={(values.lastName.length > 0 && values.lastName.length < 5) || values.lastName.length > 30}
                    />
                </Form>
            </div>
        </>
    )
}