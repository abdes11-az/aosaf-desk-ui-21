import React from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(rootElement).render(<App />);
