import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/cookies";

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => { },
    changeTheme: (value) => { }
});


export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const prefsRaw = getCookie('cookie_preferences');
    const prefs = prefsRaw ? JSON.parse(prefsRaw) : { theme: false };

    function checkIfCookieAllowed() {
        return prefs.theme === true;
    }

    function changeTheme(value) {

        setTheme(value);

        if (checkIfCookieAllowed) {
            setCookie('theme', value);
        }
    }

    useEffect(() => {
        const saved = getCookie('theme');
        if (saved) {
            setTheme(saved);
        };
    }, [prefs]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
