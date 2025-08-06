import styles from './previewPicture.module.css';
import { useTranslation } from "react-i18next";
import { Form } from '../../../../shared/Form/Form'
import { useForm } from '../../../../../hooks/useForm';
import { setProfilePicture } from '../../../../../services/userService';
import { useAuth } from '../../../../../contexts/AuthContext'

export const PreviewPicture = ({ preview, onClose, file, setIsLoading, isLoading }) => {
    const { t } = useTranslation();

    const { loginAuthContext } = useAuth();

    const { onSubmitHandler, errorMsg, setErrorMsg } = useForm(null);

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        const formData = new FormData();
        formData.append('profilePicture', file);
        setProfilePicture(formData)
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
            <div onClick={onClose} className={styles['opacity']}>
            </div>
            <div className={styles['preview-picture-div']}>
                <div className={styles['image-div']}>
                    <img src={[preview]} alt="preview" />
                </div>
                <Form
                    errorMsg={errorMsg}
                    onSubmit={onSubmit}
                    buttons={
                        <>
                            <button disabled={isLoading} className={styles['cancel-button']} onClick={onClose}>
                                {t('cancel')}
                            </button>
                            <input disabled={isLoading} type="submit" value={t('save')} />
                        </>
                    }>
                </Form>
            </div>
        </>
    )
}