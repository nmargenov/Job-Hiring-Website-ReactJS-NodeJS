import { useTranslation } from 'react-i18next';
import { useForm } from '../../../hooks/useForm';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import { FormTextArea } from '../../shared/FormTextArea/FormTextArea';
import styles from './edit.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../../shared/Loader/Loader';
import { Page404 } from '../../Page404/Page404';
import { getEdit } from '../../../services/businessService';

export const Edit = ({businessID}) => {
    const [business, setBusiness] = useState(null);

    const initialValues = {
        businessName: '',
        businessBio: '',
        employeeCount: ''
    }

    const { user: userAuth, loginAuthContext } = useAuth();

    const [isPageLoading, setIsPageLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsPageLoading(true);
        getEdit(userAuth.businessID)
            .then((data) => {
                setIsPageLoading(false);
                setBusiness(data);
                console.log(data);
                setValues({
                    businessName: data.businessName,
                    businessBio: data.bio,
                    employeeCount: data.employeeCount
                });
                setError(false);
            }).catch((err) => {
                console.log(err);
                console.log('hee');
                setIsPageLoading(false);
                setError(true);
            })
    }, [])

    const { t } = useTranslation();

    const { values, setValues, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);

    }

    return (
        <>
            {isPageLoading && <Loader />}
            {!isPageLoading && !error && <div className={styles['apply-main-div']}>
                <h2>{t('edit-business')}</h2>
                <span>{t('business-apply-description')}</span>
                <div className={styles['sucess-message-div']}>
                    {business?.business?.hasEdit && <span>{t('already-submitted')}</span>}
                </div>
                <Form onSubmit={onSubmit}
                    errorMsg={errorMsg}
                    buttons={
                        <input type='submit' disabled={isLoading || business?.hasEdit} value={t('apply')} />
                    }
                >
                    <FormInput
                        formName={'businessName'}
                        value={values.businessName}
                        onInputChange={onInputChange}
                        isLoading={isLoading || business?.hasEdit}
                        type={'text'}
                        minLength={'3'}
                        maxLength={'50'}
                        validate={null}
                    />
                    <FormTextArea
                        name={'businessBio'}
                        value={values.businessBio}
                        onInputChange={onInputChange}
                        isLoading={isLoading || business?.hasEdit}
                        maxLength={'500'}
                        validate={null}
                    />
                    <FormInput
                        formName={'employeeCount'}
                        value={values.employeeCount}
                        onInputChange={onInputChange}
                        isLoading={isLoading || business?.hasEdit}
                        type={'number'}
                        validate={null}
                    />
                </Form>
            </div>}
            {!isLoading && error && <Page404 errorLoading={true} />}
        </>
    )
}