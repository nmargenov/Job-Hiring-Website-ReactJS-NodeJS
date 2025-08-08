import { useTranslation } from 'react-i18next';
import { useForm } from '../../../hooks/useForm';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import { FormTextArea } from '../../shared/FormTextArea/FormTextArea';
import styles from './apply.module.css';
import { apply } from '../../../services/businessService';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect } from 'react';
import { getProfile } from '../../../services/userService';
import { useState } from 'react';
import { Loader } from '../../shared/Loader/Loader';

export const Apply = () => {
    const [user, setUser] = useState(null);

    const initialValues = {
        businessName: '',
        businessBio: '',
        employeeCount: ''
    }

    const { user: userAuth, loginAuthContext } = useAuth();

    const [isPageLoading, setIsPageLoading] = useState(false);

    useEffect(() => {
        setIsPageLoading(true);
        getProfile()
            .then((data) => {
                setIsPageLoading(false);
                setUser(data);
                setValues({
                    businessName: data.business.businessName,
                    businessBio: data.business.bio,
                    employeeCount: data.business.employeeCount
                })
            }).catch((err) => {
                setIsPageLoading(false);
            })
    }, [userAuth])

    const { t } = useTranslation();

    const { values, setValues, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        apply(values.businessName, values.businessBio, values.employeeCount)
            .then((data) => {
                setIsLoading(false);
                setErrorMsg('');
                loginAuthContext(data);
            }).catch((err) => {
                setErrorMsg(err.message);
                setIsLoading(false);
            });
    }

    return (
        <>
            {isPageLoading && <Loader />}
            {!isPageLoading && <div className={styles['apply-main-div']}>
                <h2>{t('apply-business')}</h2>
                <span>{t('business-apply-description')}</span>
                <div className={styles['sucess-message-div']}>
                    {user?.hasBusinessApplication &&<span>{t('already-submitted')}</span>}
                </div>
                <Form onSubmit={onSubmit}
                    errorMsg={errorMsg}
                    buttons={
                        <input type='submit' disabled={isLoading || user?.hasBusinessApplication} value={t('apply')} />
                    }
                >
                    <FormInput
                        formName={'businessName'}
                        value={values.businessName}
                        onInputChange={onInputChange}
                        isLoading={isLoading || user?.hasBusinessApplication}
                        type={'text'}
                        minLength={'3'}
                        maxLength={'50'}
                        validate={null}
                    />
                    <FormTextArea
                        name={'businessBio'}
                        value={values.businessBio}
                        onInputChange={onInputChange}
                        isLoading={isLoading || user?.hasBusinessApplication}
                        maxLength={'500'}
                        validate={null}
                    />
                    <FormInput
                        formName={'employeeCount'}
                        value={values.employeeCount}
                        onInputChange={onInputChange}
                        isLoading={isLoading || user?.hasBusinessApplication}
                        type={'number'}
                        validate={null}
                    />
                </Form>
            </div>}
        </>
    )
}