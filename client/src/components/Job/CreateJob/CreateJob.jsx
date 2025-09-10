import { useForm } from '../../../hooks/useForm';
import styles from './createJob.module.css';
import { useTranslation } from 'react-i18next';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import { FormTextArea } from '../../shared/FormTextArea/FormTextArea';
import { createJob } from '../../../services/jobService';

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
        setIsLoading(true);
        createJob(values.title,values.description,values.salary,values.location,values.experience)
            .then((data)=>{
                setIsLoading(false);
                console.log(data);
            }).catch((err)=>{
                setIsLoading(false);
                console.log(err);
            })
    }
    return (
        <div className={styles['apply-main-div']}>
            <h2>{t('create-job')}</h2>
            <span>{t('business-apply-description')}</span>
            <Form onSubmit={onSubmit}
                errorMsg={errorMsg}
                buttons={
                    <input type='submit' disabled={isLoading || values.title.length < 5 || values.description.length < 50} value={t('create')} />
                }
            >
                <FormInput
                    formName={'title'}
                    value={values.title}
                    onInputChange={onInputChange}
                    type={'text'}
                    minLength={'5'}
                    maxLength={'150'}
                    validate={values.title.length > 0 && values.title.length < 5}
                    isLoading={isLoading}
                />
                <FormTextArea
                    name={'description'}
                    value={values.description}
                    onInputChange={onInputChange}
                    minLength={'50'}
                    maxLength={'1500'}
                    validate={values.description.length > 0 && values.description.length < 50}
                    isLoading={isLoading}
                />
                <FormInput
                    formName={'salary'}
                    value={values.salary}
                    onInputChange={onInputChange}
                    type={'text'}
                    required={false}
                    isLoading={isLoading}
                />
                <FormInput
                    formName={'location'}
                    value={values.location}
                    onInputChange={onInputChange}
                    type={'text'}
                    validate={null}
                    required={false}
                    isLoading={isLoading}
                />
                <FormInput
                    formName={'experience'}
                    value={values.experience}
                    onInputChange={onInputChange}
                    required={false}
                    type={'text'}
                    isLoading={isLoading}
                />
            </Form>
        </div>
    )
}