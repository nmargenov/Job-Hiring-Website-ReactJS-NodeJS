import styles from './previewPicture.module.css';
import { useTranslation } from "react-i18next";
import { Form } from '../../../../shared/Form/Form'
import { useForm } from '../../../../../hooks/useForm';
import { setProfilePicture } from '../../../../../services/userService';
import { useAuth } from '../../../../../contexts/AuthContext'

export const PreviewPicture = ({ preview, onClose, file }) => {
    const { t } = useTranslation();

    const { loginAuthContext } = useAuth();

    const { isLoading, setIsLoading, onSubmitHandler, errorMsg, setErrorMsg } = useForm(null);

    function onSubmit(e) {
        onSubmitHandler(e);
        const formData = new FormData();
        formData.append('profilePicture', file);
        setProfilePicture(formData)
            .then((data) => {
                loginAuthContext(data);
            }).catch((err) => {

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
                            <button className={styles['cancel-button']} onClick={onClose}>
                                {t('cancel')}
                            </button>
                            <input type="submit" value={t('save')} />
                        </>
                    }>

                    {/* <div className={styles['buttons-div']}>

                    <button className={styles['save-button']}>
                        {t('save')}
                    </button>
                </div> */}
                </Form>
            </div>
        </>
    )
}