import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const prefsRaw = localStorage.getItem('cookie_preferences');
const prefs = prefsRaw ? JSON.parse(prefsRaw) : { language: false };

import translationEN from './en.json';
import translationBG from './bg.json';

const resources = {
    en: { translation: translationEN },
    bg: { translation: translationBG }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        detection:
            prefs.language
                ? {
                    order: ['cookie', 'localStorage', 'navigator'],
                    caches: ['cookie']
                }
                :
                {
                    order: ['navigator'],
                    caches: [],
                }
    });

export default i18n;