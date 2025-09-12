// ثوابت التطبيق
export const APP_CONFIG = {
  // حدود الأمان
  MAX_SAVED_ITEMS: 1000,
  MAX_TEXT_LENGTH: 10000,
  MAX_ARRAY_ITEMS: 50,
  
  // إعدادات الأداء
  DEBOUNCE_DELAY: 300,
  THROTTLE_LIMIT: 1000,
  
  // إعدادات التخزين
  STORAGE_KEYS: {
    SAVED_DESCRIPTIONS: 'saved-descriptions',
    THEME: 'ausaf-ui-theme',
    LANGUAGE: 'i18nextLng'
  },
  
  // إعدادات الأمان
  ALLOWED_PROTOCOLS: ['http:', 'https:', 'tel:', 'mailto:'],
  
  // رسائل الخطأ
  ERROR_MESSAGES: {
    INVALID_DATA: 'بيانات غير صحيحة',
    STORAGE_FULL: 'مساحة التخزين ممتلئة',
    NETWORK_ERROR: 'خطأ في الاتصال',
    VALIDATION_ERROR: 'خطأ في التحقق من البيانات'
  }
} as const;

// أنواع البيانات المدعومة
export const SUPPORTED_ITEM_TYPES = [
  'car', 'phone', 'real-estate', 'tenant', 
  'free-writing', 'clothing', 'questions'
] as const;

export type SupportedItemType = typeof SUPPORTED_ITEM_TYPES[number];

// اللهجات المدعومة
export const SUPPORTED_DIALECTS = [
  { code: 'standard', name: 'العربية الفصحى', flag: '🇸🇦' },
  { code: 'moroccan', name: 'الدارجة المغربية', flag: '🇲🇦' },
  { code: 'egyptian', name: 'العامية المصرية', flag: '🇪🇬' },
  { code: 'gulf', name: 'اللهجة الخليجية', flag: '🇦🇪' }
] as const;