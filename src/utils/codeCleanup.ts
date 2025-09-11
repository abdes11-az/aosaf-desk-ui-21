// أدوات تنظيف الكود وإزالة الأجزاء غير المستخدمة

// إزالة console.log في الإنتاج
export const removeProductionLogs = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};

// تنظيف event listeners
export const cleanupEventListeners = () => {
  // إزالة المستمعين غير المستخدمين
  const events = ['resize', 'scroll', 'click', 'mousemove'];
  events.forEach(event => {
    const listeners = document.querySelectorAll(`[data-event-${event}]`);
    listeners.forEach(element => {
      const handler = (element as any)[`__${event}Handler`];
      if (handler) {
        element.removeEventListener(event, handler);
        delete (element as any)[`__${event}Handler`];
      }
    });
  });
};

// تنظيف Local Storage من البيانات القديمة
export const cleanupLocalStorage = () => {
  const now = Date.now();
  const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 يوم
  
  Object.keys(localStorage).forEach(key => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const data = JSON.parse(item);
        if (data.timestamp && (now - data.timestamp) > maxAge) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      // إزالة البيانات المعطوبة
      localStorage.removeItem(key);
    }
  });
};

// تنظيف DOM من العناصر المخفية
export const cleanupHiddenElements = () => {
  const hiddenElements = document.querySelectorAll('[style*="display: none"]');
  hiddenElements.forEach(element => {
    if (!element.hasAttribute('data-keep-hidden')) {
      element.remove();
    }
  });
};

// مراقبة استخدام الذاكرة
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    const usage = {
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };
    
    console.log('استخدام الذاكرة:', usage);
    
    // تحذير إذا اقترب من الحد الأقصى
    if (usage.usedJSHeapSize > usage.jsHeapSizeLimit * 0.8) {
      console.warn('تحذير: استخدام الذاكرة مرتفع!');
    }
    
    return usage;
  }
  return null;
};

// تنظيف شامل
export const performFullCleanup = () => {
  removeProductionLogs();
  cleanupEventListeners();
  cleanupLocalStorage();
  cleanupHiddenElements();
  
  // تشغيل garbage collection إذا كان متاحاً
  if (window.gc) {
    window.gc();
  }
  
  console.log('تم تنظيف الكود بنجاح');
};