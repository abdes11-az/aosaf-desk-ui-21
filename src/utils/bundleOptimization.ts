// تحسينات حجم الحزمة
export const preloadRoute = (routeComponent: () => Promise<any>) => {
  // تحميل مسبق للصفحات عند التمرير أو الإشارة
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  routeComponent().then((module) => {
    if (module.default) {
      console.log('Route preloaded successfully');
    }
  });
};

// ضغط الصور تلقائياً
export const compressImage = (file: File, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // تقليل حجم الصورة إذا كانت كبيرة
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/webp', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// تنظيف الذاكرة
export const memoryCleanup = () => {
  // تنظيف cache القديم
  if ('caches' in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        if (cacheName.includes('old-') || cacheName.includes('v1-')) {
          caches.delete(cacheName);
        }
      });
    });
  }
  
  // إجبار garbage collection (في المتصفحات التي تدعمه)
  if (window.gc) {
    window.gc();
  }
};

// تحسين Web Vitals
export const vitalsOptimization = {
  // تحسين LCP (Largest Contentful Paint)
  improveLCP: () => {
    // تحميل الخطوط بشكل مسبق
    const fontLinks = document.querySelectorAll('link[href*="fonts"]');
    fontLinks.forEach((link) => {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'font');
      link.setAttribute('crossorigin', '');
    });
  },
  
  // تحسين FID (First Input Delay)
  improveFID: () => {
    // تأجيل الـ JavaScript غير الضروري
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach((script) => {
      if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
        script.setAttribute('defer', '');
      }
    });
  },
  
  // تحسين CLS (Cumulative Layout Shift)
  improveCLS: () => {
    // إضافة dimensions للصور
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      img.setAttribute('loading', 'lazy');
    });
  }
};