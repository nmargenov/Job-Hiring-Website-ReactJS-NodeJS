import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/cookies";
import { useConsent } from "./CookieConsentContext";

const ThemeContext = createContext({
    theme: 'light',
    changeTheme: (value) => { }
});


export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // const prefsRaw = getCookie('cookie_preferences');
    // const prefs = prefsRaw ? JSON.parse(prefsRaw) : { theme: false };

    const { prefs } = useConsent();

    function checkIfCookieAllowed() {
        return prefs.theme === true;
    }

    function changeTheme(value) {

        setTheme(value);

        if (checkIfCookieAllowed()) {
            setCookie('theme', value);
        }
    }

    useEffect(() => {
        const saved = getCookie('theme');
        if (saved) {
            setTheme(saved);
        };
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
