import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './setupProfile.module.css';
import { FormInput } from '../shared/FormInput/FormInput';
import { Form } from '../shared/Form/Form';
import { useTranslation } from "react-i18next";
import { SetupProfileActions } from './SetupProfileActions/SetupProfileActions';
import { CountryCodeDropdown } from './CountryCodeDropdown/CountryCodeDropdown';

export const SetupProfile = () => {
    const { t } = useTranslation();

    const initialValues = {
        firstName: "",
        lastName: "",
        phone: "",
    }

    const countries = [
        { name: "Bulgaria", code: "+359", flag: "bg" },
        { name: "United States", code: "+1", flag: "us" },
        { name: "United Kingdom", code: "+44", flag: "gb" },
        { name: "Germany", code: "+49", flag: "de" },
        { name: "France", code: "+33", flag: "fr" },
        { name: "Italy", code: "+39", flag: "it" },
        { name: "Spain", code: "+34", flag: "es" },
    ];

    const [selected, setSelected] = useState(countries[0]);

    const { values, errorMsg, setErrorMsg, onInputChange, isLoading, setIsLoading, onSubmitHandler } = useForm(initialValues);

    const [view, setView] = useState('firstName');

    function onSubmit(e) {
        onSubmitHandler(e);
        console.log(values);
        console.log(selected.code);
        setErrorMsg('Phone must start with +<countrycode> or 0 and be between 6 and 20 digits')
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