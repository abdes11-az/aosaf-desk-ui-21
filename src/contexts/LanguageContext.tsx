import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

type Dialect = 'standard' | 'moroccan' | 'egyptian' | 'gulf';

interface LanguageContextType {
  dialect: Dialect;
  setDialect: (dialect: Dialect) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const setDialect = (dialect: Dialect) => {
    i18n.changeLanguage(dialect);
  };

  const contextValue: LanguageContextType = {
    dialect: i18n.language as Dialect,
    setDialect,
    t
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