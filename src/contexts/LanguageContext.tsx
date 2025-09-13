import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

type Dialect = 'standard' | 'moroccan' | 'egyptian' | 'gulf';

interface LanguageContextType {
  dialect: Dialect;
  setDialect: (dialect: Dialect) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [currentDialect, setCurrentDialect] = useState<Dialect>('standard');

  useEffect(() => {
    const checkI18nReady = () => {
      if (i18n.isInitialized) {
        setIsI18nReady(true);
        setCurrentDialect((i18n.language || 'standard') as Dialect);
      } else {
        // إذا لم يكن جاهزاً بعد، انتظر قليلاً وحاول مرة أخرى
        setTimeout(checkI18nReady, 100);
      }
    };

    checkI18nReady();
  }, []);

  const setDialect = (dialect: Dialect) => {
    if (i18n.isInitialized) {
      i18n.changeLanguage(dialect);
      setCurrentDialect(dialect);
    }
  };

  const t = (key: string): string => {
    if (!isI18nReady || !i18n.isInitialized) {
      return key; // إرجاع المفتاح نفسه إذا لم يكن i18n جاهزاً
    }
    return i18n.t(key) || key;
  };

  const contextValue: LanguageContextType = {
    dialect: currentDialect,
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