import { useTranslation } from 'react-i18next';
import { useForm } from '../../../hooks/useForm';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import { FormTextArea } from '../../shared/FormTextArea/FormTextArea';
import styles from './apply.module.css';

export const Apply = () => {
    const initialValues = {
        businessName: '',
        businessBio: '',
        employeesCount: ''
    }

    const { t } = useTranslation();

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        console.log(values);
    }

    return (
        <div className={styles['apply-main-div']}>
            <h2>{t('apply-business')}</h2>
            <span>{t('business-apply-description')}</span>
            <Form onSubmit={onSubmit}
                errorMsg={errorMsg}
                buttons={
                    <input type='submit' disabled={isLoading} value={t('apply')} />
                }
            >
                <FormInput
                    formName={'businessName'}
                    value={values.businessName}
                    onInputChange={onInputChange}
                    isLoading={isLoading}
                    type={'text'}
                    minLength={'3'}
                    maxLength={'50'}
                    validate={null}
                />
                <FormTextArea
                    name={'businessBio'}
                    value={values.businessBio}
                    onInputChange={onInputChange}
                    isLoading={isLoading}
                    maxLength={'500'}
                    validate={null}
                />
                <FormInput
                    formName={'employeesCount'}
                    value={values.employeesCount}
                    onInputChange={onInputChange}
                    isLoading={isLoading}
                    type={'number'}
                    validate={null}
                />
            </Form>
        </div>
    )
}