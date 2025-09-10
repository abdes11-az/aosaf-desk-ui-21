import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import arTranslations from '../../public/locales/ar.json';
import maTranslations from '../../public/locales/ma.json';
import egTranslations from '../../public/locales/eg.json';
import gulfTranslations from '../../public/locales/gulf.json';

const resources = {
  standard: {
    translation: arTranslations
  },
  moroccan: {
    translation: maTranslations
  },
  egyptian: {
    translation: egTranslations
  },
  gulf: {
    translation: gulfTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'moroccan', // البدء بالمغربية كما طلبت
    lng: 'moroccan', // اللغة الافتراضية
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;