import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'
import './i18n'
import { PWAManager } from './utils/pwaUtils'
import { vitalsOptimization, memoryCleanup } from './utils/bundleOptimization'
import { performFullCleanup, monitorMemoryUsage } from './utils/codeCleanup'
import { ImageOptimizer } from './utils/imageOptimization'
import { AnalyticsManager } from './utils/analytics'
import { SEOManager } from './utils/seoOptimization'

// تسجيل Service Worker للعمل بدون انترنت
const pwaManager = PWAManager.getInstance();
pwaManager.registerServiceWorker();

// تحسينات الأداء
vitalsOptimization.improveLCP();
vitalsOptimization.improveFID();
vitalsOptimization.improveCLS();

// تحسين الصور
const imageOptimizer = ImageOptimizer.getInstance();
imageOptimizer.lazyLoadImages();

// تشغيل نظام التحليلات
const analytics = AnalyticsManager.getInstance();
analytics.trackPageView('app_start');

// تحسينات SEO
const seoManager = SEOManager.getInstance();
seoManager.optimizeHomePage();
seoManager.optimizeForSpeed();

// تنظيف شامل عند بدء التطبيق
performFullCleanup();

// مراقبة الذاكرة كل دقيقة
setInterval(monitorMemoryUsage, 60 * 1000);

// تنظيف الذاكرة كل 5 دقائق
setInterval(memoryCleanup, 5 * 60 * 1000);

// تنظيف شامل كل 15 دقيقة
setInterval(performFullCleanup, 15 * 60 * 1000);

// التأكد من وجود عنصر root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// انتظار قليل للتأكد من تحميل React بالكامل
setTimeout(() => {
  createRoot(rootElement).render(React.createElement(App));
}, 0);
