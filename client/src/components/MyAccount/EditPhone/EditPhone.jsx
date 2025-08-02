import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import styles from '../shared/edit.module.css';
import { useCountries } from '../../../hooks/useCountries';
import { useState } from 'react';
import { CountryCodeDropdown } from '../../shared/CountryCodeDropdown/CountryCodeDropdown';
import { updatePhone } from '../../../services/userService';

export const EditPhone = ({ user, setIsEditPhone }) => {

    const { t } = useTranslation();

    const { countries } = useCountries();

    const [selected, setSelected] = useState(countries.find((c)=>c.code===user.countryCode));

    const initialValues = {
        phone: user.phone
    }

    const { values, onInputChange, isLoading, setIsLoading, onSubmitHandler, errorMsg, setErrorMsg } = useForm(initialValues);

    const { loginAuthContext } = useAuth();

    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        updatePhone(user._id , values.phone, selected.code)
            .then((data) => {
                loginAuthContext(data);
                setErrorMsg('');
                setIsLoading(false);
                setIsEditPhone(false);
            }).catch((err) => {
                setErrorMsg(err.message);
                setIsLoading(false);
            })
    }

    const disabledSubmit = (isLoading || values.phone.length < 6 || values.phone.length > 20);
    return (
        <>
            <div className={styles['edit-div']}>
                <Form
                    errorMsg={errorMsg}
                    onSubmit={onSubmit}
                    buttons={
                        <>
                            <button className={styles['design-button']}
                                onClick={() => { setIsEditPhone(false) }}
                                type="button"
                                disabled={isLoading}
                            >{t('back')}</button>
                            <input
                                type='submit'
                                value={t("save")}
                                disabled={disabledSubmit} />
                        </>
                    }>
                    <big>{t('edit-phone')}</big>
                    <span className={styles['description']}>{t('edit-phone-text')}</span>
                    <div className={styles["phone-div"]}>
                        <CountryCodeDropdown
                            selected={selected}
                            setSelected={setSelected}
                            countries={countries}
                        />
                        <div className={styles['input-div']}>
                            <FormInput
                                formName={'phone'}
                                value={values.phone}
                                onInputChange={onInputChange}
                                isLoading={isLoading}
                                type={'number'}
                                minLength={'6'}
                                maxLength={'20'}
                                validate={(values.phone.length > 0 && values.phone.length < 6) || values.phone.length > 20}
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}