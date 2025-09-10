import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { PWAManager } from './utils/pwaUtils'

// تسجيل Service Worker للعمل بدون انترنت
const pwaManager = PWAManager.getInstance();
pwaManager.registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
