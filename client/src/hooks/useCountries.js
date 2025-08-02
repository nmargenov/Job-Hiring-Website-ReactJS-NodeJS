import { useTranslation } from "react-i18next";

export const useCountries = () =>{
    const { t } = useTranslation();
    
    const countries = [
        { name: t('bulgaria'), code: "+359", flag: "bg" },
        { name: t('united-states'), code: "+1", flag: "us" },
        { name: t('united-kingdom'), code: "+44", flag: "gb" },
        { name: t('germany'), code: "+49", flag: "de" },
        { name: t('france'), code: "+33", flag: "fr" },
        { name: t('italy'), code: "+39", flag: "it" },
        { name: t('spain'), code: "+34", flag: "es" },
        { name: t('other'), code: "", },
    ];

    return {
        countries
    }
}