// نظام التحقق من صحة البيانات
export const validators = {
  // التحقق من النصوص
  text: (value: string, minLength = 1, maxLength = 1000): boolean => {
    if (!value || typeof value !== 'string') return false;
    const trimmed = value.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
  },

  // التحقق من الأرقام
  number: (value: string, min = 0, max = 999999): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  },

  // التحقق من السنوات
  year: (value: string): boolean => {
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    return !isNaN(year) && year >= 1900 && year <= currentYear + 1;
  },

  // التحقق من أرقام الهواتف
  phone: (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    return phoneRegex.test(value.trim());
  },

  // التحقق من البريد الإلكتروني
  email: (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  },

  // التحقق من المدن السعودية والعربية
  city: (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    const trimmed = value.trim();
    // يجب أن يحتوي على أحرف عربية أو إنجليزية فقط
    const cityRegex = /^[\u0600-\u06FFa-zA-Z\s\-]{2,50}$/;
    return cityRegex.test(trimmed);
  },

  // التحقق من المساحات
  area: (value: string): boolean => {
    if (!value) return true; // اختياري
    const areaRegex = /^[\d\s\u0600-\u06FFa-zA-Z\.]{1,50}$/;
    return areaRegex.test(value.trim());
  },

  // التحقق من الأرقام الموجبة
  positiveNumber: (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  }
};

// التحقق من صحة نموذج السيارة
export const validateCarForm = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.city && !validators.city(data.city)) {
    errors.push('اسم المدينة غير صحيح');
  }

  if (data.year && !validators.year(data.year)) {
    errors.push('سنة الصنع غير صحيحة');
  }

  if (data.kilometers && !validators.number(data.kilometers, 0, 9999999)) {
    errors.push('عدد الكيلومترات غير صحيح');
  }

  if (data.price && !validators.number(data.price, 1, 99999999)) {
    errors.push('السعر غير صحيح');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة نموذج الهاتف
export const validatePhoneForm = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.city && !validators.city(data.city)) {
    errors.push('اسم المدينة غير صحيح');
  }

  if (data.price && !validators.number(data.price, 1, 99999999)) {
    errors.push('السعر غير صحيح');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة نموذج العقار
export const validateRealEstateForm = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.city && !validators.city(data.city)) {
    errors.push('اسم المدينة غير صحيح');
  }

  if (data.district && !validators.city(data.district)) {
    errors.push('اسم الحي غير صحيح');
  }

  if (data.area && !validators.area(data.area)) {
    errors.push('المساحة غير صحيحة');
  }

  if (data.price && !validators.number(data.price, 1, 99999999)) {
    errors.push('السعر غير صحيح');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};