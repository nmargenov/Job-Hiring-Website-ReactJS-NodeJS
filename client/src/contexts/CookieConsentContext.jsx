import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteDeclinedCookies } from '../utils/cookies';

const defaultPrefs = {
  essential: true,
  language: false,
  theme: false,
};

const ConsentContext = createContext({
  prefs: defaultPrefs,
  tempPrefs: defaultPrefs,
  setPreference: () => {},
  savePreferences: () => {},
  showModal: true,
  setShowModal: () => {},
  acceptAll: () => {},
  acceptEssentials: () => {},
});

export const useConsent = () => useContext(ConsentContext);

export const ConsentProvider = ({ children }) => {
  const [prefs, setPrefs] = useState(defaultPrefs);       // saved preferences
  const [tempPrefs, setTempPrefs] = useState(defaultPrefs); // temporary changes
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    try {
      const saved = getCookie('cookie_preferences');
      if (saved) {
        const obj = JSON.parse(saved);
        setPrefs(obj);
        setTempPrefs(obj); // initialize temp with saved values
        setShowModal(false);
        deleteCookies(obj);
      } else {
        deleteCookies(defaultPrefs);
      }
    } catch (err) {
      console.log("Error with cookies: " + err);
      savePreferences(defaultPrefs);
    }
  }, []);

  const setPreference = (key, value) => {
    if (key === 'essential') return;
    setTempPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = () => {
    setPrefs(tempPrefs);
    setCookie('cookie_preferences', JSON.stringify(tempPrefs));
    setShowModal(false);
    deleteCookies(tempPrefs);
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
    const acceptedPrefs = { essential: true, language: true, theme: true };
    setPrefs(acceptedPrefs);
    setTempPrefs(acceptedPrefs);
    setCookie('cookie_preferences', JSON.stringify(acceptedPrefs));
    setShowModal(false);
  };

  const acceptEssentials = () => {
    setTempPrefs(prefs);
    setShowModal(false);
  };

  return (
    <ConsentContext.Provider
      value={{
        prefs,
        tempPrefs,
        setPreference,
        savePreferences,
        showModal,
        setShowModal,
        acceptAll,
        acceptEssentials,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};
