import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteDeclinedCookies } from '../utils/cookies';

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
    try {
      const saved = getCookie('cookie_preferences');
      if (saved) {
        const obj = JSON.parse(saved);
        setPrefs(obj);
        setShowModal(false);
        deleteCookies(obj);
      } else {
        deleteCookies(prefs);
      }
    } catch (err) {
      console.log("Error with cookies: "+err);
      savePreferences(prefs);
    }

  }, []);

  const setPreference = (key, value) => {
    if (key === 'essential') return; // can't change essential
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = () => {
    setCookie('cookie_preferences', JSON.stringify(prefs));
    setShowModal(false);

    deleteCookies(prefs);
  };

  function deleteCookies(arr) {
    const declined = [];

    if (!arr.language) declined.push('i18next');
    if (!arr.theme) declined.push('theme');

    if (declined.length > 0) {
      deleteDeclinedCookies(declined);
    }
  }


  const acceptAll = () => {
    const acceptedPrefs = {
      essential: true,
      language: true,
      theme: true,
    }
    setPrefs(acceptedPrefs);
    setCookie('cookie_preferences', JSON.stringify(acceptedPrefs));
    setShowModal(false);
  }

  return (
    <ConsentContext.Provider
      value={{ prefs, setPreference, savePreferences, showModal, setShowModal, acceptAll }}
    >
      {children}
    </ConsentContext.Provider>
  );
};
