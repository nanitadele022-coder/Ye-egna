/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TRANSLATIONS } from './translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.en, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved preference from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('ye_egna_language') as Language;
    if (savedLang === 'en' || savedLang === 'am') {
      setLanguageState(savedLang);
    }
  }, []);

  // Update localStorage and trigger change
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ye_egna_language', lang);
  };

  // Safe translator with optional replacements
  const t = (key: keyof typeof TRANSLATIONS.en, replacements?: Record<string, string | number>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    let translation = dict[key] || TRANSLATIONS.en[key] || String(key);

    if (replacements) {
      Object.entries(replacements).forEach(([k, val]) => {
        translation = translation.replace(new RegExp(`{${k}}`, 'g'), String(val));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
