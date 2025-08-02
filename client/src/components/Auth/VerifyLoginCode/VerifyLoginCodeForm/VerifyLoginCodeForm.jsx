import { useForm } from '../../../../hooks/useForm';
import { verifyCode } from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { VerifyCodeForm } from '../../../shared/VerifyCodeForm/VerifyCodeForm';

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

    function onCancelClick() {
        navigate('/login');
    }

    return(
              <VerifyCodeForm
                code={values.code}
                errorMsg={errorMsg}
                onSubmit={onSubmit}
                onCancelClick={onCancelClick}
                buttonValue={'login'}
                isLoading={isLoading}
                onInputChange={onInputChange}
            />
    )

}