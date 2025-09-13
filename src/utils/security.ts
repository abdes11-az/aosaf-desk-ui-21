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
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value
        .filter(item => typeof item === 'string')
        .map(item => sanitizeInput(item))
        .slice(0, 50); // حد أقصى للعناصر
    } else if (typeof value === 'number') {
      sanitized[key] = value;
    } else if (typeof value === 'boolean') {
      sanitized[key] = value;
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

// حماية من هجمات XSS
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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