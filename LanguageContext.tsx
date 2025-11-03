import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from './translations';

type Language = 'en' | 'ar';
type Translations = typeof translations.en;
type TranslationKey = keyof Translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  // Fix: Update t function signature to handle replacements for interpolation.
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Fix: Updated the translation function to handle placeholders for dynamic content.
  const t = (key: TranslationKey, replacements?: Record<string, string | number>): string => {
    // FIX: Explicitly type `translation` as `string`. Due to `as const` on the translations object,
    // TypeScript infers a narrow union of string literals. The `replace` method returns a generic
    // `string`, causing a type mismatch. This change resolves the error.
    let translation: string = translations[language][key] || translations['en'][key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
        translation = translation.replace(regex, String(value));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
