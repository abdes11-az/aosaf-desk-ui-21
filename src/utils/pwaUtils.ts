// أدوات PWA لدعم العمل بدون انترنت
export class PWAManager {
  private static instance: PWAManager;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager();
    }
    return PWAManager.instance;
  }

  // تسجيل Service Worker
  async registerServiceWorker(): Promise<boolean> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        this.serviceWorkerRegistration = registration;
        
        console.log('✅ تم تسجيل Service Worker بنجاح');
        // اطلب التحقق من التحديثات فوراً وعند عودة التبويب للواجهة
        registration.update().catch(() => {});
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') registration.update().catch(() => {});
        });
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          // عندما يتم تفعيل العامل الجديد نستبدل الصفحة تلقائياً لضمان أحدث نسخة
          window.location.reload();
        });

        // مراقبة ظهور نسخة جديدة من الخدمة
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // إشعار المستخدم بوجود تحديث
                this.notifyUpdate();
              }
            });
          }
        });

        return true;
      } catch (error) {
        console.error('❌ فشل في تسجيل Service Worker:', error);
        return false;
      }
    }
    return false;
  }

  // التحقق من حالة الاتصال
  isOnline(): boolean {
    return navigator.onLine;
  }

  // مراقبة حالة الاتصال
  watchConnectionStatus(callback: (isOnline: boolean) => void): (() => void) {
    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // إرجاع دالة لإلغاء المراقبة
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }

  // إشعار بوجود تحديث
  private notifyUpdate(): void {
    // يمكن استخدام toast أو modal لإشعار المستخدم
    if (confirm('يوجد تحديث جديد للتطبيق. هل تريد إعادة التحميل؟')) {
      this.updateServiceWorker();
    }
  }

  // تحديث Service Worker
  updateServiceWorker(): void {
    if (this.serviceWorkerRegistration) {
      this.serviceWorkerRegistration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }

  // التحقق من إمكانية التثبيت
  canInstall(): boolean {
    return 'BeforeInstallPromptEvent' in window;
  }

  // حفظ البيانات للاستخدام بدون انترنت
  async cacheUserData(key: string, data: any): Promise<boolean> {
    try {
      const cache = await caches.open('user-data-v1');
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(key, response);
      return true;
    } catch (error) {
      console.error('خطأ في حفظ البيانات:', error);
      return false;
    }
  }

  // استرجاع البيانات المخزنة
  async getCachedUserData(key: string): Promise<any> {
    try {
      const cache = await caches.open('user-data-v1');
      const response = await cache.match(key);
      if (response) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('خطأ في استرجاع البيانات:', error);
      return null;
    }
  }

  // معلومات التخزين
  async getStorageInfo(): Promise<{ quota: number; usage: number; available: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota || 0,
        usage: estimate.usage || 0,
        available: (estimate.quota || 0) - (estimate.usage || 0)
      };
    }
    return { quota: 0, usage: 0, available: 0 };
  }
}

// Hook للاستخدام في React
export const usePWA = () => {
  const pwaManager = PWAManager.getInstance();
  
  return {
    isOnline: pwaManager.isOnline(),
    registerServiceWorker: () => pwaManager.registerServiceWorker(),
    watchConnectionStatus: (callback: (isOnline: boolean) => void) => 
      pwaManager.watchConnectionStatus(callback),
    updateServiceWorker: () => pwaManager.updateServiceWorker(),
    cacheUserData: (key: string, data: any) => pwaManager.cacheUserData(key, data),
    getCachedUserData: (key: string) => pwaManager.getCachedUserData(key),
    getStorageInfo: () => pwaManager.getStorageInfo()
  };
};