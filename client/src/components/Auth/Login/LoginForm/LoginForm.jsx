import { t } from 'i18next';
import styles from './loginForm.module.css';
import { useForm } from '../../../../hooks/useForm';
import { isValidEmail } from '../../../../utils/regex';
import { login } from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../../shared/FormInput/FormInput';
import { Form } from "../../../shared/Form/Form";
export const LoginForm = ({ ref }) => {

    const navigate = useNavigate();

    const initialValues = {
        email: ''
    }

    const { values, onInputChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);

        login(values.email)
            .then((data) => {
                setIsLoading(false);
                setErrorMsg('');
                navigate(`/verification-code?id=${data}`);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.message);
            })
    }

    return (
        <Form onSubmit={onSubmit}
            errorMsg={errorMsg}
            buttons={
                <input type="submit" value={t('login')} disabled={(isLoading || (values.email.length >= 0 && !isValidEmail(values.email)))} />
            }
        >
            <FormInput
                formName={'email'}
                value={values.email}
                onInputChange={onInputChange}
                isLoading={isLoading}
                ref={ref}
                type={'email'}
                minLength={'3'}
                maxLength={'50'}
                validate={values.email.length > 0 && !isValidEmail(values.email)}
            />
        </Form>

    )
}