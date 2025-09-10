// Service Worker لدعم العمل بدون انترنت
const CACHE_NAME = 'ausaf-app-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/99683814-2513-420d-b37f-2b72567ede76.png',
  '/locales/ar.json',
  '/locales/eg.json',
  '/locales/gulf.json',
  '/locales/ma.json',
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 تثبيت Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 تخزين الملفات في الكاش');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ تفعيل Service Worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ حذف كاش قديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// استراتيجية الكاش
self.addEventListener('fetch', (event) => {
  // تجاهل الطلبات غير HTTP/HTTPS
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إرجاع من الكاش إذا وُجد
        if (response) {
          return response;
        }

        // محاولة جلب من الشبكة
        return fetch(event.request)
          .then((response) => {
            // التحقق من صحة الاستجابة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // نسخ الاستجابة للكاش
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // في حالة عدم توفر الشبكة، إرجاع صفحة افتراضية
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});

// رسائل للتطبيق
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// إشعار عند تحديث الكاش
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 مزامنة البيانات في الخلفية');
  }
});