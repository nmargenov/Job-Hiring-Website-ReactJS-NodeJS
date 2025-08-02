import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './setupProfile.module.css';
import { FormInput } from '../shared/FormInput/FormInput';
import { Form } from '../shared/Form/Form';
import { useTranslation } from "react-i18next";
import { SetupProfileActions } from './SetupProfileActions/SetupProfileActions';
import { CountryCodeDropdown } from '../shared/CountryCodeDropdown/CountryCodeDropdown';
import { verifyProfile } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContries } from '../../hooks/useCountries';

export const SetupProfile = () => {
    const { t } = useTranslation();
    const { loginAuthContext } = useAuth();

    const { countries } = useContries();

    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        phone: "",
    }

    const { values, errorMsg, setErrorMsg, onInputChange, isLoading, setIsLoading, onSubmitHandler } = useForm(initialValues);

    const [selected, setSelected] = useState(countries[0]);

    const [view, setView] = useState('firstName');

    function onSubmit(e) {
        onSubmitHandler(e);
        const number = selected.code + values.phone;
        console.log(values.phone);
        console.log(number);
        setIsLoading(true);
        verifyProfile(values.firstName, values.lastName, number)
            .then((data) => {
                loginAuthContext(data);
                setIsLoading(false);
                setErrorMsg('');
                navigate('/');
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.message);
            });
    }

    function viewFirstName() { setView('firstName'); }
    function viewLastName() { setView('lastName'); }
    function viewPhone() { setView('phone'); }


    const disabledFirstName = isLoading || values.firstName.length < 3 || values.firstName.length > 30;
    const disabledLastName = isLoading || values.lastName.length < 5 || values.lastName.length > 30;
    const disabledPhone = isLoading || values.phone.length < 6 || values.phone.length > 20;

    const disabledSubmit =
        isLoading ||
        disabledFirstName ||
        disabledLastName ||
        disabledPhone;

    function onKeyDown(e, view) {
        if (e.key === "Enter") {
            e.preventDefault();
            setView(view);
        }
    }

    return (
        <div className={styles['setup-profile-div']}>
            <big>{t('finish-setup')}</big>
            <Form onSubmit={onSubmit} showSubmit={false}>
                {view === 'firstName' &&
                    <FormInput
                        formName={'firstName'}
                        value={values.firstName}
                        onInputChange={onInputChange}
                        isLoading={isLoading}
                        type={'text'}
                        minLength={'3'}
                        maxLength={'30'}
                        onSubmit={onSubmit}
                        onKey={(e) => { onKeyDown(e, "lastName") }}
                        validate={(values.firstName.length > 0 && values.firstName.length < 3) || values.firstName.length > 30}
                    />
                }
                {view === 'lastName' &&
                    <FormInput
                        formName={'lastName'}
                        value={values.lastName}
                        onInputChange={onInputChange}
                        isLoading={isLoading}
                        type={'text'}
                        minLength={'3'}
                        maxLength={'50'}
                        onSubmit={onSubmit}
                        onKey={(e) => { onKeyDown(e, "phone") }}
                        validate={(values.lastName.length > 0 && values.lastName.length < 5) || values.lastName.length > 30}
                    />}
                {view === "phone" &&
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
                }
                <SetupProfileActions view={view}
                    errorMsg={errorMsg}
                    viewFirstName={viewFirstName}
                    viewLastName={viewLastName}
                    viewPhone={viewPhone}
                    isLoading={isLoading}
                    disabledFirstName={disabledFirstName}
                    disabledLastName={disabledLastName}
                    disabledPhone={disabledPhone}
                    submitDisabled={disabledSubmit}
                />
            </Form>
        </div>
    )
}