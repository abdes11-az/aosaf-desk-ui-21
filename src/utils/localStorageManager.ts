import React from 'react';

// إدارة التخزين المحلي المحسن
export class LocalStorageManager {
  private static instance: LocalStorageManager;
  private readonly maxSize = 5 * 1024 * 1024; // 5MB
  
  private constructor() {}

  static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  // حفظ البيانات مع ضغط
  setItem(key: string, value: any): boolean {
    try {
      const serialized = JSON.stringify(value);
      
      // التحقق من حجم البيانات
      if (this.getStorageSize() + serialized.length > this.maxSize) {
        this.cleanOldData();
      }
      
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('خطأ في حفظ البيانات:', error);
      
      // محاولة تنظيف البيانات القديمة
      this.cleanOldData();
      
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }
  }

  // استرجاع البيانات
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) return defaultValue;
      
      // التحقق من صحة JSON قبل التحليل
      if (typeof item !== 'string' || item.trim() === '' || item === 'null' || item === 'undefined') {
        return defaultValue;
      }
      
      const parsed = JSON.parse(item);
      
      // التحقق من صحة البيانات المحللة
      if (parsed === null || parsed === undefined) {
        return defaultValue;
      }
      
      return parsed;
    } catch (error) {
      console.error('خطأ في استرجاع البيانات:', error);
      // تنظيف البيانات التالفة
      this.removeItem(key);
      return defaultValue;
    }
  }

  // حذف عنصر
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('خطأ في حذف البيانات:', error);
    }
  }

  // حساب حجم التخزين المستخدم
  private getStorageSize(): number {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }

  // تنظيف البيانات القديمة
  private cleanOldData(): void {
    try {
      const savedDescriptions = this.getItem('saved-descriptions', []);
      
      if (Array.isArray(savedDescriptions) && savedDescriptions.length > 100) {
        // الاحتفاظ بآخر 100 عنصر فقط
        const recentItems = savedDescriptions
          .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
          .slice(0, 100);
        
        this.setItem('saved-descriptions', recentItems);
        console.log('🧹 تم تنظيف البيانات القديمة');
      }
    } catch (error) {
      console.error('خطأ في تنظيف البيانات:', error);
    }
  }

  // التحقق من مساحة التخزين المتاحة
  getStorageInfo(): { used: number; available: number; percentage: number } {
    const used = this.getStorageSize();
    const available = this.maxSize - used;
    const percentage = (used / this.maxSize) * 100;
    
    return { used, available, percentage };
  }

  // نسخ احتياطي للبيانات
  exportData(): string {
    const data = {
      savedDescriptions: this.getItem('saved-descriptions', []),
      settings: {
        theme: this.getItem('ausaf-ui-theme', 'light'),
        language: this.getItem('i18nextLng', 'moroccan')
      },
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    return JSON.stringify(data, null, 2);
  }

  // استيراد البيانات
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.savedDescriptions) {
        this.setItem('saved-descriptions', data.savedDescriptions);
      }
      
      if (data.settings) {
        if (data.settings.theme) {
          this.setItem('ausaf-ui-theme', data.settings.theme);
        }
        if (data.settings.language) {
          this.setItem('i18nextLng', data.settings.language);
        }
      }
      
      return true;
    } catch (error) {
      console.error('خطأ في استيراد البيانات:', error);
      return false;
    }
  }
}

// Hook للاستخدام في React
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const storage = LocalStorageManager.getInstance();
  const [value, setValue] = React.useState<T>(() => storage.getItem(key, defaultValue));

  const setStoredValue = React.useCallback((newValue: T) => {
    setValue(newValue);
    storage.setItem(key, newValue);
  }, [key, storage]);

  return [value, setStoredValue] as const;
};