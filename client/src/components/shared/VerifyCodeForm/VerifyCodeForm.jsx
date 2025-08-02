import { useTranslation } from "react-i18next";
import { Form } from "../Form/Form"
import { FormInput } from "../FormInput/FormInput"

import styles from './VerifyCodeForm.module.css';


export const VerifyCodeForm = ({
    code,
    onSubmit,
    errorMsg,
    onCancelClick,
    buttonValue,
    ref,
    isLoading,
    onInputChange
}) => {
    const {t} = useTranslation();
    function verifyMaxLength(e) {
        const newValue = e.target.value;

        e.target.value = newValue.slice(0, 6);
        onInputChange(e);
    }
    return (
        <Form onSubmit={onSubmit}
            errorMsg={errorMsg}
            buttons={
                <>
                    <input onClick={onCancelClick} className={styles['design-button']} type="button" value={t('cancel')} disabled={isLoading} />
                    <input type="submit" value={t(buttonValue)} disabled={isLoading || (code.length >= 0 && code.length < 6)} />
                </>
            }>
            <FormInput
                type={'number'}
                formName={'code'}
                ref={ref}
                validate={code.length > 0 && code.length < 6}
                value={code.code}
                onInputChange={verifyMaxLength}
                isLoading={isLoading}
            />
        </Form >
    )
}