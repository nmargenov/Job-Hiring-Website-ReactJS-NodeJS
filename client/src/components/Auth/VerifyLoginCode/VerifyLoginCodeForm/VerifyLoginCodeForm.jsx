import { t } from 'i18next';
import styles from '../../Login/LoginForm/loginForm.module.css';
import { useForm } from '../../../../hooks/useForm';
import { verifyCode } from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { Form } from '../../../shared/Form/Form';
import { FormInput } from '../../../shared/FormInput/FormInput';

export const VerifyLoginCodeForm = ({ ref, email, isLoading, setIsLoading }) => {

    const { loginAuthContext } = useAuth();

    const navigate = useNavigate();

    const initialValues = {
        code: ''
    }

    const { values, onInputChange, onSubmitHandler, errorMsg, setErrorMsg } = useForm(initialValues);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
       
        verifyCode(email, values.code)
            .then((data) => {
                setIsLoading(false);
                setErrorMsg("");
                loginAuthContext(data);
                navigate('/');
            })
            .catch((err) => {
                setIsLoading();
                setErrorMsg(err.message);
            })
    }

    function verifyMaxLength(e) {
        const newValue = e.target.value;

        e.target.value = newValue.slice(0, 6);
        onInputChange(e);
    }

    function onCancelClick() {
        navigate('/login');
    }

    return (
        <Form onSubmit={onSubmit}
            errorMsg={errorMsg}
            buttons={
                <>
                    <input onClick={onCancelClick} className={styles['design-button']} type="button" value={t('cancel')} disabled={isLoading} />
                    <input type="submit" value={t('login')} disabled={isLoading || (values.code.length >= 0 && values.code.length < 6)} />
                </>
            }>
                <FormInput
                    type={'number'}
                    formName={'code'}
                    ref={ref}
                    validate={values.code.length > 0 && values.code.length < 6}
                    value={values.code}
                    onInputChange={verifyMaxLength}
                    isLoading={isLoading}
                />
        </Form >
    )
}