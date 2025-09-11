import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'

import { PWAManager } from './utils/pwaUtils'

// تسجيل Service Worker للعمل بدون انترنت
const pwaManager = PWAManager.getInstance();
pwaManager.registerServiceWorker();

// التأكد من وجود عنصر root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// انتظار قليل للتأكد من تحميل React بالكامل
setTimeout(() => {
  createRoot(rootElement).render(React.createElement(App));
}, 0);
