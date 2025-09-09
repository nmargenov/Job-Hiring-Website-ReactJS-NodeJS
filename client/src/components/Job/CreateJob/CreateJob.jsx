import { useForm } from '../../../hooks/useForm';
import styles from './createJob.module.css';
import { useTranslation } from 'react-i18next';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import { FormTextArea } from '../../shared/FormTextArea/FormTextArea';

export const CreateJob = () => {
    const initialValues = {
        title: '',
        description: '',
        salary: '',
        location: '',
        experience: '',
    }

    const { t } = useTranslation();
    const { values, setValues, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
    }
    return (
        <div className={styles['apply-main-div']}>
            <h2>{t('create-job')}</h2>
            <span>{t('business-apply-description')}</span>
            <Form onSubmit={onSubmit}
                errorMsg={errorMsg}
                buttons={
                    <input type='submit' value={t('create')} />
                }
            >
                <FormInput
                    formName={'title'}
                    value={values.title}
                    onInputChange={onInputChange}
                    type={'text'}
                    minLength={'5'}
                    maxLength={'150'}
                    validate={null}
                />
                <FormTextArea
                    name={'description'}
                    value={values.description}
                    onInputChange={onInputChange}
                    minLength={'50'}
                    maxLength={'1500'}
                    validate={null}
                />
                <FormInput
                    formName={'salary'}
                    value={values.salary}
                    onInputChange={onInputChange}
                    type={'text'}
                    validate={null}
                />
                <FormInput
                    formName={'location'}
                    value={values.location}
                    onInputChange={onInputChange}
                    type={'text'}
                    validate={null}
                />
                <FormInput
                    formName={'experience'}
                    value={values.experience}
                    onInputChange={onInputChange}
                    type={'text'}
                    validate={null}
                />
            </Form>
        </div>
    )
}