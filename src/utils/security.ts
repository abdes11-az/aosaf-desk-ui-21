// نظام الأمان والتحقق من صحة البيانات
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // إزالة الأكواد الضارة والرموز الخطيرة
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .substring(0, 10000); // حد أقصى للطول
};

export const validateFormData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  // التحقق من وجود بيانات أساسية
  const hasValidData = Object.values(data).some(value => 
    value && typeof value === 'string' && value.trim().length > 0
  );
  
  return hasValidData;
};

export const sanitizeFormData = (data: any): any => {
  if (!data || typeof data !== 'object') return {};
  
  const sanitized: any = {};
  const maxKeys = 50;
  const keys = Object.keys(data).slice(0, maxKeys);
  
  for (const key of keys) {
    // تجنب المفاتيح الخطيرة
    if (key.startsWith('__') || key.includes('proto') || key === 'constructor') {
      continue;
    }
    
    const value = data[key];
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value
        .filter(item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')
        .map(item => typeof item === 'string' ? sanitizeInput(item) : item)
        .slice(0, 50); // حد أقصى للعناصر
    } else if (typeof value === 'number' && isFinite(value)) {
      sanitized[key] = value;
    } else if (typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (value && typeof value === 'object') {
      // معالجة الكائنات المتداخلة بحذر
      sanitized[key] = sanitizeFormData(value);
    }
  }
  
  return sanitized;
};

// حماية من هجمات XSS
export const escapeHtml = (text: string): string => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// التحقق من صحة الروابط
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:', 'tel:', 'mailto:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};