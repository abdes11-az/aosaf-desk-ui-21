import { sanitizeFormData, validateFormData, sanitizeInput } from './security';
import { LocalStorageManager } from './localStorageManager';

interface SavedItem {
  id: string;
  type: 'car' | 'phone' | 'real-estate' | 'questions' | 'tenant' | 'free-writing' | 'tablet' | 'bicycle' | 'motorcycle' | 'clothing';
  title: string;
  description: string;
  data?: any;
  date?: string;
  savedAt: Date;
}

// Simple localStorage-based save system
export const saveDescription = (type: 'car' | 'phone' | 'real-estate' | 'tenant' | 'free-writing' | 'tablet' | 'bicycle' | 'motorcycle' | 'clothing', title: string, description: string, data: any): SavedItem => {
  const storage = LocalStorageManager.getInstance();
  
  // التحقق من صحة البيانات
  if (!validateFormData({ title, description })) {
    throw new Error('بيانات غير صحيحة');
  }
  
  // تنظيف البيانات من المحتوى الضار
  const cleanTitle = sanitizeInput(title);
  const cleanDescription = sanitizeInput(description);
  const cleanData = sanitizeFormData(data);
  
  const savedItem: SavedItem = {
    id: Date.now().toString(),
    type,
    title: cleanTitle,
    description: cleanDescription,
    data: cleanData,
    savedAt: new Date()
  };

  // Get existing saved items
  const existingItems = getSavedDescriptions();
  
  // حد أقصى للعناصر المحفوظة (منع امتلاء التخزين)
  const maxItems = 1000;
  const limitedItems = existingItems.slice(0, maxItems - 1);
  
  const updatedItems = [savedItem, ...limitedItems];

  // Save using enhanced storage manager
  storage.setItem('saved-descriptions', updatedItems);
  
  return savedItem;
};

export const saveItem = (item: Omit<SavedItem, 'savedAt'>): SavedItem => {
  const storage = LocalStorageManager.getInstance();
  
  // التحقق من صحة البيانات
  if (!validateFormData(item)) {
    throw new Error('بيانات غير صحيحة');
  }
  
  // تنظيف البيانات
  const cleanItem = {
    ...item,
    title: sanitizeInput(item.title),
    description: sanitizeInput(item.description),
    data: sanitizeFormData(item.data)
  };
  
  const savedItem: SavedItem = {
    ...cleanItem,
    savedAt: new Date()
  };

  // Get existing saved items
  const existingItems = getSavedDescriptions();
  
  // حد أقصى للعناصر المحفوظة
  const maxItems = 1000;
  const limitedItems = existingItems.slice(0, maxItems - 1);
  const updatedItems = [savedItem, ...limitedItems];

  // Save using enhanced storage manager
  storage.setItem('saved-descriptions', updatedItems);
  
  return savedItem;
};

export const getSavedDescriptions = (): SavedItem[] => {
  const storage = LocalStorageManager.getInstance();
  
  try {
    const parsed = storage.getItem('saved-descriptions', []);
    
    // التحقق من صحة البيانات المحفوظة
    if (!Array.isArray(parsed)) return [];
    
    // تنظيف البيانات المحفوظة
    return parsed
      .filter(item => item && typeof item === 'object' && item.id && item.title)
      .slice(0, 1000) // حد أقصى للأمان
      .map(item => ({
        ...item,
        title: sanitizeInput(item.title || ''),
        description: sanitizeInput(item.description || ''),
        data: sanitizeFormData(item.data || {})
      }));
  } catch (error) {
    console.error('Error loading saved descriptions:', error);
    // في حالة تلف البيانات، امسح التخزين  
    storage.removeItem('saved-descriptions');
    return [];
  }
};

export const deleteSavedDescription = (id: string): void => {
  const storage = LocalStorageManager.getInstance();
  const existingItems = getSavedDescriptions();
  const updatedItems = existingItems.filter(item => item.id !== id);
  storage.setItem('saved-descriptions', updatedItems);
};

export const generateTitleFromData = (type: 'car' | 'phone' | 'real-estate' | 'tenant' | 'free-writing' | 'tablet' | 'bicycle' | 'motorcycle' | 'clothing', data: any): string => {
  switch (type) {
    case 'car':
      return `${data.model || 'سيارة'} ${data.year || ''}`.trim();
    case 'phone':
      return `${data.brand || ''} ${data.model || 'هاتف'}`.trim();
    case 'real-estate':
      return `${data.propertyType || 'عقار'} في ${data.district || data.city || ''}`.trim();
    case 'tenant':
      return `ملف مستأجر - ${data.tenantType || 'غير محدد'}`.trim();
    case 'free-writing':
      return 'كتابة حرة';
    case 'tablet':
      return `${data.brand || ''} ${data.model || 'تابلت'}`.trim();
    case 'bicycle':
      return `${data.brand || ''} ${data.model || 'دراجة هوائية'}`.trim();
    case 'motorcycle':
      return `${data.brand || ''} ${data.model || 'دراجة نارية'}`.trim();
    case 'clothing':
      return `${data.brand || ''} ${data.category || 'ملابس'}`.trim();
    default:
      return 'وصف محفوظ';
  }
};