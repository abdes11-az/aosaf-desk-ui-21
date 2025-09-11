import { z } from 'zod';

// مخططات التحقق من صحة البيانات باستخدام Zod
export const SavedItemSchema = z.object({
  id: z.string().min(1).max(50),
  type: z.enum(['car', 'phone', 'real-estate', 'questions', 'tenant', 'free-writing', 'tablet', 'bicycle', 'motorcycle', 'clothing']),
  title: z.string().max(200),
  description: z.string().max(10000),
  data: z.record(z.string(), z.any()).optional(),
  date: z.string().optional(),
  savedAt: z.union([z.date(), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  })
});

export const CarFormSchema = z.object({
  brand: z.string().max(50).optional(),
  model: z.string().max(50).optional(),
  year: z.number().min(1900).max(2030).optional(),
  color: z.string().max(30).optional(),
  mileage: z.number().min(0).optional(),
  fuelType: z.string().max(20).optional(),
  transmission: z.string().max(20).optional(),
  price: z.number().min(0).optional(),
  condition: z.string().max(20).optional(),
  description: z.string().max(5000).optional()
});

export const PhoneFormSchema = z.object({
  brand: z.string().max(50).optional(),
  model: z.string().max(50).optional(),
  storage: z.string().max(20).optional(),
  color: z.string().max(30).optional(),
  condition: z.string().max(20).optional(),
  price: z.number().min(0).optional(),
  description: z.string().max(5000).optional()
});

export const RealEstateFormSchema = z.object({
  propertyType: z.string().max(50).optional(),
  city: z.string().max(50).optional(),
  district: z.string().max(50).optional(),
  rooms: z.number().min(0).max(20).optional(),
  area: z.number().min(0).optional(),
  price: z.number().min(0).optional(),
  description: z.string().max(5000).optional()
});

// دالة التحقق من صحة البيانات المحفوظة
export const validateSavedItem = (item: any): boolean => {
  try {
    SavedItemSchema.parse(item);
    return true;
  } catch {
    return false;
  }
};

// دالة التحقق من صحة بيانات النموذج حسب النوع
export const validateFormDataByType = (type: string, data: any): boolean => {
  try {
    switch (type) {
      case 'car':
        CarFormSchema.parse(data);
        return true;
      case 'phone':
        PhoneFormSchema.parse(data);
        return true;
      case 'real-estate':
        RealEstateFormSchema.parse(data);
        return true;
      default:
        // للأنواع الأخرى، تحقق أساسي
        return typeof data === 'object' && data !== null;
    }
  } catch {
    return false;
  }
};

// دالة تنظيف البيانات حسب المخطط
export const sanitizeBySchema = <T>(schema: z.ZodSchema<T>, data: any): T | null => {
  try {
    return schema.parse(data);
  } catch {
    return null;
  }
};

// التحقق من حجم البيانات
export const validateDataSize = (data: any, maxSizeKB: number = 100): boolean => {
  try {
    const serialized = JSON.stringify(data);
    const sizeKB = new Blob([serialized]).size / 1024;
    return sizeKB <= maxSizeKB;
  } catch {
    return false;
  }
};

// تنظيف الكائنات من الخصائص الخطيرة
export const sanitizeObject = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.slice(0, 100).map(sanitizeObject); // حد أقصى للمصفوفات
  }
  
  const sanitized: any = {};
  const allowedKeys = Object.keys(obj).slice(0, 50); // حد أقصى للمفاتيح
  
  for (const key of allowedKeys) {
    // تجنب الخصائص الخطيرة
    if (key.startsWith('__') || key.includes('proto') || key === 'constructor') {
      continue;
    }
    
    const value = obj[key];
    
    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, 1000); // حد أقصى لطول النص
    } else if (typeof value === 'number') {
      sanitized[key] = isFinite(value) ? value : 0;
    } else if (typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    }
  }
  
  return sanitized;
};