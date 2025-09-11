import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

type Dialect = 'standard' | 'moroccan' | 'egyptian' | 'gulf';

interface LanguageContextType {
  dialect: Dialect;
  setDialect: (dialect: Dialect) => void;
  t: (key: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { t, i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    const checkI18nReady = () => {
      if (i18n.isInitialized) {
        setIsReady(true);
      } else {
        // Wait for i18n to initialize
        i18n.on('initialized', () => {
          setIsReady(true);
        });
      }
    };

    checkI18nReady();
  }, []);

  const setDialect = (dialect: Dialect) => {
    if (isReady) {
      i18nInstance.changeLanguage(dialect);
    }
  };

  const contextValue: LanguageContextType = {
    dialect: (i18nInstance?.language || 'standard') as Dialect,
    setDialect,
    t: isReady ? t : (key: string) => key, // Fallback to key if not ready
    isReady
  };

  return (
    <LanguageContext.Provider value={contextValue}>
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