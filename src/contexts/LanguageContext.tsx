'use client';

import React, { createContext, useContext, useState, useEffect, startTransition, ReactNode } from 'react';

type Locale = 'en' | 'ko';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import translation files
import enMessages from '../../messages/en.json';
import koMessages from '../../messages/ko.json';

const messages = {
  en: enMessages,
  ko: koMessages,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' to prevent hydration mismatch
  // Language detection happens after mount via useEffect
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Detect and set the user's preferred language after mount (post-hydration)
  useEffect(() => {
    if (isInitialized) return;
    
    // Use startTransition to mark this as a non-urgent update
    startTransition(() => {
      // Check localStorage first
      const saved = localStorage.getItem('locale') as Locale;
      if (saved && (saved === 'en' || saved === 'ko')) {
        setLocaleState(saved);
        setIsInitialized(true);
        return;
      }
      
      // Auto-detect from browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('ko')) {
        setLocaleState('ko');
      }
      
      setIsInitialized(true);
    });
  }, [isInitialized]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  // Translation function with nested key support (e.g., "nav.home")
  const t = (key: string): string => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Always render with context provider to prevent hydration mismatch
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  // During SSR or if not wrapped in provider, return safe defaults
  if (context === undefined) {
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      t: (key: string) => key,
    };
  }
  
  return context;
}

// Convenience hook for just translations
export function useTranslations(namespace?: string) {
  const { t } = useLanguage();
  
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return t(fullKey);
  };
}
