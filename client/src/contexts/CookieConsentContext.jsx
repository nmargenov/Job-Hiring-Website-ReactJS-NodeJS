import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie,deleteDeclinedCookies } from '../utils/cookies';

// Default preferences
const defaultPrefs = {
  essential: true,
  language: false,
  theme: false,
};

const ConsentContext = createContext({
  prefs: defaultPrefs,
  setPreference: (key, value) => { },
  savePreferences: () => { },
  showModal: true,
  setShowModal: () => { },
  acceptAll: () => { },
});

export const useConsent = () => useContext(ConsentContext);

export const ConsentProvider = ({ children }) => {
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const saved = getCookie('cookie_preferences');

    if (saved) {
      setPrefs(JSON.parse(saved));
      setShowModal(false);
    }
  }, []);

  const setPreference = (key, value) => {
    if (key === 'essential') return; // can't change essential
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = () => {
    setCookie('cookie_preferences', JSON.stringify(prefs));
    setShowModal(false);
    
    const declined = [];

    if (!prefs.language) declined.push('i18next');
    if (!prefs.theme) declined.push('theme');
    
    if (declined.length > 0) {
      deleteDeclinedCookies(declined);
    }
    window.location.reload();
  };

  const acceptAll = () => {
    const acceptedPrefs = {
      essential: true,
      language: true,
      theme: true,
    }
    setPrefs(acceptedPrefs);
    setCookie('cookie_preferences', JSON.stringify(prefs));
    setShowModal(false);
    window.location.reload();
  }

  return (
    <ConsentContext.Provider
      value={{ prefs, setPreference, savePreferences, showModal, setShowModal, acceptAll }}
    >
      {children}
    </ConsentContext.Provider>
  );
};
